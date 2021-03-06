import { Router } from 'express';
import Nurse from '../models/nurse';
import authMiddleware from '../middleware/auth';

const router = Router();

// Get all nurses
router.get('/', (req, res) => {
  Nurse.find()
    .sort({ name: 'asc' })
    .then((nurses) => res.json(nurses))
    .catch((err) => res.status(400).json(err));
});

// Add a nurse
router.post('/add', authMiddleware, (req, res) => {
  const nurse = new Nurse({
    name: req.body.name,
    country: req.body.country,
    company: req.body.company,
  });

  nurse
    .save()
    .then(() => res.json('Nurse created!'))
    .catch((err) => res.status(400).json(err));
});

// Delete a nurse
router.delete('/:id', authMiddleware, (req, res) => {
  Nurse.findByIdAndDelete(req.params.id)
    .then(() => res.json('Nurse deleted!'))
    .catch((err) => res.status(400).json(err));
});

// Edit a nurse
router.post('/update/:id', authMiddleware, (req, res) => {
  Nurse.findById(req.params.id).then((nurse) => {
    nurse.name = req.body.name;
    nurse.country = req.body.country;
    nurse.company = req.body.company;

    nurse
      .save()
      .then(() => res.json('Nurse updated!'))
      .catch((err) => res.status(400).json(err));
  });
});

export default router;
