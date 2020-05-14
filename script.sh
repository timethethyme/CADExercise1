#!/bin/bash

# installing nodejs on ubuntu
sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# installing mongodb
sudo wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt-get update
sudo apt install npm
sudo apt install -y mongodb-org


#setting up the repo
git clone https://github.com/timethethyme/CADExercise1.git
cd CADExercise1/backend/
sudo npm install
sudo npm i -g nodemon
cd ..
cd ..
chmod 777 -R CADExercise1
cd CADExercise1/backend/

# for starting the db
sudo mkdir -p ./data
sudo mongod --port 27017 --dbpath ./data &
sudo sleep 6s
sudo nodemon server.js &
sudo sleep 6s