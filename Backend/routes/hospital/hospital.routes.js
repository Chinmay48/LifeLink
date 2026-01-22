import express from "express"
import { getHospitalProfile,upsertHospitalProfile } from "../../controllers/hospital/hospital.controller.js";
import authMiddleware from "../../middleware/auth.Middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";

const router=express.Router()

router.put("/profile",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),upsertHospitalProfile);
router.get("/profile",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),getHospitalProfile);

export default router