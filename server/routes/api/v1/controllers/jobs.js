import express from 'express';
var router = express.Router();
import models from '../../../../models.js';

router.get("/", async function(req, res, next) {
    try {
        if (req.session.isAuthenticated) {
            let username = req.session.account.username;
            let user = await req.models.User.findOne({username});
            if (user) {
                let userId = user._id;
                let { startDate, endDate, jobStatus, searchTerm } = req.query;
                let query = { user: userId };
                if (jobStatus) {
                    query.jobStatus = jobStatus;
                }
                if (startDate && endDate) {
                    query.dateApplied = {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    };
                }
                if (searchTerm) {
                    query.jobName = { $regex: new RegExp(searchTerm, 'i') };
                }
                let filteredJobs = await req.models.Job.find(query);
                return res.status(200).json({ status: "success", "jobs": filteredJobs });
            } else {
                return res.status(404).json({ status: "error", error: "user not found" });
            }
        } else {
            return res.status(401).json({ status: "error", error: "not logged in" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", "error": error });
    }
});


router.post('/', async function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.status(401).json({
            status: "error",
            error: "not logged in"
        })
    }
    const { jobTitle, jobStatus, company, location, link, dateApplied, user } = req.body
    try {
        const userDoc = await req.models.User.findOne({ username: user });
        const userID = userDoc._id
        console.log(user)
        console.log(userID)
        let newJob = new req.models.Job({
            jobName: jobTitle,
            jobStatus: jobStatus,
            company: company,
            location: location,
            applicationLink: link,
            dateApplied: new Date(dateApplied),
            user: userID
        })

        // add in logic to save job after searching for user ID 
        console.log(newJob)
        await newJob.save()        
        res.status(200).json({"status": "success"});
    } catch (error) {
        console.log(error)
        res.send(500).json({"status": "error", "error": error})
    }
});

router.delete('/:jobId', async function(req, res, next) {
    const jobId = req.params.jobId; 
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

router.put('/:jobId', async function(req, res, next) {
    const jobId = req.params.jobId;
    const { jobStatus } = req.body;

    try {
        const updatedJob = await models.Job.findByIdAndUpdate(jobId, { jobStatus }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ "status": "error", "message": "Job not found" });
        }

        res.status(200).json({ "status": "success", "job": updatedJob });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "status": "error", "error": error });
    }
});

export default router;