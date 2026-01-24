import express from "express"
import authMiddleware from "../../middleware/auth.Middleware.js";
import roleMiddleware from "../../middleware/role.middleware.js";
import { getOrganInventory,updateOrganStock } from "../../controllers/hospital/organBank.controller.js";
const router=express.Router()
router.get("/",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),getOrganInventory)
router.patch("/:organType",authMiddleware,roleMiddleware("HOSPITAL_ADMIN"),updateOrganStock)

export default router;