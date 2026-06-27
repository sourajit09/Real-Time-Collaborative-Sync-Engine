import express from "express";
import { createDocument, getDocument,updateDocument } from "../controllers/documentController.js";

const router=express.Router();

router.get("/getDocument",getDocument);
router.post("/createDocument",createDocument);
router.patch("/updateDocument",updateDocument);
// router.delete("/deleteDocument",deleteDocument);

export default router;