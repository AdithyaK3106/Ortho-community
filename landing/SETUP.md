# Ortho Landing Page Setup

This folder contains the landing page (React frontend) and backend server for Ortho's public site.

---

## Structure

```
landing/
├── src/                    # React source code
│   ├── components/landing/ # Hero, features, workflow, CTA
│   ├── pages/              # Landing page
│   └── App.js
├── backend/                # FastAPI backend
│   ├── server.py           # Main server with waitlist API
│   └── requirements.txt
├── package.json            # Frontend dependencies
├── tailwind.config.js      # Styling
└── craco.config.js         # Build config
```

---

## Prerequisites

- **Node.js** 16+ (for frontend)
- **Python** 3.9+ (for backend)
- **MongoDB** (for waitlist storage)
- Environment variables configured

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd landing
npm install
```

### 2. Environment Variables
Create `.env.local`:
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WAITLIST_ENDPOINT=http://localhost:8000/api/waitlist
```

### 3. Run Development Server
```bash
npm start
```

Runs at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

---

## Backend Setup

### 1. Install Dependencies
```bash
cd landing/backend
pip install -r requirements.txt
```

### 2. Environment Variables
Create `.env`:
```
MONGO_URL=mongodb://localhost:27017/
DB_NAME=ortho_landing
CORS_ORIGINS=http://localhost:3000,https://ortho.ai
```

### 3. Run Server
```bash
uvicorn server:app --reload --port 8000
```

Runs at `http://localhost:8000`

API docs at `http://localhost:8000/docs`

---

## Waitlist API

The backend provides waitlist management:

### Join Waitlist
```bash
POST /api/waitlist
Content-Type: application/json

{
  "email": "user@example.com",
  "role": "engineer",      # optional
  "referrer": "twitter"    # optional
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "engineer",
  "created_at": "2024-07-09T12:00:00Z",
  "duplicate": false
}
```

### Get Waitlist Count
```bash
GET /api/waitlist/count
```

**Response:**
```json
{
  "total": 1250
}
```

### List All Waitlist Entries
```bash
GET /api/waitlist
```

**Response:**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "engineer",
    "created_at": "2024-07-09T12:00:00Z"
  }
]
```

---

## Deployment

### Frontend (Vercel / Netlify)

1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `build`
4. Environment: Set `REACT_APP_API_URL` to production API

### Backend (Railway / Render)

1. Connect GitHub repo
2. Start command: `uvicorn server:app --host 0.0.0.0 --port 8000`
3. Environment variables: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`
4. Use MongoDB Atlas for cloud database

---

## Development

### Frontend

```bash
npm start           # Development server
npm run build       # Production build
npm test            # Run tests
npm run lint        # Lint code
```

### Backend

```bash
uvicorn server:app --reload      # Development
pytest                           # Run tests
black server.py                  # Format code
mypy server.py                   # Type check
```

---

## Features

**Landing Page:**
- Hero section with value proposition
- Feature showcase
- Architecture flow visualization
- CLI demo/walkthrough
- Comparison table
- Call-to-action sections
- Responsive design

**Backend API:**
- Waitlist signup with email validation
- Duplicate detection
- MongoDB persistence
- CORS support
- FastAPI auto-docs (Swagger UI)
- Async/await support
- Error handling

---

## Waitlist Integration

The landing page's CTA sections integrate with the backend:

```javascript
// Frontend code sends email to backend
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: userEmail,
    role: userRole,
    referrer: 'landing-page'
  })
});

const data = await response.json();
console.log(data); // { id, email, created_at, duplicate }
```

---

## Customization

### Change Logo
Edit `src/components/landing/Hero.jsx` - update logo path

### Change Colors
Edit `tailwind.config.js` - update theme colors

### Change API Endpoint
Edit `.env.local` - update `REACT_APP_API_URL`

### Add New Section
1. Create component in `src/components/landing/`
2. Import in `src/pages/Landing.jsx`
3. Add to page layout

---

## Troubleshooting

### "Cannot connect to API"
- Check backend is running on correct port
- Verify `REACT_APP_API_URL` in `.env.local`
- Check CORS configuration in backend

### "MongoDB connection failed"
- Verify `MONGO_URL` is correct
- Ensure MongoDB is running locally or accessible
- Check `DB_NAME` exists

### "Email validation failed"
- Ensure email format is valid
- Backend uses EmailStr (Pydantic validator)
- Check error message in response

---

## Production Checklist

- [ ] Environment variables configured for production
- [ ] MongoDB Atlas set up with backups
- [ ] Frontend built and tested
- [ ] Backend CORS configured for production domain
- [ ] HTTPS enabled on both frontend and backend
- [ ] Monitoring/logging enabled
- [ ] Backup strategy for waitlist data
- [ ] Error tracking (Sentry, etc.)

---

## Support

Issues with the landing page? Check:
1. Network tab in browser devtools
2. Backend logs (uvicorn output)
3. MongoDB logs
4. CORS configuration
5. Environment variables

---

**Status:** Production ready  
**Last updated:** July 2026  
**License:** Apache 2.0
