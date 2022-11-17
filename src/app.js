import express from "express";
import cors from "cors";
import { routes } from "./router";
import connect from "../db";
import fileUpload from "express-fileupload";
import * as dotenv from "dotenv";
dotenv.config()
export const app = express();

connect();
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    debug:true
}));
routes(app);
