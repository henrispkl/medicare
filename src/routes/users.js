import { Router } from 'express';
import User from '../models/user';
import authMiddleware from '../middleware/auth';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

// Register a new user
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then((user) => {
    // If there's a user already, send error
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }

        // Set hash password
        newUser.password = hash;

        // Save user in db
        newUser.save().then((user) => {
          // Set the json web token
          jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              }

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// Login a user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }).then((user) => {
    // If there's not an user, send error
    if (!user) {
      return res.status(400).json({ msg: 'This user does not exist' });
    }

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      // If password does not match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }

      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// Auth a user
router.get('/auth', authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

export default router;
