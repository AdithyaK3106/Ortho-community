# Ortho Landing Page

The public site for Ortho: a React frontend and a FastAPI backend that stores waitlist signups.

## Run Locally

**Frontend** (http://localhost:3000):
```bash
npm install
npm start
```

**Backend** (http://localhost:8000, API docs at `/docs`):
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env        # set MONGO_URL
uvicorn server:app --reload
```

## Structure

```
landing/
├── src/
│   ├── components/landing/   # Hero → Problem → Solution → Demo → Features → CTA
│   └── pages/Landing.jsx
├── backend/
│   └── server.py             # Waitlist API (FastAPI + MongoDB)
└── SETUP.md                  # Full setup, configuration, and deployment guide
```

## Waitlist API

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/waitlist` | Join — validates email, rejects duplicates |
| `GET` | `/api/waitlist/count` | Total signups |
| `GET` | `/api/waitlist` | List entries (admin) |

Details, deployment, and troubleshooting: [SETUP.md](SETUP.md)
