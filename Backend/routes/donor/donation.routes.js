import express from "express"
import { createDonation,getMyDonations } from "../../controllers/donor/donation.controller.js"
import authMiddleware from "../../middleware/auth.Middleware.js"
import roleMiddleware from "../../middleware/role.middleware.js"

const router=express.Router();
router.post("/",authMiddleware,roleMiddleware("DONOR"),createDonation);
router.get("/",authMiddleware,roleMiddleware("DONOR",getMyDonations));

export default  router