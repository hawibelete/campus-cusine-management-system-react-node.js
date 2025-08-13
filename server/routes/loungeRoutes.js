import express from "express";
import {
    fetchAllLounges,
    fetchLoungeById,
    createNewLounge,
    updateLoungeById,
    deleteLoungeById, 
    fetchLoungesWithRating
} from "../controllers/loungeController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("admin"), fetchAllLounges);
router.get("/with-rating", authenticateToken, authorizeRoles("customer"), fetchLoungesWithRating); 
router.get("/:id", authenticateToken, authorizeRoles("admin", "customer"), fetchLoungeById);
router.post("/", authenticateToken, authorizeRoles("admin"), createNewLounge);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateLoungeById);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteLoungeById);



export default router;
