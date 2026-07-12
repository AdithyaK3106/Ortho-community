# Ortho Community

> AI shouldn't guess. It should understand.

**Ortho** is an engineering intelligence layer for AI. It reads your repository, understands its architecture, and assembles the exact context a model needs to make safe engineering decisions.

## 📁 Project Structure

```
ortho-community/
├── landing/          # Landing page (React + FastAPI backend)
│   ├── src/          # React components
│   ├── backend/      # FastAPI server for waitlist
│   ├── public/       # Static assets
│   └── package.json
├── docs/             # Documentation
│   ├── installation.md
│   ├── cli.md
│   ├── architecture.md
│   └── faq.md
├── dashboard/        # Demo dashboard
├── assets/           # Images and resources
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.9+
- **MongoDB Atlas** account (free tier: https://cloud.mongodb.com)

### Frontend Setup

```bash
cd landing
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

### Backend Setup

1. **Get MongoDB Connection String**
   - Go to https://cloud.mongodb.com
   - Create cluster (free M0 tier)
   - Get connection string from "Connect" button

2. **Configure Backend**
   ```bash
   cd landing/backend
   cp .env.example .env
   # Edit .env and add your MongoDB connection string
   ```

3. **Start Backend**
   ```bash
   python -m uvicorn server:app --reload --port 8000
   ```

Backend API runs at: `http://localhost:8000`  
API Docs at: `http://localhost:8000/docs`

## ✨ Features

- **Repository Scanning** - Index symbols, imports, and call graphs
- **Architecture Detection** - Identify layered, hexagonal, MVC patterns
- **Context Assembly** - Package relevant files for AI models
- **Waitlist Management** - Collect early access signups with MongoDB
- **Hot Reload** - Live development with automatic recompilation

## 📚 Documentation

- [Installation Guide](docs/installation.md)
- [CLI Reference](docs/cli.md)
- [Architecture Deep Dive](docs/architecture.md)
- [FAQ](docs/faq.md)

## 🛠️ Development

### Environment Variables

**Frontend** (`.env.local` in `landing/`)
```
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_WAITLIST_ENDPOINT=http://localhost:8000/api/waitlist
REACT_APP_ENV=development
```

**Backend** (`.env` in `landing/backend/`)
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=ortho_landing
CORS_ORIGINS=http://localhost:3000,https://ortho.ai
API_PORT=8000
API_HOST=0.0.0.0
ENVIRONMENT=development
```

### Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: Edit `src/` files → automatic refresh
- **Backend**: Edit `server.py` → automatic reload

### Testing

**Frontend Tests**
```bash
cd landing
npm test
```

**Backend Tests**
```bash
cd landing/backend
pytest
```

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/` | API status |
| `POST` | `/api/waitlist` | Add to waitlist |
| `GET` | `/api/waitlist` | List waitlist entries |
| `GET` | `/api/waitlist/count` | Get waitlist count |

### Example: Join Waitlist

```bash
curl -X POST http://localhost:8000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "role": "engineer"
  }'
```

## 🔐 Security

- `.env` files are ignored (see `.gitignore`)
- MongoDB credentials never committed
- CORS configured for localhost + production domains
- Email validation on all submissions

## 📱 Deployment

### Frontend (GitHub Pages)

Push to `main` branch → GitHub Actions automatically:
1. Builds React app
2. Deploys to GitHub Pages
3. Available at: `https://AdithyaK3106.github.io/Ortho-Community`

See `.github/workflows/deploy.yml` for details.

### Backend (Render / Railway / Heroku)

1. Set environment variables on hosting platform
2. Point to `landing/backend/server.py`
3. Use `python -m uvicorn server:app --host 0.0.0.0 --port 8000`

## 🐛 Troubleshooting

**"Cannot connect to API"**
- Is backend running on port 8000?
- Check CORS configuration
- Verify `REACT_APP_BACKEND_URL` in `.env.local`

**"MongoDB connection failed"**
- Check connection string in `.env`
- Verify IP whitelist: `0.0.0.0/0`
- Ensure cluster is running

**"Hot reload not working"**
- Windows users: Run `WATCHPACK_POLLING=true npm start`
- Check file permissions
- Restart dev server

## 📝 License

Apache 2.0 - See LICENSE file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: urbrain369@gmail.com

---

**Status**: Ready for development & deployment  
**Last Updated**: 2026-07-12
