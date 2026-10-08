# Walmart Associate UI (educational demo)
React + TypeScript + Vite frontend. This is a **separate Git repository** from `walmart-assistant-api`.

## Run
`npm install` then `npm run dev`; open http://localhost:5173. Backend must be running on port 8000.

## Trace request in VS Code
`src/main.tsx` → `App.tsx` → `components/ChatWindow.tsx` → `components/ChatInput.tsx` → `hooks/useChatStream.ts` → **HTTP POST** `/api/v1/chat/stream` → backend `app/api/routes/chat.py`. Return path: SSE `final` → `ChatWindow.tsx` → `ApprovalCard.tsx` → **HTTP POST** approval endpoint.

The fixed demo token is **not production authentication**. Never ship an API key or a hardcoded credential to a real frontend.
