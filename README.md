# Piyush Gupta — Portfolio

A static, responsive portfolio for Piyush Gupta, a machine learning engineer. It highlights Akshaa, selected projects, experience, skills, research references, and contact links.

## Run locally

Open `index.html` in a browser, or serve this directory with:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. No build step is required.

## Update content

- Edit `index.html` for project descriptions, experience, skills, links, and contact information.
- The résumé buttons link to the shared Google Drive résumé. Update both links in `index.html` when the résumé location changes; check its sharing permissions before publishing.
- Edit `styles.css` for the responsive layout and light/dark theme colors. The theme toggle saves the visitor's preference in browser storage when available.
- The hero portrait (`portrait-pixel.webp`) is cropped to remove the color key. Its numbered tiles assemble into the image on page load; `script.js` skips the 1.65-second canvas animation when reduced motion is requested.
- The Akshaa section includes three detection examples (`akshaa-detection-01.webp` through `akshaa-detection-03.webp`). The photography gallery uses `photography-01.webp` through `photography-04.webp`, `hackathon-01.webp`, `hackathon-02.webp`, `hackathon-04.webp`, and `swaraksha-event.webp`. To update them, replace the images or edit their paths, alt text, and captions in `index.html`. The event badge QR code is obscured.
- The Discord entry shows a username rather than a profile link; add a profile URL if you have one.

## Deploy

Publish this directory as a static site, for example through GitHub Pages from the repository's main branch. Before sharing it, verify the résumé permissions, contact details, project claims, and any company confidentiality requirements.
