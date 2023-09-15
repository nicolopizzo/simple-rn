# Simple rn
Sample application to test React Native. You can find a simple server in the directory `backend`, and the mobile app in the directory `frontend`.

## Usage
To have the application fully functional, install the dependencies executing the command `npm install` in both directories and set the IP address of your machine in the file `frontend/config.js`, otherwise the mobile app cannot communicate with the server.
After that, go inside `backend` and run `npm start` to start the server, and run `npm run android` inside `frontend` to start the application. Sign in as the admin user (`username = admin, password = admin`) to start the application in `admin` mode. If you want to test out a user, create a user from the admin panel, and sign in as the newly created user.  
If there is an error logging in, please check that you correctly configured the IP of your machine in `frontend/config.js`