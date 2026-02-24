import cors from "cors";
import express from "express";
import { connectDB } from "./db.js";
import dotenv from "dotenv";


dotenv.config();
connectDB();
import { apiRouter } from "./routes/apiRouter.js";

// const PORT = 8000;
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/",apiRouter);


app.listen(process.env.PORT);
