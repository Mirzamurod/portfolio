import mongoose, { Schema } from 'mongoose'

const fingerprintSchema = new Schema(
  {
    fingerprint: { type: String, required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  },
  { timestamps: true }
)

const Fingerprint = mongoose.models.Fingerprint || mongoose.model('Fingerprint', fingerprintSchema)

export default Fingerprint
