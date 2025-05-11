import express from 'express';
import { MongoClient } from 'mongodb';

// Instantiate express and port
const app = express();
const port = 3000;

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/calculator';
let db;
let client;

// Connect to MongoDB
async function connectToDB() {
  try {
    client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('calculator');

    // Create calculations collection if it doesn't exist
    if (!(await db.listCollections({ name: 'calculations' }).hasNext())) {
      await db.createCollection('calculations');
      console.log('Created calculations collection');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Connect to MongoDB when the app starts
connectToDB().catch(console.error);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to validate input for calculator operations
const validate = (req, res, next) => {
  try {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new Error('Both num1 and num2 must be numbers');
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Helper function to log calculation to MongoDB
async function logCalculation(operation, num1, num2, result) {
  if (!db) {
    console.error('Database connection is missing!');
    return;
  }

  try {
    const response = await db.collection('calculations').insertOne({
      operation,
      num1,
      num2,
      result,
      timestamp: new Date(),
    });
    console.log('Inserted document:', response);
  } catch (error) {
    console.error('Error logging calculation:', error);
  }
}

// addition endpoint
app.post('/add', validate, async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 + num2;

    // Log calculation to MongoDB
    await logCalculation('add', num1, num2, result);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// subtraction endpoint
app.post('/subtract', validate, async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 - num2;

    // Log calculation to MongoDB
    await logCalculation('subtract', num1, num2, result);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// multiplication endpoint
app.post('/multiply', validate, async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    const result = num1 * num2;

    // Log calculation to MongoDB
    await logCalculation('multiply', num1, num2, result);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// division endpoint
app.post('/divide', validate, async (req, res) => {
  try {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
      throw new Error('Cannot divide by zero');
    }
    const result = num1 / num2;

    // Log calculation to MongoDB
    await logCalculation('divide', num1, num2, result);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// A history endpoint to retrieve calculations
app.get('/history', async (req, res) => {
  try {
    const history = await db
      .collection('calculations')
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default response for invalid endpoint requests
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found' });
});

// Bind the service to the port
app.listen(port, () => {
  console.log(`Calculator Microservice running on port ${port}`);
});

// Close the connection when the app is terminated
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});
