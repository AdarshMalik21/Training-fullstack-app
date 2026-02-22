import express from "express";
import getData from "../controller/getData.js";
import post from "../controller/postData.js";
import put from "../controller/putData.js";
import patch from "../controller/patchData.js";
export const apiRouter = express.Router();

apiRouter.post("/todos", post);

apiRouter.get("/todos", getData);

apiRouter.put("/todos/:index", put);

// PATCH method to update only selected fields
apiRouter.patch("/todos/:id", patch);
