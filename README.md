## Description

This service provides an API that parses a specific JSON schema and saves it to a DB, through a queue. It is built using Typescript and the [Nest.js](https://github.com/nestjs/nest) framework.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Running Server](#running-server)
  - [Running with docker](#running-with-docker)
  - [Running locally](#running-locally)
- [Test](#test)

 ## Folder Structure

```
nodejs-web-server
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package.json
├── src
    ├── app
    ├── common
    ├── config.ts
    ├── consumer
    ├── gql
    ├── main.ts
    ├── mongo
    ├── publisher
    └── store
├── test
```

## Running Server

### `Running with docker`

To run the server:

```bash
 docker-compose build


 docker-compose up
```
When everything is ready, your server will be accessible via:
 `http://localhost:3333/api/ `
 `http://localhost:3333/graphql `

### `Running locally`

- Install RabbitMQ
- Install Nodejs
- Install npm
- Install yarn


Follow these steps in order in the project directory:

```bash

rabbitmq-server

yarn

yarn run build

yarn run start

```
### Test
To run the tests:

```bash

yarn run test:e2e

```
