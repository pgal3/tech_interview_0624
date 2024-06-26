# Readme - Tech Interview

## Current Open Issues 
- [ ] Error when running the server in docker compose. Error with the prisma client.

## Introduction
This project is the result of a technical challenge. Some assumptions where made when requirements were not completely clear. 
### Idea
The idea is to create the backend for a "Twitter/X - like" social, where users can sign-up and sign-in, modify their profiles, public posts and follow other users. 
### Architecture
WIP - Image of the backend services involved and flows 

The overall architecture is divided in 5 pieces:
- A Postgres database to store all users information and relations 
- A RabbitMQ service to queue the newly created posts and notify the live/connected followers
- An HTTP server to serve REST API requests for all the basic functionality like create/read/update and delete of users, posts and followers.
- A WebSocket server to manage new posts notification to following users

### Flows
The following section is a description of the implemented flows. For more details about requests and responses of every API please see the OpenAPI specification generated on the service startup and available at `http://<server-url>/docs`

#### Auth APIs 
These apis allow the register and login procedure.

The register API requires a unique username and password for the registration process. The given password will be securely store in the database, after being hashed with an additional randomly generated salt string.

The login API if successfully called will return a time-limited access token, that expires in 1 hour. The expiration time can be changed in code.

*Note: currently the register endpoint assign a default role of user if not specified. You can specify the role in the "role" field of the request, choosing between "admin" and "user".*

#### User APIs
These APIs allows basic crud operations on the users informations. All the endpoints are protected by the access token passed on the authorization header of the request. Users basic information (id, username and role) are extracted from the token decodification.

- update: update username and email information of the logged user
- get: returns the details of the current user
- get_all: paginated endpoint dedicated only to admin users to get informations of all the registered users
- delete: delete calling user informations
- update_picture: endpoint that accepts a form with a single image file in it, and allow the update of the profile picture of the logged user

#### Posts APIs
These APIs enable a user to create, search and delete posts.
Every time a user creates a post, this will be also sent to a queue in order to be processed by the notification service.
#### Follow APIs
APIs that manages the follow/unfollow flow, and let the user retrieve the list of following users.
#### WIP - Webhook notification endpoint
The webhook will allow the connected user to receive live notification every time that a following user publishes a new post.
This is done by creating a queue consumer that will forward the post notification upon receiving a new post message from the queue.

### Tech stack
*Note: part of the tech stack was a direct requirement of the technical challenge* 
- Nodejs 
- Typescript 
- Fastify
- Awilix (DI library)
- amqplib - RabbitMQ official library
- Prisma - database ORM 
- Typebox/synclair - for input type checking 
- jsonwebtoken library to generate and verify jwt tokens
### Code Structure
The code tries to follow Domain Driven Design principles.
It's divided into three main folders:
1. **Domain** - containing all the domain/business entities like users and posts entities.
2. **Application** - containing all the specific application logic, mappers and requests/responses. It also contains information about the ports interfaces
3. **Infrastructure** - the layer that actually implements all the ports interfaces. It covers the actual implementation to the upper layers, in order to allow an easier switch of lower layer systems (e.g. databases, storage services, cache service)

The idea of this is to easily replace pieces of the system without changing the core logic. Rely on abstraction of the actual implementation at application layer, in order to be able to change the lower layer technology when needed.
## How to deploy and start the service
*Note: currently only the docker compose deployment is support.*
### Environment file
In order to be able to start the service, the creation of an environment file is needed.
This file have to be placed inside the "be" folder and named ".env"
The file have to contain the following variables:

| Variable Name         | Value     | Description                          |
| --------------------- | --------- | ------------------------------------ |
| SERVER_ADDRESS        | 0.0.0.0   | Server address                       |
| SERVER_PORT           | 3000      | Server port                          |
| WEBSOCKET_PORT        | 4000      | Websocket server port                |
| JWT_SECRET_KEY        | -         | Key needed to sign tokens            |
| JWT_ISSUER            | -         | Token issuer value                   |
| PG_DATABASE_URL       | -         | Url to connect to the database       |
| POSTGRES_URL          | -         | Postgres container value             |
| POSTGRES_PORT         | 5432      | Postgres port                        |
| POSTGRES_DB           | postgres  | Database name                        |
| POSTGRES_USER         | -         | Username for the database connection |
| POSTGRES_PASSWORD     | -         | User's database password             |
| CLOUDINARY_CLOUD_NAME | -         | Cloudinary user variable             |
| CLOUDINARY_API_KEY    | -         | Cloudinary api key                   |
| CLOUDINARY_API_SECRET | -         | Cloudinary api secret                |
| RABBITMQ_DEFAULT_USER | -         | User for the queue system            |
| RABBITMQ_DEFAULT_PASS | -         | Password for the queue system        |
| RABBITMQ_URL          | localhost | Url of the queue system              |
| RABBITMQ_PORT         | 5672      | Connection port of the queue system  |
| POSTS_QUEUE           | posts     | Name of the posts queue              |
|                       |           |                                      |


### OpenAPI Specifications 
OpenAPI specification are available once the service is deployed/running. 
If running a local docker compose  instance, can be found at `http://localhost:<server_port>/docs`

### Deploy using Docker compose
The project comes with a docker-compose.yaml file to build and run the service locally.
Before running the service you must create the .env file and place it in the be folder.

In order to deploy the service, just run the command:
`docker compose up -d`

This will automatically spin up the database, queue and server.
Once the server is up and running, run the following command from the project's be folder:

`npx prisma migrate dev --schema=./src/infra/db/prisma/schema.prisma`
``
This will setup and migrate the database tables. 

*Note: the migration and table creation will be changed and automatically performed in the future.*
### Cloud Deploy 
#### Google cloud run
WIP - Deployment instruction for Google cloud run service are a work in progress and not available at the moment. 
Once deployed, a link to a test service will be added here.

## Possible improvements and tech debt
- [ ] create tests for all the features 
- [ ] enhance the database setup and migration experience
- [ ] reduce docker container size using multipart builds
- [ ] enhance get posts functionalities
- [ ] complete websocket implementation
- [ ] create a frontend as a PoC
- [ ] deploy rest and websocket service as two different containers
- [ ] extract common modules/ports
- [ ] implement a caching service (redis) for specific endpoints (e.g. get posts and get followers)
- [ ] deploy the PoC to a public cloud provider or a raspberry Pi with ngrok as a reverse proxy service
