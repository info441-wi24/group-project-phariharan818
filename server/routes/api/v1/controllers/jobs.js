import express from 'express';
var router = express.Router();
import models from '../../../../models.js';

router.get("/", async function(req, res, next) {
    try {
        const jobStatus = req.query.jobStatus;
        const dateApplied = req.query.dateApplied;
        const jobs = await models.Job.find({});

        const filteredjobs = await models.Job.find({"jobStatus": jobStatus, "dateApplied": dateApplied});
        const filteredData = filteredjobs.filter(job => { 
            let isValid = true; 
            for (const key in jobs) { 
              console.log(key, job[key], jobs[key]); 
              isValid = isValid && job[key] == jobs[key]; 
            } 
            return isValid; 
        });
        
        // res.send(filteredData)
        console.log(filteredData)
        res.status(200).json({"status": "success", "jobs": jobs});
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