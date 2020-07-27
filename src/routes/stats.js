import { Router } from 'express';
import Job from '../models/job';
import Doctor from '../models/doctor';
import Nurse from '../models/nurse';

const router = Router();

// Get number of jobs
router.get('/jobs', (req, res) => {
  Job.countDocuments({}, (err, count) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({ count });
    }
  });
});

// Get number of professionals
router.get('/professionals', (req, res) => {
  let number = 0;

  Doctor.countDocuments({}, (err, count) => {
    if (err) {
      res.status(400).json(err);
    } else {
      number += count;
      Nurse.countDocuments({}, (err2, count2) => {
        if (err2) {
          res.status(400).json(err2);
        } else {
          number += count2;
          res.json({ count: number });
        }
      });
    }
  });
});

export default router;
