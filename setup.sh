#!/bin/bash

cd CADExercise1/backend/
mongod --port 27017 --dbpath ./data &
sleep 6s
nodemon server.js &