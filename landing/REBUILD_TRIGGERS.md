# Rebuild Triggers

The dev server watches for changes and auto-rebuilds. These are configured in `craco.config.js`:

## File Watching Configuration

```javascript
watchOptions: {
  ignored: [
    '**/node_modules/**',
    '**/.git/**',
    '**/build/**',
    '**/dist/**',
    '**/coverage/**',
    '**/public/**',
  ],
  poll: 1000,              // Poll file system every 1s (required on Windows)
  aggregateTimeout: 300,   // Wait 300ms after change to rebuild
}
```

## Hot Module Replacement (HMR)

Enabled in dev server:
- `hot: true` - Hot module replacement for instant updates
- `liveReload: true` - Full page reload fallback if HMR fails

## Watched Directories

The dev server watches these locations and rebuilds on changes:
- `src/` - React components, pages, hooks, utilities
- `public/` - Static assets (though we ignore this in webpack)
- `.env.local` - Environment variables

## Manual Rebuild Triggers

Edit any of these files to trigger a rebuild:
- `src/**/*.js` or `src/**/*.jsx` - Components
- `src/**/*.css` - Stylesheets
- `.env.local` - Environment variables
- `craco.config.js` - Build configuration (requires server restart)
- `package.json` - Dependencies (requires `npm install` + server restart)
- `tailwind.config.js` - Tailwind config (requires server restart)

## Testing the Rebuild

To verify the dev server is watching:

1. Run `npm start`
2. Open http://localhost:3000 in browser
3. Edit any file in `src/`
4. Changes should appear in browser within ~2 seconds

## Performance Notes

- Windows file watchers can be slow; set `poll: 1000` for polling mode
- Large projects may need `WATCHPACK_POLLING=true` env var
- If rebuilds aren't triggering, try restarting dev server
