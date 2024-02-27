import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js'
import cors from "cors";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'client/build')));


// middleware to share model with api handlers
app.use((req, res, next) => {
    req.models = models;
    next()
})

app.get("/", (req, res) => {
    res.status(200).send("Server is up and running! new words more new words blah blah bloah");
});

app.get("/api", (req, res) => {
    res.json({ "status": "success", "yay": "hehe", "newvalue": "added", "newest value": "added"})
})

app.get("/jobs", async function(req, res, next) {
    try {
        const jobs = await models.Job.find({});
        res.status(200).json({"status": "success", "jobs": jobs});
    } catch (error) {
        console.log(error);
        res.status(500).json({"status": "error", "error": error});
    }
});

app.post('/jobs', async function(req, res, next) {
    try {
        let newJob = new req.models.Job({
            jobName: req.body.jobName,
            dateApplied: req.body.dateApplied
        })
        await newJob.save()        
        res.status(200).json({"status": "success"});
    } catch (error) {
        console.log(error)
        res.send(500).json({"status": "error", "error": error})
    }
});

export default app;