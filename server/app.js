import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js'
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware to share model with api handlers
app.use((req, res, next) => {
    req.models = models;
    next()
})

app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!");
});

app.get("/api", (req, res) => {
    res.json({ "status": "success" })
})

export default app;
