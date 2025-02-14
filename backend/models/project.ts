import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

projectSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Project', projectSchema)
