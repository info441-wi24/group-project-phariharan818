import express from 'express';
var router = express.Router();
import models from '../../../../models.js';

router.get("/", async function(req, res, next) {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let jobStatus = req.body.jobStatus
    try { 
        let filteredJobs = [];
        if (startDate && endDate && jobStatus) {
            filteredJobs = await req.models.Job.find({"startDate": startDate, "startDate": endDate, "jobStatus": jobStatus});
        } else if (startDate && endDate) {
            filteredJobs = await req.models.Job.find({"startDate": startDate, "endDate": endDate});
        } else if (jobStatus) {
            filteredJobs = await req.models.Job.find({"jobStatus": jobStatus});
        } else {
            filteredJobs = await req.models.Job.find({});
        }
        res.status(200).json({"status": "success", "jobs": filteredJobs});
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

app.delete('/jobs/:id', async function(req, res, next) {
    const jobId = req.params.id;
    try {
        const deletedJob = await models.Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ "status": "error", "message": "Job not found" });
        }
        res.status(200).json({ "status": "success", "message": "Job deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "status": "error", "error": error });
    }
});

export default router;