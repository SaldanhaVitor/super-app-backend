# Super app backend 

This is the Super App backend repository, the application's main objective is to manage the client's wishlist.

## Introduction

This application doesn't use any kind of repository, using only in-memory cache. It means that the application has no persistence in the long run and if the application got interrupted, all data will be lost. Because of that, this application don't use docker and any database image. 
This project also do not use .env file, the necessary constansts are defined in ```src/configs``` folder.

## Getting Started

To start the application it is necessary to:

1. Node version:
   - Version 14.19.1 or newer

2. Download all dependencies:
   - Access the application folder through the CMD (DOS command line or command terminal);
   - Run the command ```npm i```.

3. Initialize the application:
   - Access the application folder through the CMD (DOS command line or command terminal);
   - Run the command ```npm run start```;

## Swagger
See the swagger docs in ```http://localhost:3000/docs``` to ensure you are able to make the requests when the application is running.

## Autentication 

The application utilizes JSON Web Tokens (JWT) for authentication. JWT is a compact, URL-safe means of representing claims between two parties. These tokens are digitally signed and can be trusted, enabling secure communication between the client and the server.

To access the application's features, users must first register and create an account. Upon successful registration, a JWT token will be generated and provided to the user. This token serves as a credential and is required to authenticate subsequent requests.

The JWT token has an expiration time (120s), after which it becomes invalid. If your token expires, you will need to re-authenticate by logging in again to obtain a new token.

Keep your JWT token secure and do not share it with others. It acts as a credential and provides access to your account within the application.

### How to Use the Application

Register an account (endpoint ```[POST] /v1/clients```) by providing the necessary information, such as name and email.

After successful registration, you will receive a JWT token as a response. This token will be required for authentication.

Include the JWT token in the Authorization header of each request made to the application's API. The header should follow the format: <span style="font-weight:bold"> Authorization: Bearer <your_token> </span>. Replace <your_token> with the actual JWT token received during registration.

Make requests to the application's endpoints, ensuring that the Authorization header is included in each request. Without a valid JWT token, the application will reject the request and return an appropriate error message.

If you encounter any issues or have questions regarding the authentication process, please refer to the application's documentation or contact our support team for assistance.

## Test

To run collections in postman, go to ```test/collections``` and import postman collection and environment to postman. There will be all endpoints to test application end-to-end.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
