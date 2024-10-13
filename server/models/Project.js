import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  status: { type: String, enum: ['Planning', 'In Progress', 'In Review', 'Completed'], default: 'Planning' },
  deadline: { type: Date, required: true },
  description: { type: String },
});

export default mongoose.model('Project', projectSchema);