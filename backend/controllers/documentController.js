import {
  getAllDocuments,
  getDocumentById,
  createNewDocument,
  updateDocumentById,
  deleteDocumentById,
} from "../services/documentService.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await getAllDocuments();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocument = async (req, res) => {
  try {
    const document = await getDocumentById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const document = await createNewDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const document = await updateDocumentById(req.params.id, req.body);
    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await deleteDocumentById(req.params.id);
    if (!document) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};