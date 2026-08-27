// Theme
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let theme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

function closeMenu() {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
});

siteNav.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', closeMenu)
);

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Research lists
const papers = [
    { title: 'Attention Is All You Need', link: 'https://arxiv.org/abs/1706.03762' },
    { title: 'VGGT: Visual Geometry Grounded Transformer', link: 'https://arxiv.org/abs/2503.11651' },
    { title: 'GONet: A Generalizable Deep Learning Model for Glaucoma Detection', link: 'https://arxiv.org/abs/2502.19514' },
    { title: 'U-Net: Convolutional Networks for Biomedical Image Segmentation', link: 'https://arxiv.org/abs/1505.04597' },
    { title: 'Very Deep Convolutional Networks for Large-Scale Image Recognition (VGGNet)', link: 'https://arxiv.org/abs/1409.1556' },
    { title: 'Going Deeper with Convolutions (Inception/GoogLeNet)', link: 'https://arxiv.org/abs/1409.4842' },
    { title: 'Faster R-CNN: Towards Real-Time Object Detection', link: 'https://arxiv.org/abs/1506.01497' },
    { title: 'Fully Convolutional Networks for Semantic Segmentation (FCN)', link: 'https://arxiv.org/abs/1411.4038' },
    { title: 'You Only Look Once: Unified, Real-Time Object Detection (YOLO)', link: 'https://arxiv.org/abs/1506.02640' }
];

const datasets = [
    { name: 'xView', link: 'https://xviewdataset.org' },
    { name: 'RarePlanes', link: 'https://rareplanes.org' },
    { name: 'LEVIR-CD', link: 'https://justchenhao.github.io/LEVIR/' },
    { name: 'WHU-CD', link: 'https://study.rsgis.whu.edu.cn/pages/download/building_dataset.html' },
    { name: 'DOTA', link: 'https://captain-whu.github.io/DOTA/' },
    { name: 'ORIGA', link: 'https://refuge.grand-challenge.org/datasets/' },
    { name: 'REFUGE', link: 'https://refuge.grand-challenge.org/' },
    { name: 'DRISHTI-GS', link: 'https://cvit.iiit.ac.in/projects/mip/drishti-gs/' },
    { name: 'EyePACS (AIROGS-Light v2)', link: 'https://airogs.grand-challenge.org/' }
];

function renderLinks(listEl, items) {
    listEl.innerHTML = items
        .map(i => `<li><a href="${i.link}" target="_blank" rel="noopener">${i.title || i.name}</a></li>`)
        .join('');
}

renderLinks(document.getElementById('paperList'), papers);
renderLinks(document.getElementById('datasetList'), datasets);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Ambient background: slow-drifting node network
(function () {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const palette = {
        light: { node: '138, 131, 122', accent: '180, 83, 10' },
        dark: { node: '125, 120, 111', accent: '224, 138, 76' }
    };

    let w, h, dpr, nodes = [];
    const mouse = { x: null, y: null };
    const LINK_DIST = 140;
    const MOUSE_DIST = 200;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seed();
    }

    function seed() {
        const count = Math.min(90, Math.round((w * h) / 24000));
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: 1 + Math.random() * 1.6,
            accent: Math.random() < 0.12
        }));
    }

    function colors() {
        const theme = document.documentElement.getAttribute('data-theme');
        return palette[theme === 'dark' ? 'dark' : 'light'];
    }

    function draw() {
        const c = colors();
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d = Math.hypot(dx, dy);
                if (d < LINK_DIST) {
                    ctx.strokeStyle = `rgba(${c.node}, ${0.14 * (1 - d / LINK_DIST)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
            if (mouse.x !== null) {
                const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (d < MOUSE_DIST) {
                    ctx.strokeStyle = `rgba(${c.accent}, ${0.22 * (1 - d / MOUSE_DIST)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        for (const n of nodes) {
            ctx.fillStyle = n.accent ? `rgba(${c.accent}, 0.5)` : `rgba(${c.node}, 0.4)`;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function step() {
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
            if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
        }
        draw();
        requestAnimationFrame(step);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('pointerleave', () => { mouse.x = null; mouse.y = null; });

    resize();
    if (reducedMotion) {
        draw(); // static constellation, no motion
    } else {
        requestAnimationFrame(step);
    }
})();
