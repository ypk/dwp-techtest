# svelte app

This application uses [Svelte](https://svelte.dev) compiler.

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Get started

Navigate to project folder...

`cd dwp-techtest`

...install the dependencies:

`npm install` or `yarn install`

...then start the server:

`npm run dev` or `yarn dev`

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. 

## Side note

This spins up two different servers, one for front end (running on port `8080`) and other for backend (running on port `8888`) 

The backend servers purpose is to act as a proxy to overcome `cors`

Due to the nature of the application, sadly, JavaScript in browser is mandatory for this to function.