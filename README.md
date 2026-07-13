# Real-Time Collaborative Sync Engine

A full-stack real-time document collaboration app where multiple users can edit the same document simultaneously and see each other's changes instantly — no refresh needed.

Built with the **MERN stack** and **Socket.io**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), socket.io-client, react-router-dom, axios |
| Backend | Node.js, Express.js |
| Real-time | Socket.io |
| Database | MongoDB (Mongoose) |
| Environment | dotenv |

---

## Project Structure

```
real-time-sync-engine/
├─ backend/
│  ├─ config/
│  │  └─ db.js                  # MongoDB connection
│  ├─ controllers/
│  │  └─ documentController.js  # HTTP request/response handlers
│  ├─ models/
│  │  └─ DocumentModel.js       # Mongoose schema
│  ├─ routes/
│  │  └─ documentRoutes.js      # REST API routes
│  ├─ services/
│  │  └─ documentService.js     # Business logic (DB operations)
│  ├─ sockets/
│  │  └─ documentSocket.js      # Socket.io real-time event handlers
│  ├─ .env
│  ├─ package.json
│  └─ server.js                 # Entry point
│
└─ frontend/
   ├─ src/
   │  ├─ lib/
   │  │  └─ socket.js           # Shared socket.io-client instance
   │  ├─ pages/
   │  │  ├─ Home.jsx
   │  │  └─ DocumentEditor.jsx  # Real-time editor page
   │  ├─ App.jsx
   │  └─ main.jsx
   └─ package.json
```

---

## Features

- **Live sync** — changes made by one user are instantly broadcast to all other users viewing the same document
- **Document rooms** — each document gets its own isolated Socket.io room using its MongoDB `_id`
- **REST API** — full CRUD for documents (create, read, update, delete)
- **Persistent storage** — documents are saved to MongoDB via a debounced `save-document` socket event
- **Clean architecture** — separated into Model → Service → Controller layers; socket logic is isolated from REST logic

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/real-time-sync-engine.git
cd real-time-sync-engine
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
node server.js
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## REST API Endpoints

Base URL: `http://localhost:5000/api/documents`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all documents |
| GET | `/:id` | Get a single document |
| POST | `/` | Create a new document |
| PATCH | `/:id` | Update a document |
| DELETE | `/:id` | Delete a document |

---

## Socket.io Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `join-document` | Client → Server | `documentId` | Join the room for this document |
| `send-changes` | Client → Server | `{ documentId, content }` | Broadcast a change to other users |
| `receive-changes` | Server → Client | `content` | Receive a change from another user |
| `save-document` | Client → Server | `{ documentId, content }` | Persist current content to MongoDB |

---

## How Real-Time Sync Works

```
User A types
    ↓
emit('send-changes', { documentId, content })
    ↓
Server receives → socket.to(documentId).emit('receive-changes', content)
    ↓
User B's browser receives 'receive-changes' → updates their textarea instantly
```

Each document has its own **Socket.io room** (named by `_id`). Broadcasting with `socket.to(room)` ensures changes only go to users viewing *that* document — not all connected users.

---

## Architecture Decisions

**Why separate Service and Controller layers?**
The socket layer (`documentSocket.js`) and the REST layer (`documentController.js`) both need to read/write documents. By putting all DB logic in `documentService.js`, both layers reuse the same functions without duplicating Mongoose calls.

**Why `autoConnect: false` on the client socket?**
The socket only connects when the editor page mounts, and disconnects on unmount. This avoids orphaned connections and unnecessary server load on non-editor pages.

**Why broadcast full content instead of diffs?**
For simplicity and demo clarity. A production sync engine would use operational transformation (OT) or CRDTs to send only character-level deltas and handle simultaneous edits without conflicts.

---

## Known Limitations

- **No conflict resolution** — if two users type at the exact same character position simultaneously, the last broadcast wins. True OT/CRDT is not implemented.
- **No authentication** — any user with a document URL can edit it.
- **Save is debounce-dependent** — document persistence relies on the frontend emitting `save-document` periodically; a server crash mid-session could lose recent changes.

---

## Future Improvements

- [ ] Add user authentication (JWT)
- [ ] Show live cursors and active user avatars per document
- [ ] Implement operational transformation or CRDT for true conflict resolution
- [ ] Add version history / document snapshots
- [ ] Deploy backend to Render and frontend to Vercel

---
