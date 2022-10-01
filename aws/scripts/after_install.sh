#!/bin/bash

cd /home/ubuntu &&
cp .env /home/ubuntu/app &&
cd /home/ubuntu/app &&
sudo docker-compose build --no-cache 