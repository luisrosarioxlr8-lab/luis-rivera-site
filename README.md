# Luis Rivera - Personal Site

A professional personal website for Luis Rivera, Finance & Operations Professional.
Hand-authored HTML / CSS / JS, dark navy and gold theme, modeled on the layout of
stuartsmith.dev and adapted to a finance and operations profile.

## Run it

Static site, no build step. Either:

```bash
node server.js
# then open http://localhost:4324
```

or open `index.html` directly in a browser.

## Structure

- `index.html` - all page sections (hero, about, skills, experience, education, contact)
- `styles.css` - design tokens and all styling (navy + gold, Space Grotesk / Archivo / Fraunces)
- `script.js` - constellation background, scroll reveal, active-nav highlighting (all reduced-motion aware)
- `server.js` - zero-dependency static server
- `assets/` - favicon, photo, resume PDF

## Before you publish (your to-do list)

1. **Add your photo.** Save your headshot as `assets/headshot.jpg` (portrait, roughly 440x520
   or larger, same aspect ratio). Until you do, a placeholder shows automatically.
2. **Add your LinkedIn URL.** Search `https://www.linkedin.com/in/` in `index.html` and
   replace it with your real profile URL (appears in the hero, contact section, and footer).
3. **Check the resume PDF.** `assets/Luis-Rivera-Resume.pdf` is generated from your resume
   data. Open it, confirm the details, and replace it with your own PDF if you prefer.
4. **Review the copy.** The experience descriptions are written from your job titles and
   listed skills. Adjust any wording so it matches exactly what you did.
5. **Update your location.** The contact section says "Open to relocation, United States."
   Change it if you want to show a specific city.

## Deploying

This is a static site. It can be hosted free on Netlify, Vercel, GitHub Pages, or
Cloudflare Pages by uploading this folder. No server required (the included `server.js`
is only for local preview).

## Design notes

- Palette: deep navy (#070b16) base with a champagne-gold accent (#e3c069)
- Type: Space Grotesk (headings), Archivo (body), Fraunces italic (emphasis words)
- Accessibility: visible focus rings, skip link, reduced-motion support, semantic headings,
  4.5:1+ text contrast, 44px+ touch targets
