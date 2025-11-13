# IBM Solutions Landing Page - A1 Bulgaria

A modern, animated landing page for IBM solutions offered by A1 Bulgaria, featuring GSAP animations, dark mode, and custom PHP SMTP integration.

## 🚀 Live Preview

The server is running at: **http://localhost:8000**

GitHub Repository: https://github.com/Sevyan6608/IBM

## ✨ Features Implemented

### 🎬 GSAP Animations
- **Smooth Scroll**: GSAP ScrollSmoother for buttery-smooth scrolling experience
- **Parallax Effect**: Product cards with parallax image movement on scroll
- **SplitText**: Animated word-by-word reveals for all h1 and h2 headings
- **Inertia Plugin**: Draggable carousel for USP/advantages section on mobile devices
- **Hero Animations**: Staggered entrance animations for hero banners
- **Scroll-triggered**: Element animations that trigger when scrolling into view

### 🌓 Dark Mode
- Toggle button in top-right corner
- Persistent theme selection (saved in localStorage)
- Smooth transition between light and dark modes
- Custom color scheme for dark mode

### 📧 PHP SMTP Integration
- Replaced EmailJS with custom PHP SMTP solution
- Secure form submission with validation
- Rate limiting to prevent spam
- HTML-formatted emails
- Configuration file for easy SMTP setup

## 🛠️ Setup Instructions

### 1. SMTP Configuration

Edit `landing-page/config.env.php` and update with your SMTP credentials:

```php
define('SMTP_HOST', 'smtp.your-provider.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@example.com');
define('SMTP_PASS', 'your-password');
define('SMTP_TO', 'ibm@a1.bg');
```

**Popular SMTP Providers:**

**Gmail:**
- Host: smtp.gmail.com
- Port: 587
- Security: TLS
- Note: Enable 2FA and use App Password

**SendGrid:**
- Host: smtp.sendgrid.net
- Port: 587
- User: apikey
- Pass: Your SendGrid API key

**Office365:**
- Host: smtp.office365.com
- Port: 587
- Security: TLS

### 2. Start the Server

The PHP development server is already running on port 8000:

```bash
cd landing-page
php -S localhost:8000
```

Visit: http://localhost:8000

### 3. For Production

For production deployment, use Apache or Nginx with PHP-FPM. The site requires:
- PHP 7.4 or higher
- Mail function enabled OR PHPMailer library for SMTP

## 📁 Project Structure

```
ibm/
├── landing-page/
│   ├── css/
│   │   └── styles.css          # Main styles with dark mode
│   ├── js/
│   │   ├── main.js             # Navigation & dark mode toggle
│   │   ├── gsap-animations.js  # All GSAP animations
│   │   └── form.js             # Form validation & submission
│   ├── images/                 # All images and icons
│   ├── index.html              # Main HTML file
│   ├── send-email.php          # PHP SMTP handler
│   └── config.env.php          # SMTP configuration (update this!)
├── .gitignore
└── README.md
```

## 🎨 GSAP Effects Breakdown

### 1. Smooth Scroll
- GSAP ScrollSmoother applied to entire page
- Smooth factor: 1.5
- Mobile-optimized with reduced smoothness

### 2. Parallax Effect
- Applied to product card images
- Alternating up/down movement based on card index
- Scrubbed animation tied to scroll position

### 3. SplitText Animation
- All h1 and h2 elements animated word-by-word
- 3D rotation effect on entrance
- Staggered timing for natural flow

### 4. Inertia Plugin
- USP cards draggable on mobile (<1024px)
- Smooth momentum scrolling
- Snap to grid functionality

### 5. Additional Animations
- Hero section entrance animations
- Scroll-triggered card reveals
- Button hover effects
- Challenges/Solutions slide-in animations

## 🌙 Dark Mode

Dark mode toggle is located in the top-right corner. It:
- Switches between light and dark themes
- Saves preference to localStorage
- Applies theme on page load
- Smooth CSS transitions

## 📨 Form Submission

