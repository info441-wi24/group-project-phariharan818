import express from 'express';
var router = express.Router();

import jobsRouter from './controllers/jobs.js';
import usersRouter from './controllers/users.js'

router.use('/jobs', jobsRouter)
router.use('/users', usersRouter)


export default router;
