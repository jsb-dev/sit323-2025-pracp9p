/*
This is a basic calculator microservice using the Express framework,
it accepts POST requests to /add, /subtract, and /multiply endpoints with JSON payloads,
num1 and num2 args required
*/

import express from 'express';

//instantiate express and port
const app = express();
const port = 3000;

// middleware to parse JSON request bodies,
// this is ideal for where we use post requests
app.use(express.json());

// middleware to validate input for add, subtract, and multiple operations,
// this cleans up our basic error handling
const validate = (req, res, next) => {
  // using try-catch in each function makes sequential troubleshooting easier,
  // this also provides meaningful feedback to the API consumer
  try {
    // basic type assertion
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both a and b must be numbers');
    }
    // onto the next function in the chain
    next();
  } catch (error) {
    // handle bad requests with 400 status code
    res.status(400).json({ message: error.message });
  }
};

// addition endpoint
app.post('/add', validate, (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 + num2;
    res.json({ result });
  } catch (error) {
    // handle server-side error with 500 status code
    res.status(500).json({ error: error.message });
  }
});

// subtraction endpoint
app.post('/subtract', validate, (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 - num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// multiplication endpoint
app.post('/multiple', validate, (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 * num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// division endpoint
app.post('/divide', validate, (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 / num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// default response for invalid endpoint requests,
// this provides better feedback to the API consumer
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

// bind the configurted Express app to the port we specified earlier
app.listen(port, () => {
  console.log(`Calculator Microservicce running on ${port}`);
});

// the quickest way to test the server is with curl:

// expected
// {"result":8}
// test
// curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/add

// expected
// {"result":2}
// test
// curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/subtract

// expected
// {"result":15}
// test
// curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/multiple

// expected
// {"result":1.6666666666666667}
// test
// curl -X POST -H "Content-Type: application/json" -d '{"num1": 5, "num2": 3}' http://localhost:3000/divide

// simply start the server with npm and run the request from a local terminal
