import moongose from 'mongoose';

const jobSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    jobType: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    location: { type: String, required: true },
    dates: { type: String, required: true },
    workingHours: { type: String, required: true },
    workingDays: { type: String, required: true },
    contractType: { type: String, required: true },
    shiftType: { type: String, required: true },
    description: String,
    postedBy: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

const Job = moongose.model('Job', jobSchema);

export default Job;
