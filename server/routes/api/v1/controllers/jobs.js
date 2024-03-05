import express from 'express';
var router = express.Router();
import models from '../../../../models.js';

router.get("/", async function(req, res, next) {
    let dateApplied = req.query.dateApplied
    let jobStatus = req.query.jobStatus
    try { 
        let allJobs = await req.models.Job.find({});
        if (dateApplied && jobStatus) {
            allJobs = await req.models.Job.find({"dateApplied": dateApplied, "jobStatus": jobStatus});
        } else {
            allJobs = await req.models.Job.find({});
        }
        console.log(allJobs)
        res.status(200).json({"status": "success", "jobs": allJobs});
    } catch (error) {
        console.log(error);
        res.status(500).json({"status": "error", "error": error});
    }
});

router.post('/', async function(req, res, next) {
    const { jobTitle, jobStatus, company, location, link, dateApplied } = req.body
    try {
        let newJob = new req.models.Job({
            jobName: jobTitle,
            jobStatus: jobStatus,
            company: company,
            location: location,
            applicationLink: link,
            dateApplied: new Date(dateApplied)
        })
        console.log(newJob)
        await newJob.save()        
        res.status(200).json({"status": "success"});
    } catch (error) {
        console.log(error)
        res.send(500).json({"status": "error", "error": error})
    }
});

export default router;