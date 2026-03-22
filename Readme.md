# Vaulrizz — Anonymous Chat Room

A full-stack real-time chat application with end-to-end WebSocket communication, built with **React + TypeScript + Vite** (frontend) and **Node.js + Express + WebSocket** (backend).

🌐 **Live Demo:** [vaulrizz.vercel.app](https://vaulrizz.vercel.app)

## 🎯 Overview

**Vaulrizz** is a privacy-first chat platform where:
- Users create or join ephemeral chat rooms (max 2 participants)
- Messages exist only in memory and vanish when the room closes
- No registration, no logs, no history — just secure conversation
- Real-time delivery via WebSockets with automatic reconnection

### Architecture
- **Frontend**: [CHAT-APP-FE](CHAT-APP-FE) — React 19, TanStack Router, Tailwind CSS, WebSocket client
  - **Deployed on:** Vercel
- **Backend**: [CHAT-APP-BE](CHAT-APP-BE) — Express, `ws` library, in-memory room storage
  - **Deployed on:** Render (or similar Node.js host)

---

## ✨ Key Features

| Feature | Details |
|---------|---------|
| **Live Chat** | Real-time message delivery via WebSockets |
| **Auto-Deletion** | Rooms & messages wiped from memory on close |
| **No Registration** | Anonymous user IDs generated client-side |
| **Session Recovery** | 10-minute grace period on network disconnect |
| **Delete Messages** | Senders can remove messages; receivers see deletion marker |
| **Copy Room ID** | Share room codes easily via clipboard |
| **User Count** | Real-time participant display (0–2) |
| **System Messages** | Join/leave notifications broadcast to room |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm**

### Backend Setup
```sh
cd CHAT-APP-BE
npm install
npm run dev
# Server runs on http://localhost:3000
```

**Env vars** ([.env.example](CHAT-APP-BE/.env.example)):
```env
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### Frontend Setup
```sh
cd CHAT-APP-FE
npm install
npm run dev
# App runs on http://localhost:5173
```

**Env vars** ([.env.development](CHAT-APP-FE/.env.development)):
```
VITE_WS_URL=ws://localhost:3000
VITE_API_URL=http://localhost:3000
```

### Test Multi-User
Open two browser tabs → Both create/join same room ID → Chat in real-time.

---

## 📁 Project Structure

```
d:\chat-app\
├── CHAT-APP-FE/               # React + Vite frontend
│   ├── src/
│   │   ├── components/        # UI components & pages
│   │   ├── ContextApi/        # WebSocket context provider
│   │   ├── routing/           # TanStack Router setup
│   │   ├── icons/             # SVG icons
│   │   ├── lib/               # Utilities (cn, utils)
│   │   └── main.tsx           # App entry
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts     # (via @tailwindcss/vite)
│   └── package.json
├── CHAT-APP-BE/               # Express + WebSocket backend
│   ├── src/
│   │   └── index.ts           # Server & WS handlers
│   ├── tsconfig.json
│   ├── dist/                  # Compiled output
│   └── package.json
└── README.md                  # This file
```

---

## 🔌 WebSocket Protocol

### Client → Server Messages

**Create Room**
```json
{
  "type": "create",
  "payload": { "roomId": "unique-room-code" },
  "userId": "Anonymous-user-abc123"
}
```

**Join Room**
```json
{
  "type": "join",
  "payload": { "roomId": "existing-room-code" },
  "userId": "Anonymous-user-xyz789"
}
```

**Send Chat**
```json
{
  "type": "chat",
  "payload": { "message": "Hello!", "id": "uuid-v4" },
  "userId": "Anonymous-user-abc123"
}
```

**Delete Message**
```json
{
  "type": "delete",
  "payload": { "id": "message-uuid", "message": "This message has been deleted." },
  "userId": "Anonymous-user-abc123"
}
```

**Leave Room**
```json
{
  "type": "leave",
  "payload": { "roomId": "room-code" },
  "userId": "Anonymous-user-abc123"
}
```

### Server → Client Messages

**Joined**
```json
{
  "type": "joined",
  "payload": { "roomId": "room-code" },
  "roomUserCount": 1
}
```

**Received (Message)**
```json
{
  "type": "received",
  "message": "Hello!",
  "userId": "Anonymous-user-xyz789",
  "id": "uuid-v4"
}
```

**History**
```json
{
  "type": "history",
  "payload": [
    { "type": "system", "message": "User joined", "userId": "...", "id": "..." },
    { "type": "received", "message": "Hello", "userId": "...", "id": "..." }
  ]
}
```

**System (Join/Leave)**
```json
{
  "type": "system",
  "message": "Anonymous-user-abc123 has joined!",
  "userId": "Anonymous-user-abc123",
  "id": "uuid",
  "roomUserCount": 2
}
```

**Deleted**
```json
{
  "type": "deleted",
  "payload": [
    { "type": "deleted", "message": "This message has been deleted.", "userId": "...", "id": "..." },
    ...
  ]
}
```

**Error**
```json
{
  "type": "error",
  "message": "Room is full (Max 2 allowed)"
}
```

---

## 📖 Key Components & Files

### Frontend

| File | Purpose |
|------|---------|
| [`src/main.tsx`](CHAT-APP-FE/src/main.tsx) | App entry, router setup |
| [`src/ContextApi/WebSocketContextProvider.tsx`](CHAT-APP-FE/src/ContextApi/WebSocketContextProvider.tsx) | Global WebSocket hook (`useGlobalWebSocket`) |
| [`src/components/pages/ChatRoomPage.tsx`](CHAT-APP-FE/src/components/pages/ChatRoomPage.tsx) | Chat room logic, message state management |
| [`src/components/rooms/ChatRoom.tsx`](CHAT-APP-FE/src/components/rooms/ChatRoom.tsx) | Chat UI (nav, messages, input form) |
| [`src/components/MessageBox.tsx`](CHAT-APP-FE/src/components/MessageBox.tsx) | Message bubble + delete/copy menu |
| [`src/routing/routeTree.tsx`](CHAT-APP-FE/src/routing/routeTree.tsx) | Route definitions (home, create, join, chat) |
| [`vite.config.ts`](CHAT-APP-FE/vite.config.ts) | Vite + Tailwind setup |

### Backend

| File | Purpose |
|------|---------|
| [`src/index.ts`](CHAT-APP-BE/src/index.ts) | Express server, WebSocket server, all handlers |

---

## 🔐 How It Works

### Room Lifecycle
1. **User A creates** room `abc123` → Room stored in `rooms` Map
2. **User B joins** room `abc123` → Both added to room's `users` Set
3. **Messages sent** → Broadcasted to all users in room
4. **User leaves** → Removed from `users` Set; if empty, room scheduled for deletion (10-min grace)
5. **Room expires** → Deleted from memory, all messages lost

### Reconnection
- Socket closes unexpectedly? Backend keeps room for **10 minutes**
- User rejoins within grace period → Gets full message history
- After 10 min → Room auto-deleted

### Message Deletion
- Sender clicks "Delete" → Server updates message object with type `"deleted"`
- Deletion broadcasted to room → All clients show deletion marker

---

## 📊 API Endpoints

### REST

**Check if room exists** (used before join attempt)
```
GET /chat/room/:roomId/check?userId=<userId>
```

**Response:**
```json
{
  "exists": true,
  "isFull": false,
  "message": "Room exists"
}
```

Or:
```json
{
  "exists": false,
  "message": "room doesn't exist"
}
```

---

## 🛠 Build & Deploy

### Production Build

**Frontend:**
```sh
cd CHAT-APP-FE
npm run build
# Output: dist/
```

**Backend:**
```sh
cd CHAT-APP-BE
npm run build
# Output: dist/
npm start
```

### Deploy to Vercel (Frontend)

1. **Push to GitHub**
2. **Connect repo** to Vercel
3. **Set env vars** in Vercel dashboard:
```
VITE_WS_URL=wss://your-backend-url.onrender.com
VITE_API_URL=https://your-backend-url.onrender.com
```
4. **Deploy** (auto-deploy on push)

### Deploy to Render (Backend)

1. **Create new Web Service** on Render
2. **Connect GitHub repo** (CHAT-APP-BE directory)
3. **Set env vars**:
```
FRONTEND_URL=https://vaulrizz.vercel.app
PORT=3000
```
4. **Build command**: `npm run build`
5. **Start command**: `npm start`
6. **Deploy** (auto-deploy on push)

### Current Deployment

- **Frontend**: [vaulrizz.vercel.app](https://vaulrizz.vercel.app)
- **Backend**: `wss://vaulrizz-backend.onrender.com` (replace with actual URL)

---

## 📦 Dependencies

### Frontend ([CHAT-APP-FE/package.json](CHAT-APP-FE/package.json))
- **react@19** — UI library
- **@tanstack/react-router@1** — Client-side routing
- **tailwindcss@4** — Styling
- **react-use-websocket@4** — WebSocket hook
- **sonner@2** — Toast notifications
- **radix-ui@1** — Headless UI components
- **uuid@13** — Message IDs

### Backend ([CHAT-APP-BE/package.json](CHAT-APP-BE/package.json))
- **express@5** — HTTP server
- **ws@8** — WebSocket server
- **cors@2** — CORS middleware
- **typescript@5** — Type safety
- **dotenv@17** — Env vars

---

## 🎨 Styling

- **Tailwind CSS v4** with custom theme (dark neutral palette)
- **Custom shadows** (Aceternity-style)
- **Google Fonts**: Google Sans Flex, DM Sans, IBM Plex Mono, Bitcount
- **Animations**: GSAP (DotGrid), Motion/Framer Motion
- **No scrollbar** utility for chat container

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| [CHAT-APP-FE/vite.config.ts](CHAT-APP-FE/vite.config.ts) | Vite + path alias (`@/`) |
| [CHAT-APP-FE/tsconfig.json](CHAT-APP-FE/tsconfig.json) | TypeScript config + path mapping |
| [CHAT-APP-FE/components.json](CHAT-APP-FE/components.json) | shadcn/ui config |
| [CHAT-APP-BE/tsconfig.json](CHAT-APP-BE/tsconfig.json) | Backend TypeScript config |
| [CHAT-APP-FE/.env.development](CHAT-APP-FE/.env.development) | Dev WS URL |
| [CHAT-APP-FE/.env.production](CHAT-APP-FE/.env.production) | Prod WS URL |
| [CHAT-APP-BE/.env.example](CHAT-APP-BE/.env.example) | Backend env template |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend can't connect to backend | Ensure backend is running on `localhost:3000` and CORS is configured |
| Room not found when joining | Room code typo or room already expired (check 10-min grace period) |
| Messages not appearing | Verify WebSocket `readyState === OPEN` before sending |
| CORS errors | Update `FRONTEND_URL` in backend `.env` to match your frontend URL |
| Deployed frontend can't reach backend | Ensure backend URL in `.env.production` uses `wss://` (secure WebSocket) |

---

## 📝 Notes

- **Rooms are ephemeral**: No database, all data in memory
- **No encryption yet**: Current version transmits in plain JSON (consider adding TLS/SSL in production)
- **Max 2 users per room**: Hard-coded limit in backend
- **User IDs**: Generated client-side via `localStorage` + random string
- **Grace period**: 10 minutes before room auto-deletion
- **Production**: Deployment on Vercel + Render recommended for best performance

---

## 📄 License

ISC

---

## 👤 Author

Anonymous (Privacy-first by design!)

---

**Last Updated:** March 22, 2026

**Live:** [vaulrizz.vercel.app](https://vaulrizz.vercel.app)