# CinemaVR — Your seat. Your cinema.

A private, IMAX-inspired virtual cinema you run in the browser. Bring your own film — a local
video file (under 2 GB) or a YouTube link — pick any of the 108 seats in the hall, and the
lights go down around a huge, gently curved large-format screen.

## Run it

```bash
npm install
npm run dev        # local dev server (sources in src/)
npm run build      # production build + regenerates the single-file index.html
```

Open the printed URL, or just open `index.html` — it is fully self-contained.
For headset VR the page must be served over HTTPS (or localhost).

## The experience

- **The Grand Theatre** — a real-time 3D auditorium (three.js): tiered seating for 108,
  aisle light strips, wall sconces, ceiling grid, and a curved scope screen with a glowing
  trim line. Drag to look around from your seat at any time.
- **Bring your own film** — upload MP4 / WEBM / MOV (validated under 2 GB) or paste a
  YouTube URL. YouTube plays through the official embedded player on the desktop screen.
- **Automatic screen masking** — like a real cinema, the screen reshapes to the aspect
  ratio of your film (16:9, 2.39:1, vertical, …) instead of stretching it.
- **Seat picker** — rows A–J style grid (A–I × 12). Your choice moves the camera to that
  exact seat. Change seats mid-film from the player bar, or in VR by pointing a controller
  at a seat and pulling the trigger.
- **Player bar** — exit, play/pause, seek, mute, seat change, and Enter VR.
- **VR mode** — WebXR `immersive-vr` with `local-floor`. Browsers bridge WebXR to the
  device's OpenXR/VR runtime, so Quest, PICO and desktop OpenXR headsets work through a
  WebXR-capable browser. Without a headset, the 3D theatre still works with mouse/touch.

## Privacy model (by design)

- Local videos are **never uploaded and never written to persistent browser storage**.
  The app holds a temporary in-memory reference (`URL.createObjectURL`) to the file your
  browser already has.
- That reference is released when the film ends, when you exit, or when the tab closes —
  the app drops the video element source, disposes the GPU texture and revokes the object
  URL. Your original file on disk is untouched.
- YouTube playback is a stream from YouTube's embedded player and follows YouTube's own
  privacy policy.

## Honest technical notes

- "OpenXR view" is delivered through **WebXR**, the browser API that talks to OpenXR
  runtimes. A website cannot speak OpenXR directly.
- **4K**: supported source files play back at their native resolution on the 3D screen,
  limited only by your device, browser and codec. Lower-resolution videos are not
  magically upscaled to true 4K.
- **YouTube in VR**: YouTube's embedded player cannot be drawn onto a WebGL texture, so
  immersive VR playback uses local videos only. YouTube links play on the desktop screen.
- CinemaVR is an independent, IMAX-*inspired* experience and is not affiliated with IMAX.

## Files

## Hosting & GitHub

Any static host works for the lobby and local-video screenings. **YouTube links need a real
http(s) origin** (YouTube rejects `file://` embeds with Error 153): GitHub Pages, Netlify,
Vercel, or the bundled localhost launcher all qualify.

To push:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

Then optionally enable GitHub Pages (Settings → Pages) to get a hosted https origin where
YouTube embeddings work for every visitor.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Generated single-file build — the whole cinema in one file; GitHub Pages serves it as-is |
| `src/index.html` | Lobby, seat-picker modal, player bar markup (source) |
| `src/style.css` | Cinema theme (charcoal + projection lime), responsive layout |
| `src/src.js` | three.js theatre, video texture pipeline, seat logic, WebXR |
| `scripts/inline.mjs` | Inlines the Vite build into the single-file `index.html` |
| `vite.config.mjs` | Vite config (source root `src/`, dev server on 0.0.0.0) |
| `start-cinemavr.sh` / `Start-CinemaVR.command` / `Start-CinemaVR.bat` | Double-click launchers: serve at http://localhost:8080 and open the browser |

A 45 s sample reel for quick tests can be generated with ffmpeg:
`ffmpeg -f lavfi -i testsrc2=size=1280x720:rate=24:duration=45 -pix_fmt yuv420p -c:v libx264 test-clip.mp4`
