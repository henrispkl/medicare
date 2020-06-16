import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
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

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
