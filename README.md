# Rooms To Go — Store Mode POC

Interactive proof of concept for the Store Mode feature proposal.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:5173 in your browser.

## Demo Flow

1. Store Entry — App detects you're in a Rooms To Go location
2. Store Home — Tap "Scan a Product Tag" to begin
3. Scanner — Tap to scan; simulates a QR scan with animation
4. Product Detail — Price, availability, colors, Complete the Room suggestions
5. Save to Room — Tap Save to add to your persistent room list
6. Push Notification — Appears after saving first item
7. My Room — View all saved items, running total, and share link

## Built With

- React 18
- Vite
- Claude Code
