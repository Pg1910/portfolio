# Piyush Gupta - Portfolio Website

A modern, responsive portfolio website showcasing Piyush Gupta's work as a Machine Learning Engineer. Built with HTML, CSS, and JavaScript, featuring dark mode, animations, and interactive elements.

## 🌟 Features

### Design & UX
- **Modern Design**: Clean, professional layout inspired by modern portfolio designs
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Fully responsive across all devices
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### Sections
- **Hero Section**: Eye-catching introduction with profile image and social links
- **About**: Personal information, education, and technical skills
- **Experience**: Timeline of work experience and internships
- **Projects**: Showcase of featured projects with GitHub links
- **Blog**: Latest blog posts linking to Substack
- **Contact**: Contact form and social media links

### Interactive Features
- **WhatsApp Chat Bot**: Interactive chatbot for visitor inquiries
- **Contact Form**: Functional contact form with success notifications
- **Downloadable Resume**: Direct download link for resume
- **Social Media Integration**: Links to GitHub, LinkedIn, Twitter, and Substack
- **Mobile Navigation**: Hamburger menu for mobile devices

## 🚀 Quick Start

### Prerequisites
- A modern web browser
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/piyush-portfolio.git
   cd piyush-portfolio
   ```

2. **Add Your Content**
   - Replace `profile.jpg` with your profile photo
   - Add project images (`project1.jpg`, `project2.jpg`, `project3.jpg`)
   - Add blog images (`blog1.jpg`, `blog2.jpg`)
   - Create and add your `resume.pdf`

3. **Customize Content**
   - Update personal information in `index.html`
   - Modify project details and links
   - Update contact information
   - Customize colors in `styles.css` if needed

4. **Test Locally**
   - Open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

## 📁 File Structure

```
piyush-portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # This file
├── profile.jpg         # Profile photo
├── resume.pdf          # Downloadable resume
├── project1.jpg        # Project images
├── project2.jpg
├── project3.jpg
├── blog1.jpg           # Blog post images
├── blog2.jpg
└── favicon.ico         # Website icon
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... other colors */
}
```

### Content Updates
- **Personal Info**: Update the hero section and about section in `index.html`
- **Projects**: Modify the projects section with your own projects
- **Experience**: Update the timeline with your work history
- **Skills**: Add or remove skills in the skills section

### Images
- **Profile Photo**: Replace `profile.jpg` (recommended size: 300x300px)
- **Project Images**: Replace project images (recommended size: 400x200px)
- **Blog Images**: Replace blog images (recommended size: 400x200px)

## 🌐 Deployment

### Pre-Deployment Checklist

Before deploying, ensure you have:
- ✅ Added your profile photo (`profile.jpg`)
- ✅ Added project images (`project1.jpg`, `project2.jpg`, `project3.jpg`)
- ✅ Added blog images (`blog1.jpg`, `blog2.jpg`)
- ✅ Added your resume (`resume.pdf`)
- ✅ Added favicon (`favicon.ico`)
- ✅ Updated all personal information in `index.html`
- ✅ Tested locally in your browser

### GitHub Pages (Recommended)

#### Method 1: Manual Setup

1. **Create GitHub Repository**
   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial portfolio commit"
   
   # Set main branch
   git branch -M main
   
   # Add remote repository (replace with your username)
   git remote add origin https://github.com/Pg1910/piyush-portfolio.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section (in left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
   - Wait 2-5 minutes for deployment

3. **Your site will be available at**: `https://pg1910.github.io/piyush-portfolio`

#### Method 2: GitHub CLI (Alternative)
```bash
# Install GitHub CLI
# Windows: winget install GitHub.cli
# macOS: brew install gh

# Login to GitHub
gh auth login

# Create repository and push
gh repo create piyush-portfolio --public --source=. --remote=origin --push

# Enable GitHub Pages via CLI
gh repo edit --enable-pages --pages-source=main
```

### Alternative Free Hosting Options

#### Netlify (Drag & Drop - Easiest)
1. **Prepare your files**: Ensure all images and content are added
2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your entire project folder
   - Get instant deployment with custom domain support
   - Your site URL will be provided immediately

