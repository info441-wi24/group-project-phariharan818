import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js'
import cors from "cors";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import apiv1Router from './routes/api/v1/apiv1.js'

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

app.use('/api/v1', apiv1Router);

app.get("/", (req, res) => {
    res.status(200).json("Server is up and running! new words more new words blah blah bloah");
});


export default app;