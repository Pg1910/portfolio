# Piyush Gupta — Portfolio

A static, responsive portfolio for Piyush Gupta, a machine learning engineer. It highlights Akshaa, selected projects, experience, skills, research references, and contact links.

## Run locally

Open `index.html` in a browser, or serve this directory with:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. No build step is required.

## Structure

- `index.html` — page content and links.
- `assets/css/` and `assets/js/` — styles and interactions.
- `assets/images/` — images used on the current site.
- `assets/legacy/` — older images and project covers kept for reference, not used by the current page.
- `PiyushGupta.pdf` and `favicon.ico` remain at the root to preserve their existing URLs.
- `vercel.json` — deploys the root directory as a static site without an install or build step.

The legacy images and covers have moved, so any external links to their old root paths need updating.

## Update content

- Edit `index.html` for project descriptions, experience, skills, links, and contact information.
- The résumé buttons link to the shared Google Drive résumé. Update both links in `index.html` when the résumé location changes; check its sharing permissions before publishing.
- Edit `assets/css/styles.css` for the responsive layout and light/dark theme colors. The theme toggle saves the visitor's preference in browser storage when available.
- The hero portrait (`assets/images/portrait-pixel.webp`) is cropped to remove the color key. Its numbered tiles assemble into the image on page load; `assets/js/script.js` skips the 1.65-second canvas animation when reduced motion is requested.
- The Akshaa section includes three detection examples (`assets/images/akshaa-detection-01.webp` through `akshaa-detection-03.webp`). The photography gallery uses `photography-01.webp` through `photography-04.webp`, `hackathon-01.webp`, `hackathon-02.webp`, `hackathon-04.webp`, and `swaraksha-event.webp` in `assets/images/`. To update them, replace the images or edit their paths, alt text, and captions in `index.html`. The event badge QR code is obscured.
- The Discord entry shows a username rather than a profile link; add a profile URL if you have one.

## Deploy on Vercel

1. Commit and push your changes to the GitHub repository connected to Vercel, including `vercel.json`.
2. On the [Vercel dashboard](https://vercel.com/dashboard), open your existing project, or import the GitHub repository as a new project.
3. In **Settings → Build and Deployment**, set the root directory to the repository root (`.`). The project configuration selects the **Other** framework preset, skips installation and building, and serves the repository root.
4. Deploy the new commit. If a deployment was already triggered by the push, open that deployment; otherwise, use **Deployments** to redeploy the new commit. Redeploying the older failed commit will not include the new configuration.
5. Once ready, open the Vercel URL and check the images, navigation, portrait animation, and résumé link on desktop and mobile.

If the output-directory error persists, confirm Vercel is building the new commit and that the root directory points to the folder containing `vercel.json` and `index.html`. The files in that directory, including legacy assets and the root PDF, may be publicly accessible. Before sharing the site, review those files, résumé permissions, contact details, project claims, and company confidentiality requirements.
