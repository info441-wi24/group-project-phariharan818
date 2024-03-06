import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js'
import cors from "cors";
import dotenv from 'dotenv'
import sessions from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import apiv1Router from './routes/api/v1/apiv1.js'
import WebAppAuthProvider from 'msal-node-wrapper'


dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const authConfig = {
    auth: {
        clientId: "b20de2ea-e8fd-4cb5-94fa-793f564f9312",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "QfB8Q~KteVFXAoi6cRZCa.SVg.r6Wjr_dNVQwcXr",
        redirectUri: "/redirect" //note: you can explicitly make this "localhost:3000/redirect" or "examplesite.me/redirect"
        // redirectUri: "https://websharer.kritivajjhula.me/redirect" // maybe add conditional prod url and local url using node env variables later
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
};


const app = express();
app.use(logger('dev'));
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "this is some secret key I am making up v45v;lkjgdsal;nwqt49asglkn",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());


// middleware to share model with api handlers
app.use((req, res, next) => {
    req.models = models;
    next()
})

app.use('/api/v1', apiv1Router);

app.get("/", (req, res) => {
    res.status(200).json("Server is up and running! new words more new words blah blah bloah");
});

app.use((req, res, next) => {
    console.log("session info:", req.session)
    next();
})

app.get(
    '/signin',
    (req, res, next) => {
        return req.authContext.login({
            postLoginRedirectUri: "/", // redirect here after login
        })(req, res, next);
    }
);

app.get(
    '/signout',
    (req, res, next) => {
        return req.authContext.logout({
            postLogoutRedirectUri: "/", // redirect here after logout
        })(req, res, next);
    }
);

app.use(authProvider.interactionErrorHandler());

export default app;