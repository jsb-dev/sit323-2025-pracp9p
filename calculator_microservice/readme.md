# Calculator Microservice

A basic calculator microservice built with Node.js and Express.

## Getting Started

This is a basic project, simply clone the repository and use `npm install` from project root.

## Testing

Run the server with `npm start`, which will start the Microservice with Nodemon for hot reloading

### Endpoints

    - curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/add
    - curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/subtract
    - curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/multiple
    - curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/divide