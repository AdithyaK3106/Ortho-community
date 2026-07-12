# Ortho Community Edition - Deployment Checklist

Complete this checklist before launching to production.

---

## Pre-Deployment (Local Testing)

### README & Documentation
- [ ] Review README.md top section
- [ ] Verify Mermaid diagram renders correctly
- [ ] Check all links in README work
- [ ] Review CONTRIBUTING.md for clarity
- [ ] Review CHANGELOG.md for completeness

### Landing Page (Frontend)
- [ ] `cd landing && npm install`
- [ ] `npm start` runs without errors
- [ ] Page loads at http://localhost:3000
- [ ] All sections visible (hero, features, CTA)
- [ ] Waitlist signup form present
- [ ] Mobile responsive (test on phone/tablet)
- [ ] No console errors (F12 → Console)
- [ ] Network requests working (F12 → Network)

### Backend API
- [ ] `cd landing/backend && pip install -r requirements.txt`
- [ ] `cp .env.example .env`
- [ ] Add local MongoDB URL to `.env`
- [ ] `uvicorn server:app --reload` starts without errors
- [ ] API docs load at http://localhost:8000/docs
- [ ] Test POST /api/waitlist endpoint:
  ```bash
  curl -X POST http://localhost:8000/api/waitlist \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","role":"engineer"}'
  ```
- [ ] Response includes id, email, created_at, duplicate: false
- [ ] Test duplicate submission (should show duplicate: true)
- [ ] Test GET /api/waitlist/count (returns total)
- [ ] CORS headers present in response

### Integration Testing
- [ ] Frontend can reach backend (check Network tab)
- [ ] Waitlist signup form submits without errors
- [ ] Form validation works (try invalid email)
- [ ] Success message appears after signup
- [ ] Duplicate email shows "already signed up"
- [ ] No errors in browser console
- [ ] No errors in backend logs

---

## Infrastructure Setup

### MongoDB
- [ ] MongoDB Atlas account created
- [ ] New cluster created
- [ ] Database user created (username/password)
- [ ] IP whitelist configured (allow all for dev: 0.0.0.0/0)
- [ ] Connection string copied
- [ ] Test connection locally works

### Frontend Hosting (Vercel/Netlify)
- [ ] GitHub repo connected
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variable set: `REACT_APP_API_URL=<backend-url>`
- [ ] Deploy from main branch
- [ ] Preview deployment working
- [ ] Test Swagger UI link points to production API

### Backend Hosting (Railway/Render)
- [ ] GitHub repo connected
- [ ] Start command: `uvicorn server:app --host 0.0.0.0 --port 8000`
- [ ] Environment variables set:
  - [ ] `MONGO_URL=<production-atlas-url>`
  - [ ] `DB_NAME=ortho_landing`
  - [ ] `CORS_ORIGINS=https://your-domain.com`
- [ ] Deploy from main branch
- [ ] Health check endpoint responds (GET /)
- [ ] Swagger UI accessible at /docs

---

## Production Configuration

### Frontend
- [ ] `REACT_APP_API_URL` points to production backend
- [ ] No console warnings or errors
- [ ] Analytics configured (optional)
- [ ] Error tracking configured (Sentry, etc.)

### Backend
- [ ] `MONGO_URL` points to production MongoDB Atlas
- [ ] `DB_NAME` set to production database name
- [ ] `CORS_ORIGINS` includes only production domain
- [ ] Logging configured (level: INFO)
- [ ] Environment: production
- [ ] Error tracking configured

### MongoDB
- [ ] Production user created (separate from dev)
- [ ] IP whitelist restricted (only backend server)
- [ ] Backups enabled
- [ ] Collections created:
  - [ ] `waitlist`
  - [ ] `status_checks`

---

## Security Checks

### Frontend
- [ ] No hardcoded secrets in code
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables in .env files (not git)

### Backend
- [ ] No hardcoded MongoDB credentials
- [ ] CORS configured for production domain only
- [ ] Email validation enforced
- [ ] Rate limiting on waitlist endpoint
- [ ] HTTPS enabled
- [ ] Secrets stored in environment variables

### Database
- [ ] MongoDB authentication enabled
- [ ] IP whitelist configured (restrict to backend)
- [ ] Backups scheduled
- [ ] No public access enabled

---

