const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function setTheme(theme) {
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

let savedTheme;
try {
    savedTheme = localStorage.getItem('theme');
} catch (error) {
    console.warn('Theme preference could not be read:', error);
}
setTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try {
        localStorage.setItem('theme', theme);
    } catch (error) {
        console.warn('Theme preference could not be saved:', error);
    }
});

function closeMenu() {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
}

menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

siteNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
    }
});

document.getElementById('year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const portraitArt = document.querySelector('.portrait-art');
const portraitImage = portraitArt?.querySelector('img');
const portraitCanvas = portraitArt?.querySelector('canvas');

if (!reducedMotion && portraitArt && portraitImage && portraitCanvas) {
    const context = portraitCanvas.getContext('2d');
    if (context) {
        const assemblePortrait = () => {
            const width = portraitImage.naturalWidth;
            const height = portraitImage.naturalHeight;
            if (!width || !height) return;

            portraitCanvas.width = width;
            portraitCanvas.height = height;
            context.imageSmoothingEnabled = false;

            const tileSize = 24;
            const tiles = [];
            for (let y = 0; y < height; y += tileSize) {
                for (let x = 0; x < width; x += tileSize) {
                    tiles.push({
                        x,
                        y,
                        width: Math.min(tileSize, width - x),
                        height: Math.min(tileSize, height - y),
                        offsetX: (Math.random() - 0.5) * width * 0.6,
                        offsetY: (Math.random() - 0.5) * height * 0.6,
                        rotation: (Math.random() - 0.5) * 0.5,
                        delay: Math.random() * 240
                    });
                }
            }

            const duration = 1650;
            portraitArt.classList.add('is-assembling');
            const start = performance.now();

            const drawFrame = now => {
                const elapsed = Math.min(now - start, duration);
                context.clearRect(0, 0, width, height);

                tiles.forEach(tile => {
                    const progress = Math.max(0, Math.min(1, (elapsed - tile.delay) / (duration - tile.delay)));
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const centerX = tile.x + tile.width / 2 + tile.offsetX * (1 - eased);
                    const centerY = tile.y + tile.height / 2 + tile.offsetY * (1 - eased);

                    context.save();
                    context.globalAlpha = 0.35 + eased * 0.65;
                    context.translate(centerX, centerY);
                    context.rotate(tile.rotation * (1 - eased));
                    context.drawImage(
                        portraitImage,
                        tile.x, tile.y, tile.width, tile.height,
                        -tile.width / 2, -tile.height / 2, tile.width, tile.height
                    );
                    context.restore();
                });

                if (elapsed < duration) {
                    requestAnimationFrame(drawFrame);
                } else {
                    portraitArt.classList.add('is-finishing');
                    window.setTimeout(() => {
                        portraitArt.classList.remove('is-assembling', 'is-finishing');
                        portraitCanvas.remove();
                    }, 220);
                }
            };

            requestAnimationFrame(drawFrame);
        };

        if (portraitImage.complete && portraitImage.naturalWidth) {
            assemblePortrait();
        } else {
            portraitImage.addEventListener('load', assemblePortrait, { once: true });
        }
    }
}

if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
}
