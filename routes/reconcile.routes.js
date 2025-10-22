import { upload } from "../middlewares/multer.middlewares.js";
import { Router } from "express";
import { Reconciliation } from "../controllers/reconcile.controllers.js";
const router = Router();

router.post("/reconcile", upload.single("file"), Reconciliation);
export default router;
