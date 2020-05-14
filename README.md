Cloud Application Development - Exercise 1

Before running node.js server

```
npm install 
```

Suggestion: Nodemon (Rrestarts the node application automatically when files changed)
```
npm i nodemon
```
Run with 
```
nodemon server.js
```

Suggested Template engine: https://ejs.co/#install
Suggested Server Framework: https://expressjs.com/


# Instance from scratch in bwCloud

**NOTE: AWS access key ID AND Secret access key have to be added to server.js**

1. Select Ubuntu 18.04 as image
2. Stablish SSH conection and login with **ubuntu**
3. 
	3.1 Replace XYZ with the authtoken from ngrok dashboard in ```startup.sh```
	3.2 ngrok os no longer needed if a Security Group is set. Add port forwarding to it (3000 for nodejs app)
4. Send ```script.sh``` to machine. If using PuTTy, 
```
	pscp C:\path\to\script.sh ubuntu@IPofVirtualMAchine:/home/ubuntu/script.sh
````

5. In the virtual machine, use this for fixing character encoding between Windows and Linux
```
	sed -i -e 's/\r$//' script.sh
````
6. ```./script.sh```    and copy localhost **http** parsing  (*https seems to not be working (?)* ) from ngrok with CTRL + Shift + C and paste in preferred browser
7. for startup, create snapshot and edit the crontab, adding ```@reboot /home/ubuntu/setup.sh```
