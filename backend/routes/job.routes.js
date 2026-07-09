import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Public Routes
router.get("/get", getAllJobs);
router.get("/get/:id", getJobById);

// Recruiter/Admin Routes
router.post("/post", isAuthenticated, postJob);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

export default router;