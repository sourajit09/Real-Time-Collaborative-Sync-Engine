// sockets/documentSocket.js
import { updateDocumentById } from '../services/documentService.js';

export const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // 1. User opens a document → join its "room"
    socket.on('join-document', (documentId) => {
      socket.join(documentId);
      console.log(`Socket ${socket.id} joined document ${documentId}`);
    });

    // 2. User types something → broadcast it to everyone else in that room
    socket.on('send-changes', ({ documentId, content }) => {
      // socket.to() sends to everyone in the room EXCEPT the sender
      socket.to(documentId).emit('receive-changes', content);
    });

    // 3. Periodically/explicitly save to MongoDB (debounced on the frontend later)
    socket.on('save-document', async ({ documentId, content }) => {
      try {
        await updateDocumentById(documentId, { content });
        console.log(`Document ${documentId} saved`);
      } catch (err) {
        console.error('Error saving document:', err.message);
      }
    });

    // 4. Cleanup
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};