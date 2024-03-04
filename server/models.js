import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let models = {}
console.log("connecting to mongodb")
await mongoose.connect(process.env.MONGODB_URI)
console.log("sucessfully connected")

// Jobs Schema

const jobSchema = new mongoose.Schema({
    // add userId reference later
    jobName: String,
    dateApplied: Date,
    jobStatus: String,
    applicationLink: String,
    // interviewStatus: String,
    company: String,
    location: String,
    // jobDescription: String,
    // notes: String,
    // applicationDeadline: Date,
    // salary: Number,
    // experienceRequired: String,
    // skillsRequired: String
    // userID: reference to another users object
})

models.Job = mongoose.model('Job', jobSchema);


export default models;