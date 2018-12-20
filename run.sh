#!/bin/bash
#this script is made to run script house web application
#for the purpose of security this script will run the projects from the bin/ directory
#change the pointer to bin/ directory
cd bin/
#installing node js, this package is required for the project to run
echo "Do you have node installed? [Y/n]:"
#read the value from user input
read accept
if [[ "$accept" = "n" ]]
then
	sudo apt install nodejs -y
else :
fi
#installing node packages manager, required for the project
echo "Do you have npm installed? [Y/n]:"
# read the value from user input
read accept
if [[ "$accept" = "n" ]]
then
	sudo apt install npm -y
else :
fi
#initialize npm package module .json if the one is lost
echo "Do you have npm initialized? [Y/n]:"
#read the value from user input
read accept
if [[ "$accept" = "n" ]]
then
	npm init --yes
	exit
else
	echo "Do you want to install dependencies [Y/n]"
	read accept
	if [[ "$accept" = "n" ]]
	then
		nodemon app.js
	else
		npm install #installing dependencies
		nodemon app.js #run the app using nodemon
	fi
fi