The contact form:
1. Validates all required fields client-side
2. Sends data to `send-email.php` via fetch API
3. PHP script sends formatted HTML email via SMTP
4. Includes rate limiting (1 submission per minute)
5. Error handling with user feedback

## 🔒 Security Features

- CSRF protection via rate limiting
- Input sanitization in PHP
- XSS prevention headers
- .gitignore protects config.env.php
- Validation on both client and server

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints optimized for all devices
- Touch-friendly interactions
- Optimized GSAP performance for mobile

## 🚀 Performance Optimizations

- Lazy loading for images
- Minimal GSAP bundle via CDN
- CSS variables for theming
- Efficient scroll listeners
- GPU-accelerated animations

## 🔧 Customization

### Using Custom Fonts

#### Method 1: Google Fonts (Recommended for Quick Setup)

Already implemented in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

To change to a different Google Font:
1. Visit [Google Fonts](https://fonts.google.com/)
2. Select your desired font and weights
3. Replace the link in `index.html` line 18
4. Update CSS variable in `styles.css`:
```css
:root {
    --font-family: 'Your-Font-Name', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### Method 2: Self-Hosted Fonts (Better Performance)

**Step 1: Download Font Files**

Download your font files in WOFF2 and WOFF formats (these are web-optimized).

**Step 2: Create Fonts Directory**
```bash
mkdir landing-page/fonts
```

**Step 3: Add Font Files**

Place your font files (e.g., `CustomFont-Regular.woff2`, `CustomFont-Bold.woff2`) in the `fonts` directory.

**Step 4: Add @font-face Rules**

Add this to the top of `landing-page/css/styles.css`:
```css
@font-face {
    font-family: 'CustomFont';
    src: url('../fonts/CustomFont-Regular.woff2') format('woff2'),
         url('../fonts/CustomFont-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap; /* Improves loading performance */
}

@font-face {
    font-family: 'CustomFont';
    src: url('../fonts/CustomFont-Bold.woff2') format('woff2'),
         url('../fonts/CustomFont-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}
```

**Step 5: Update CSS Variable**
```css
:root {
    --font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Step 6: Remove Google Fonts Link**

Remove or comment out the Google Fonts link in `index.html`.

#### Font Loading Best Practices

1. **Preload Important Fonts**: Add to `<head>` in `index.html`:
```html
<link rel="preload" href="fonts/CustomFont-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

2. **Use font-display: swap**: Prevents invisible text during loading
3. **Subset Fonts**: If using Latin characters only, use font subsets to reduce file size
4. **Limit Font Weights**: Only include the weights you actually use (e.g., 400, 600, 700)

### Add Client Logos

Replace the placeholder logos in `landing-page/images/clients/`:
- Use PNG with transparent background or JPG
- Recommended size: 400x200px (2:1 ratio)
- Keep files under 100KB each
- Name files descriptively: `client-company-name.png`

### Change GSAP Animation Speed
Edit `landing-page/js/gsap-animations.js`:
```javascript
duration: 0.8,  // Change this value
```

### Modify Dark Mode Colors
Edit `landing-page/css/styles.css`:
```css
[data-theme="dark"] {
    --color-bg-white: #1a1a1a;
    /* Update other variables */
}
```

### Add More Products
Edit `landing-page/index.html` and add new product cards in the products section.

## 📝 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers

## 🐛 Troubleshooting

**GSAP animations not working:**
- Check browser console for errors
- Ensure GSAP CDN links are loading
- Verify smooth-wrapper/smooth-content structure

**Form submission failing:**
- Check PHP error logs
- Verify SMTP credentials in config.env.php
- Ensure mail() function is enabled or use PHPMailer

**Dark mode not persisting:**
- Check browser localStorage is enabled
- Clear browser cache

## 📄 License

This project is created for A1 Bulgaria.

## 👨‍💻 Development

Built with:
- Vanilla HTML, CSS, JavaScript
- GSAP 3.12.5
- PHP 7.4+

---

Made with Claude Code
