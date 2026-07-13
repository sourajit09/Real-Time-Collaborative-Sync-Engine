import express from "express";
import {
  createDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getDocuments);           // list all
router.get("/:id", getDocument);         // get one by id
router.post("/", createDocument);        // create
router.patch("/:id", updateDocument);    // update by id
router.delete("/:id", deleteDocument);   // delete by id

export default router;