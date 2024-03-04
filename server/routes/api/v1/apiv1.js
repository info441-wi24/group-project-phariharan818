import express from 'express';
var router = express.Router();

import jobsRouter from './controllers/jobs.js';

router.use('/jobs', jobsRouter)


export default router;
