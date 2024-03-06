import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

let models = {}
console.log("connecting to mongodb")
await mongoose.connect(process.env.MONGODB_URI)
console.log("sucessfully connected")

// Jobs Schema

const jobSchema = new mongoose.Schema({
    jobName: String,
    dateApplied: Date,
    jobStatus: String,
    applicationLink: String,
    company: String,
    location: String,
    // userID: reference to another users object
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const userSchema = new mongoose.Schema({
    name: String,
    username: String
})

models.Job = mongoose.model('Job', jobSchema);
models.User = mongoose.model('User', userSchema)


export default models;