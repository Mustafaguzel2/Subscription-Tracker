import { Router } from "express";
import { sendRemainders } from "../controller/workflow.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/remainder", sendRemainders);

export default workflowRouter;