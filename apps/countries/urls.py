# -*- coding: utf-8 -*-
from django.urls import path

from . import views

app_name = 'countries'

urlpatterns = [
    path('', views.CountriesView.as_view(), name='index'),
]
