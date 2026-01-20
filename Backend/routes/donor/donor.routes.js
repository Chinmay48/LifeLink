import { getProfile,updateAvailability,upsertProfile } from "../../controllers/donor/donor.controller";
import express from "express"
import authMiddleware from "../../middleware/auth.Middleware";
import roleMiddleware from "../../middleware/role.middleware";

const router=express.Router()
router.get("/profile",authMiddleware,roleMiddleware("DONOR"),getProfile)
router.put("/profile",authMiddleware,roleMiddleware("DONOR"),upsertProfile)
router.patch("/availability",authMiddleware,roleMiddleware("DONOR"),updateAvailability)

export default  router