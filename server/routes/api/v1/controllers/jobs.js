import express from 'express';
var router = express.Router();
import models from '../../../../models.js';

router.get("/", async function(req, res, next) {
    let { startDate, endDate, jobStatus } = req.query;
    let query = {};
    if (jobStatus) {
        query.jobStatus = jobStatus
    }
    if (startDate && endDate) {
        query.dateApplied = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    try {
        let filteredJobs = await req.models.Job.find(query)
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

router.delete('/:jobId', async function(req, res, next) {
    const jobId = req.params.jobId; // Extract jobId from URL parameters
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