## Testing Checklist

### API Testing
- [ ] POST /api/waitlist with valid email ✓
- [ ] POST /api/waitlist with invalid email (should fail) ✓
- [ ] POST /api/waitlist with duplicate email (should return duplicate: true) ✓
- [ ] GET /api/waitlist/count works ✓
- [ ] GET /api/waitlist returns all entries ✓
- [ ] CORS headers present ✓
- [ ] Error handling works ✓

### Frontend Testing
- [ ] Form validates required fields
- [ ] Form prevents duplicate signup
- [ ] Success message after signup
- [ ] Loading state during submission
- [ ] Error handling for API failures
- [ ] Mobile responsive
- [ ] All links working
- [ ] Images loading

### Across Browsers
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

---

## Performance Checks

### Frontend
- [ ] Build size acceptable
- [ ] Bundle analysis run
- [ ] Lighthouse score > 80
- [ ] Load time < 3 seconds
- [ ] First Contentful Paint < 1.5 seconds

### Backend
- [ ] Startup time < 5 seconds
- [ ] API response time < 200ms
- [ ] Database query time < 100ms
- [ ] No N+1 queries
- [ ] Memory usage stable

---

## Monitoring Setup

### Frontend
- [ ] Analytics configured (GA, Mixpanel, etc.)
- [ ] Error tracking (Sentry, etc.)
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Dashboard configured

### Backend
- [ ] Logging configured (stdout to logs service)
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring
- [ ] Uptime monitoring (health check endpoint)
- [ ] Database monitoring

---

## Documentation Review

### README
- [ ] Accurate and up-to-date
- [ ] Links all working
- [ ] Tagline clear and professional
- [ ] Quick start commands tested

### landing/README.md
- [ ] API endpoints documented
- [ ] Setup instructions clear
- [ ] Example requests included
- [ ] Troubleshooting section complete

### SETUP.md
- [ ] Installation steps tested
- [ ] Configuration examples clear
- [ ] Deployment instructions complete
- [ ] All links working

---

## Final Checks

### Code Quality
- [ ] No TODO or FIXME comments
- [ ] No console.log or print statements (except logging)
- [ ] No hardcoded test data
- [ ] All dependencies resolved
- [ ] No unused imports

### Git & Version Control
- [ ] All changes committed
- [ ] No secrets in git history
- [ ] .env files in .gitignore
- [ ] README version accurate
- [ ] CHANGELOG updated

### Deployment
- [ ] Frontend deployed and working
- [ ] Backend deployed and working
- [ ] API responding with production data
- [ ] Logs clean (no errors)
- [ ] Email validation working
- [ ] Duplicate detection working

---

## Launch Day

### Before Going Live
- [ ] Team notified of launch
- [ ] Monitoring dashboards open
- [ ] Slack alerts configured
- [ ] On-call person ready
- [ ] Rollback plan reviewed

### Going Live
- [ ] DNS updated (if using custom domain)
- [ ] URL announced on social media
- [ ] Analytics tracking confirmed
- [ ] First signups monitored
- [ ] No errors in logs

### After Launch
- [ ] Monitor API response times
- [ ] Monitor error rates
- [ ] Check waitlist signups
- [ ] Verify emails being stored
- [ ] Monitor database performance

---

## Post-Launch

### Week 1
- [ ] Monitor daily signups
- [ ] Check for errors
- [ ] Verify database integrity
- [ ] Monitor performance metrics
- [ ] Respond to user feedback

### Week 2+
- [ ] Plan marketing push
- [ ] Set up email sequences for waitlist
- [ ] Plan next features
- [ ] Analyze signup sources
- [ ] Prepare launch announcement

---

## Rollback Plan (If Needed)

- [ ] Frontend: Revert to previous deployment
- [ ] Backend: Revert to previous deployment
- [ ] Database: Restore from backup
- [ ] DNS: Update back to previous server
- [ ] Notify users of issue

---

## Sign-Off

- [ ] Developer: _______________ Date: ___________
- [ ] Review: _______________ Date: ___________
- [ ] Product: _______________ Date: ___________

---

## Notes

```
[Space for deployment notes, issues encountered, solutions applied]
```

---

**Status:** Use this checklist for every deployment  
**Last Updated:** July 2026  
**Next Review:** Before each production push

