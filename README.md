# Arrow Zen

An arrow-snake puzzle for the browser, in plain Canvas + JavaScript with no dependencies. English and Persian (RTL), light and dark themes, installable and playable offline.

**License: GPL-3.0.** The game logic and assets derive from [robmat/arrows_game](https://github.com/robmat/arrows_game); keep `LICENSE`. The Vazirmatn font is OFL (`assets/fonts/OFL.txt`).

## Gameplay
- Tap a snake whose path in front of its head is clear to slide it out. Tapping a blocked snake costs a life and flashes it solid red for 3 s
- **3 lives, 3 hints and 3 undos per attempt**. Hints flash a snake you can remove; Undo brings back the last removed snake. Restarting refills them
- **Stars**: 3 stars for no lost heart, 2 for one, 1 for more. Replay any reached level from the grid button next to the level number on the home screen to improve its stars. Campaign boards are seeded by level number, so a level is the same board every time
- Pinch/wheel zoom, pan, guide lines, dotted empty cells, save and resume. Clearing a board plays an "arrow volley": arrows in the game's own style burst out of the board centre while a gold wave lights the grid dots, then a win card drops in with a drawn check badge, stars that stamp in one by one, and an XP count-up
- Level generator (`generator.js`, in a Web Worker with a progress bar), fill-the-board mode, **80 board shapes**, all original artwork drawn for this game (the 19 icon shapes of the upstream project were removed) and all connected so the generator can fill them, eight difficulty tiers (Easy, Normal, Hard, Expert, Super hard, Nightmare, Legendary, Mythic) shown on the home screen, in the game bar and as a legend on the Levels page. Boards stop growing at 40×40; later tiers get longer, more tangled snakes (up to 60 cells)

## Modes and meta game
- **Time attack**: 90 s on the clock, +8 s per cleared board, -5 s per mistake. **Endless**: 3 lives for the whole run (+1 heart every 3 boards), boards keep growing. Best scores are kept; neither writes a save
- **Challenge**: monthly calendar starting from the month you first opened the game. Every day has its own date-seeded board (identical for everyone). Play today or catch up on earlier days. First clear of a day: +25 XP and streak. Clear the whole month to light the trophy. **Share your month** builds a small emoji calendar (🟩 cleared, 🟦 today, ⬛ missed, ⬜ upcoming) with a live preview, and sends or copies it as plain text; nothing is uploaded
- **Streak**, offline **Leagues** (Bronze to Diamond by XP), **Collection** of all 80 shapes and **20 achievements**
- **Share** a cleared level or challenge day (Web Share API, falls back to the clipboard)
- **Generator** tab: custom size (20–100 cells, up to 35 with Fill) and shape, with an in-app explanation. Unlocks at level 20; never changes your level or league

## Accessibility
- Colour-blind friendly option (orange flash, ✓ on completed days) and a high-contrast option (thicker lines, pure black/white, borders)
- Keyboard play on desktop: ←/→ choose a snake, Enter taps it, H hint, U undo, R restart, Esc back. Focus outlines appear only for keyboard users
- Respects `prefers-reduced-motion`; no tap highlight or ripple on touch

## Offline / install
`sw.js` precaches the whole app shell (92 files), so the game runs without a connection and can be installed from the browser (Settings shows an Install button when the browser offers it). **Bump `VERSION` in `sw.js` whenever you ship new files** so old caches are dropped.

## Run
`python -m http.server`, then open `http://localhost:8000` (the Web Worker, service worker and font need http, not file://), or push to GitHub Pages (workflow included).

## Notes
No sound and no vibration. The generator caps the per-snake search at 500 nodes and fill mode at 8 s so the browser never freezes. There is no online leaderboard.
