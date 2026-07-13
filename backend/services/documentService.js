import DocumentModel from "../models/DocumentModel.js";

export const getAllDocuments = async () => {
  return await DocumentModel.find();
};

export const getDocumentById = async (id) => {
  return await DocumentModel.findById(id);
};

export const createNewDocument = async (data) => {
  const document = new DocumentModel(data);
  return await document.save();
};

export const updateDocumentById = async (id, data) => {
  return await DocumentModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDocumentById = async (id) => {
  return await DocumentModel.findByIdAndDelete(id);
};