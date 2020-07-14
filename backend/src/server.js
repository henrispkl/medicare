import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

// Middleware to let json data be acessed in the req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors());

// Routes
app.use('/jobs', routes.jobs);
app.use('/doctors', routes.doctors);
app.use('/nurses', routes.nurses);
app.use('/stats', routes.stats);
app.use('/users', routes.users);

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
  app.listen(process.env.PORT, () => {
    console.log(`Medicare test server running on port ${process.env.PORT}`);
  });
});
