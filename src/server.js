import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path';

const port = process.env.PORT || 80;

// Fix Babel "regeneratorruntime is not defined"
import regeneratorRuntime from 'regenerator-runtime';

const app = express();

// Middleware to let json data be acessed in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors());

// Routes
app.use('/api/jobs', routes.jobs);
app.use('/api/doctors', routes.doctors);
app.use('/api/nurses', routes.nurses);
app.use('/api/stats', routes.stats);
app.use('/api/users', routes.users);

app.use(express.static(path.join(__dirname, '../client/build')));

// If no API routes are hit, send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Mongoose
mongoose.set('useUnifiedTopology', true);

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};

// Init server
connectDb().then(async () => {
  app.listen(port, () => {
    console.log(`Medicare test server running on port ${port}`);
  });
});
