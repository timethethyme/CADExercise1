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

1. Select Ubuntu 18.04 as image
2. Stablish SSH conection and login with **ubuntu**
3. Replace XXXX with the authtoken from ngrok dashboard in ```startup.sh```
4. Send ```script.sh``` to machine. If using PuTTy, 
```
	pscp C:\path\to\script.txt ubuntu@IPofVirtualMAchine:/home/ubuntu/script.sh
````
5. In the virtual machine, use this for fixing character encoding between Windows and Linux
```
	sed -i -e 's/\r$//' script.sh
````
6. ```./script.sh```    and copy localhost **http** parsing  (*https seems to not be working (?)* ) from ngrok with CTRL + Shift + C and paste in preferred browser