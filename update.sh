#!/bin/bash

git pull origin master
git reset --hard orgin/master

rm -rf ./node_modules
yarn install

yarn build

pm2 restart oxen.io
systemctl restart nginx.service
