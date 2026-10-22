# Arrow Zen

An arrow-snake puzzle for the browser, in plain Canvas + JavaScript with no dependencies. English and Persian (RTL), light and dark themes, installable and playable offline.

## Gameplay
- Tap a snake whose path in front of its head is clear to slide it out. Tapping a blocked snake costs a life and flashes it solid red for 3 s
- **3 lives, 3 hints and 3 undos per attempt**. Hints flash a snake you can remove; Undo brings back the last removed snake. Restarting refills them
- **Stars**: 3 stars for no lost heart, 2 for one, 1 for more. Replay any reached level from the grid button next to the level number on the home screen to improve its stars. Campaign boards are seeded by level number, so a level is the same board every time
- Pinch/wheel zoom, pan, guide lines, dotted empty cells, save and resume. Arrows that you pull out turn orange while they leave (blocked taps still flash red), and the grid dots they uncover pop in one after another. Clearing a board plays an "arrow volley": arrows in the game's own style burst out of the board centre while a gold wave lights the grid dots, then a win card drops in with a drawn check badge, stars that stamp in one by one, and an XP count-up
- Level generator (`generator.js`, in a Web Worker with a progress bar), fill-the-board mode, **100 board shapes**, all original artwork drawn for this game (the 19 icon shapes of the upstream project were removed) and all connected so the generator can fill them, eight difficulty tiers (Easy, Normal, Hard, Expert, Super hard, Nightmare, Legendary, Mythic) in a fixed order: every level belongs to a window of two neighbouring tiers (levels 1–15 mix Easy and Normal, 16–35 Normal and Hard, 36–60 Hard and Expert, and so on up to Mythic from level 251). Which of the two a level gets is pseudo-random but always the same for that level, trends harder through the window, and a tier never comes back once its window has passed. The tier decides the real board: size (up to 40×40), snake length (up to 60) and lives (3, 2 or 1). The windows are shown on the Levels page

## Modes and meta game
- **Time attack**: 90 s on the clock, +8 s per cleared board, -5 s per mistake. **Endless**: 3 lives for the whole run (+1 heart every 3 boards), boards keep growing. Best scores are kept; neither writes a save
- **Challenge**: monthly calendar starting from the month you first opened the game. Every day has its own date-seeded board (identical for everyone). Play today or catch up on earlier days. First clear of a day: +25 XP and streak. Clear the whole month to light the trophy. **Copy / share my month** shows a small emoji calendar (🟩 cleared, 🟦 today, ⬛ missed, ⬜ upcoming) and sends or copies it as plain text; nothing is uploaded
- **Streak**, offline **Leagues** (Bronze to Diamond by XP), **Collection** of all 100 shapes and **20 achievements**
- **Share** a cleared level or challenge day (Web Share API, falls back to the clipboard)
- **Generator** tab: custom size (20–100 cells, up to 35 with Fill) and shape, with an in-app explanation. Unlocks at level 20; never changes your level or league

## Layouts
- **Phone** (under 860 px wide): bottom tab bar, single column, top HUD bar in the game
- **Desktop** (860 px and wider): a real desktop layout instead of a stretched phone card. Left sidebar navigation (right side in Persian), a two-column dashboard on the home screen, two-column Challenge / Leagues / Generator pages, wide grids for Collection and Levels, two-column Settings. The game screen has a side panel (difficulty, hearts, progress, Hint / Back / Restart with keyboard-shortcut chips) next to a large framed board, and the Undo / Reset view / Guide lines buttons sit in their own strip under the board. Boards use at most 96 px cells so small levels do not become giant. Narrow desktop windows (860–1139 px) collapse the pages to one column

## Accessibility
- Colour-blind friendly option (orange flash, ✓ on completed days) and a high-contrast option (thicker lines, pure black/white, borders)
- Keyboard play on desktop: ←/→ choose a snake, Enter taps it, H hint, U undo, R restart, Esc back. Focus outlines appear only for keyboard users
- Respects `prefers-reduced-motion`; no tap highlight or ripple on touch

## Offline / install
`sw.js` precaches the whole app shell (112 files), so the game runs without a connection and can be installed from the browser (Settings shows an Install button when the browser offers it). **Bump `VERSION` in `sw.js` whenever you ship new files** so old caches are dropped.

## Run
`python -m http.server`, then open `http://localhost:8000` (the Web Worker, service worker and font need http, not file://), or push to GitHub Pages (workflow included).

## Notes
No sound and no vibration. The generator caps the per-snake search at 500 nodes and fill mode at 8 s so the browser never freezes. There is no online leaderboard.
