# NextUp Basketball API

This repository houses the api for the NextUp Basketball app.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- The first thing needed to run these projects is node and npm. You can use this link to download both: https://nodejs.org/en/download/

- Next you must install docker desktop for your machine. The following link will take you to the instructions on how to do so: https://docs.docker.com/install/#supported-platforms

- So that there is a consistent dev environment, the ide used is vscode, with the "Remote - Containers" extension being used

- Finally run the following command in the terminal to clone the repo

  ```
  git clone https://github.com/terrell-greene/NextUp-Basketball-API.git
  ```

### Installing

A step by step series of examples that tell you how to get a development env running

To install the required dependencies for the api you'll have to run the following command on the cmd line

```
yarn install
```

## Running the app in a dev environment

The following steps show you how to start the api in a development environment

- First you must create a .env file in the .devcontainer directory, and within that file add the following variables
  ```
  APP_SECRET=appsecret321
  MONGO_URI=mongodb://mongo:27017
  NODE_ENV=development
  ```
- Next, open up the command pallete in vscode and run the "Remote-Containers: Reopen in Container", command

- Once the container is up and running, run the following command in the terminal to start the api
  ```
  yarn start
  ```
  
- To run it in debug mode, run the following command. Then press F5 to attach the debugger
  ```
  yarn debug
  ```



## Authors

* [**Jalen Greene**](https://github.com/terrell-greene)
