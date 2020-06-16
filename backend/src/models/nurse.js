import mongoose from 'mongoose';

const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  company: String
});

const Nurse = mongoose.model('Nurse', nurseSchema);

export default Nurse;
