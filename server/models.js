import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let models = {}
console.log("connecting to mongodb")
await mongoose.connect(process.env.MONGODB_URI)
console.log("sucessfully connected")

// Jobs Schema

const jobSchema = new mongoose.Schema({
    jobName: { type: String, text: true },
    dateApplied: Date,
    jobStatus: String,
    applicationLink: String,
    company: String,
    location: String,
    // userID: reference to another users object
})

models.Job = mongoose.model('Job', jobSchema);


export default models;