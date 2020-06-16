import moongose from 'mongoose';

const jobSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5
    },
    jobType: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    location: String,
    dates: String,
    workingHours: String,
    workingDays: String,
    contractType: String,
    shiftType: String,
    description: String
  },
  {
    timestamps: true
  }
);

const Job = moongose.model('Job', jobSchema);

export default Job;
