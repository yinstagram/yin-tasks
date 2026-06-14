# Yin Tasks — Personal Operating System Web App

> A mobile-first PWA that integrates with Yin's Obsidian vault and Claude assistant for daily task management.

## Architecture

```
iPhone Safari (PWA)
       ↓ HTTPS
GitHub Pages (yinstagram.github.io/yin-tasks)
       ↓ Google Identity Services (client-side OAuth)
Cloudflare Worker (auth + API gateway)
       ↓ Cloudflare Tunnel
Mac local FastAPI server
       ↓
~/Vault/01_AI_Memory/active-tracking.md
~/Vault/Messages/inbox.md
```

## Features (planned)

- 🎯 Today's Top 3-5 priorities
- 🔧 Active projects (3D print, Sweden trip, invoices)
- 📚 To Learn queue
- 💬 Reply to Claude (writes to inbox.md)
- ✅ Mark tasks done
- 🚧 Stale item decision UI
- 🎉 Weekly completed celebration

## Auth

Google Sign-In (no password, no custom domain needed).
Single allowed account: zuyanww@gmail.com.

## Status

Scaffolded 2026-06-14.
