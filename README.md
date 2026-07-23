# Rooms To Go — Store Mode POC

Interactive proof of concept for the Store Mode feature proposal.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Demo Flow

1. **Store Entry** — App detects you're in a Rooms To Go location and prompts Store Mode
2. **Store Home** — Tap "Scan a Product Tag" to begin
3. **Scanner** — Tap the scan button; simulates a real QR scan with animation (resolves in ~1.8s)
4. **Product Detail** — See price, real-time availability, color options, and "Complete the Room" suggestions
5. **Save to Room** — Tap "Save" to add to your persistent room list
6. **Push Notification** — After saving your first item, a re-engagement notification appears after 3 seconds
7. **My Room** — View all saved items, running total, and share link

## Demo Tips

- Scan multiple times to see different products cycle through
- Save 2–3 items then open "My Room" to show the full list and total
- Tap the push notification when it appears to show the re-engagement flow
- Use "Share Room with Partner" to demo the collaborative purchase flow

## Built With

- React 18
- Claude Code
- Zero external dependencies beyond React
