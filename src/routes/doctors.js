import { Router } from 'express';
import Doctor from '../models/doctor';
import authMiddleware from '../middleware/auth';

const router = Router();

// Get all doctors
router.get('/', (req, res) => {
  Doctor.find()
    .sort({ name: 'asc' })
    .then((doctors) => res.json(doctors))
    .catch((err) => res.status(400).json(err));
});

// Add a doctor
router.post('/add', authMiddleware, (req, res) => {
  const doctor = new Doctor({
    name: req.body.name,
    country: req.body.country,
    company: req.body.company,
  });

  doctor
    .save()
    .then(() => res.json('Doctor created!'))
    .catch((err) => res.status(400).json(err));
});

// Delete a doctor
router.delete('/:id', authMiddleware, (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Doctor deleted!'))
    .catch((err) => res.status(400).json(err));
});

// Edit a doctor
router.post('/update/:id', authMiddleware, (req, res) => {
  Doctor.findById(req.params.id).then((doctor) => {
    doctor.name = req.body.name;
    doctor.country = req.body.country;
    doctor.company = req.body.company;

    doctor
      .save()
      .then(() => res.json('Doctor updated!'))
      .catch((err) => res.status(400).json(err));
  });
});

export default router;