#### Vercel (CLI - Fast & Modern)
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   # Navigate to your project directory
   cd piyush-portfolio
   
   # Deploy
   vercel
   
   # Follow the prompts:
   # - Link to existing project? No
   # - Project name: piyush-portfolio
   # - Directory: ./
   ```

3. **Your site will be available at**: `https://piyush-portfolio.vercel.app`

#### Surge.sh (Simple & Fast)
1. **Install Surge**:
   ```bash
   npm install --global surge
   ```

2. **Deploy**:
   ```bash
   # Navigate to your project directory
   cd piyush-portfolio
   
   # Deploy
   surge
   
   # Follow the prompts for domain name
   ```

3. **Your site will be available at**: `https://your-chosen-name.surge.sh`

#### Firebase Hosting (Google's Platform)
1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize and Deploy**:
   ```bash
   # Login to Firebase
   firebase login
   
   # Initialize project
   firebase init hosting
   
   # Deploy
   firebase deploy
   ```

### Custom Domain Setup

#### GitHub Pages with Custom Domain
1. **Purchase domain** from providers like Namecheap, GoDaddy, or Google Domains
2. **Add CNAME file** to your repository:
   ```
   yourdomain.com
   ```
3. **Configure DNS**:
   - Add CNAME record: `yourdomain.com` → `pg1910.github.io`
   - Add A record: `@` → `185.199.108.153`
4. **Enable HTTPS** in repository settings

#### Netlify with Custom Domain
1. **Deploy to Netlify** (see above)
2. **Add custom domain** in Netlify dashboard
3. **Update DNS** as instructed by Netlify

### Troubleshooting Common Issues

#### GitHub Pages Issues
- **Site not loading**: Check if repository is public
- **Images not showing**: Ensure image paths are relative (not absolute)
- **404 errors**: Verify `index.html` is in the root directory
- **Slow updates**: GitHub Pages can take 2-5 minutes to update

#### General Deployment Issues
- **Missing files**: Ensure all required images are in the project folder
- **Broken links**: Test all internal links before deploying
- **Mobile issues**: Test on different devices and browsers
- **Performance**: Optimize images (compress to reduce file size)

### Post-Deployment Checklist

After deployment, verify:
- ✅ Website loads correctly
- ✅ All images display properly
- ✅ Contact form works
- ✅ WhatsApp chatbot functions
- ✅ Dark/light mode toggle works
- ✅ Mobile responsiveness
- ✅ All links are functional
- ✅ Resume downloads correctly
- ✅ Social media links work
- ✅ SEO meta tags are present

### Performance Optimization

1. **Image Optimization**:
   ```bash
   # Use tools like ImageOptim or TinyPNG
   # Recommended image sizes:
   # - profile.jpg: 300x300px, < 100KB
   # - project images: 400x200px, < 150KB
   # - blog images: 400x200px, < 150KB
   ```

2. **Enable Compression** (if using Netlify/Vercel):
   - These platforms automatically compress assets
   - No additional configuration needed

3. **Caching**:
   - GitHub Pages, Netlify, and Vercel provide automatic caching
   - Clear cache if updates don't appear immediately

## 🔧 Advanced Customization

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Add navigation link if needed

### Modifying Animations
- Edit animation keyframes in `styles.css`
- Modify scroll-triggered animations in `script.js`

### Custom Chat Bot Responses
Update the `generateBotResponse()` function in `script.js` to customize chatbot responses.

## 📱 Mobile Optimization

The website is fully optimized for mobile devices with:
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-optimized buttons and interactions
- Optimized images and loading

## 🔍 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for social sharing
- Optimized images with alt text
- Fast loading times
- Mobile-first design

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions, please open an issue.

## 📞 Support

For questions or support:
- Email: gguptapiyush45@gmail.com
- LinkedIn: [Piyush Gupta](https://linkedin.com/in/piyush-gupta-200416309)
- GitHub: [@Pg1910](https://github.com/Pg1910)

## 🎯 Future Enhancements

Potential improvements:
- Blog CMS integration
- Project filtering system
- Analytics integration
- Multi-language support
- Advanced animations
- Portfolio gallery
- Testimonials section

---

**Built with ❤️ by Piyush Gupta**

*Machine Learning Engineer | AI Tool Builder | Research Enthusiast*
