import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/index.js";

const port = process.env.PORT || 8080;

const app: Express = express();

app.use(bodyParser.json());
app.use('/', router());

mongoose.connect('mongodb://localhost:27017', {})
    .then(() => console.log("DB connected"))
    .catch((err: Error) => console.log("Error connecting to MongoDB", err))

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});