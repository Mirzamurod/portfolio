import connectDB from '../../libs/db'
import Project from '../../models/projectModel'
import Fingerprint from '../../models/fingerprintModel'

export default async function handler(req, res) {
  await connectDB()

  await Fingerprint.findOne({ fingerprint: req.body.fingerprint, project_id: req.body.id })
    .then(async response => {
      if (response) res.status(200).json(0)
      else
        await Fingerprint.create({ fingerprint: req.body.fingerprint, project_id: req.body.id })
          .then(
            async () =>
              await Project.findByIdAndUpdate(req.body.id, {like: req.body.like})
                .then(() => res.status(200).json(1))
                .catch(error => res.status(400).json({ success: false, message: error.message }))
          )
          .catch(error => res.status(400).json({ success: false, message: error.message }))
    })
    .catch(error => res.status(400).json({ success: false, message: error.message }))

  res.status(200).json()
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
