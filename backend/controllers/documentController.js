import DocumentModel from "../models/DocumentModel.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await DocumentModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDocument = async (req, res) => {
  try {
    const document = await DocumentModel.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const document = new DocumentModel(req.body);
    await document.save();
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const document = await DocumentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const document = await DocumentModel.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
