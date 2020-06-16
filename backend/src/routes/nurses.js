import { Router } from 'express';
import Nurse from '../models/nurse';

const router = Router();

// Get all nurses
router.get('/', (req, res) => {
  Nurse.find()
    .then(nurses => res.json(nurses))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a nurse
router.post('/add', (req, res) => {
  const nurse = new Nurse({
    name: req.body.name,
    country: req.body.country,
    company: req.body.company
  });

  nurse
    .save()
    .then(() => res.json('Nurse created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a nurse
router.delete('/:id', (req, res) => {
  Nurse.findByIdAndDelete(req.params.id)
    .then(() => res.json('Nurse deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Edit a nurse
router.post('/update/:id', (req, res) => {
  Nurse.findById(req.params.id).then(nurse => {
    nurse.name = req.body.name;
    nurse.country = req.body.country;
    nurse.company = req.body.company;

    nurse
      .save()
      .then(() => res.json('Nurse updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
});

export default router;
