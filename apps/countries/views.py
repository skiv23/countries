# -*- coding: utf-8 -*-
import json
import requests

from django.core.cache import cache
from django.views.generic import TemplateView


class CountriesView(TemplateView):
    template_name = 'countries/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        countries_data = cache.get('countries_data')
        if not countries_data:
            countries_url = 'https://restcountries.eu/rest/v2/all?fields=name;region;area;population;flag;borders;alpha3Code'
            countries = requests.get(countries_url).json()
            top_borders = sorted(countries, key=lambda x: len(x['borders']), reverse=True)[:10]
            borders_with_china = filter(lambda x: 'CHN' in x['borders'], countries)
            countries_data = {
                'top_borders': json.dumps(top_borders),
                'borders_with_china': list(borders_with_china)
            }
            # since the data is unlikely to be changed it can be cached for at least a day
            # hence faster response time and less api calls
            cache.set('countries_data', countries_data, 86400)
        context.update(countries_data)
        return context
