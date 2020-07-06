import { Router } from 'express';
import Job from '../models/job';
import authMiddleware from '../middleware/auth';

const router = Router();

// Get all jobs
router.get('/', (req, res) => {
  Job.find()
    .sort({ createdAt: 'desc' })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json(err));
});

// Add a job
router.post('/add', authMiddleware, (req, res) => {
  const job = new Job({
    name: req.body.name,
    jobType: req.body.jobType,
    institution: req.body.institution,
    location: req.body.location,
    dates: req.body.dates,
    workingHours: req.body.workingHours,
    workingDays: req.body.workingDays,
    contractType: req.body.contractType,
    shiftType: req.body.shiftType,
    description: req.body.description,
  });

  if (req.body.name.length)
    job
      .save()
      .then((result) => res.json({ msg: 'Job created!', result }))
      .catch((err) => res.status(400).json(err));
});

// View a specific job
router.get('/:id', (req, res) => {
  Job.findById(req.params.id)
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json(err));
});

// Delete a job
router.delete('/:id', authMiddleware, (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json('Job deleted!'))
    .catch((err) => res.status(400).json(err));
});

export default router;
