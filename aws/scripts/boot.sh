#!/bin/bash

cd /home/ubuntu/app &&
sudo docker volume prune --force &&
sudo docker-compose up -d