# Getting Started with Create React App

This is React full-stack application with Node.js as the back-end service, maxmind db file as the application database, and NginX for reverse proxy. We can dockerize this full-stack application, and deploy it as a Docker image.


It is a simple location finder application that uses React as the front-end and Node.js to spin up a server that will help us process the given ip and show us it's location if found in the maxmind database file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Deployment

This project is docker composable, below are the steps to build and run it inside docker container
- Download the App contents. You can either pull the entire project or download it as a zip and extract the app folder out to get started with.
-Once extracted, use your favorite code editor to open the project. You should see location-client, Nginx, server folders
-On your terminal change directory to point to the location-client directory and execute this command: `docker build -f Dockerfile -t location-client .`
The above command will create an image called client on Docker. To test it, we will create a container that will help us run this image.

Here is the command to do so:

`docker run -it -p 4001:3000 client`

-To create the server image run:

`docker build -f Dockerfile -t server .`
To create a container to execute the server image, run:

`docker run -it -p 4002:3001 server`

-Run and test the fully containerized application instance
Everything is now ready.

On your project root directory, execute the following command to run the docker-compose.yml file.

`docker-compose up --build`
This will build and run all the containers in Docker.

Now, `you can access the app using route http://localhost:3050/`.