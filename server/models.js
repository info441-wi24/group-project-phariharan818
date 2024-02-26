import mongoose from 'mongoose';

let models = {}
// console.log("connecting to mongodb")
// await mongoose.connect("mongodb+srv://kriti:BCF5PQk4DhWPcb4p@cluster0.0h9jp2a.mongodb.net/jobApplications")
// console.log("sucessfully connected")

// // Jobs Schema

// const jobSchema = new mongoose.Schema({
//     // add userId reference later
//     jobName: String,
//     dateApplied: Date,
//     // jobStatus: String,
//     // applicationLink: String,
//     // interviewStatus: String,
//     // company: String,
//     // location: String,
//     // jobDescription: String,
//     // notes: String,
//     // applicationDeadline: Date,
//     // salary: Number,
//     // experienceRequired: String,
//     // skillsRequired: String
// })

// models.Job = mongoose.model('Job', jobSchema);

export default models;