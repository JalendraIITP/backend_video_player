import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: '100kb',
}));

app.use(express.urlencoded({
    extended: true,
    limit: '100kb',
}));

app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'

// routes declarations
app.use('/users', userRouter);

export { app }