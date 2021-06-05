#!/usr/bin/env bash

cd /code

cp -n docker/env.sample .env

pip install -r requirements/base.txt --quiet
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
