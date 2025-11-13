# A1 Bulgaria IBM Landing Page

Professional, high-performance landing page showcasing IBM solutions for business customers of A1 Bulgaria.

## 🎯 Project Overview

This landing page is built with vanilla HTML, CSS, and JavaScript to ensure optimal performance and fast load times. The page features:

- **Bulgarian language** (Cyrillic) content
- **A1 brand colors** (#DA291C red, #000000 black)
- **Responsive design** (mobile-first approach)
- **EmailJS integration** for contact form
- **Google Tag Manager & Analytics** tracking
- **Accessibility compliant** (WCAG 2.1 Level AA)
- **High performance** (Lighthouse score > 90)

## 📁 Project Structure

```
landing-page/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet with responsive design
├── js/
│   ├── main.js             # Navigation, animations, tracking
│   └── form.js             # Form validation and EmailJS
├── images/
│   ├── icons/              # SVG icons for USP section
│   ├── products/           # Product images (to be added)
│   ├── a1-logo.svg         # A1 logo (to be added)
│   └── ibm-logo.svg        # IBM logo (to be added)
├── README.md               # This file
└── IMAGES_NEEDED.md        # Image requirements guide
```

## 🚀 Quick Start

### 1. Clone or Download

```bash
cd landing-page
```

### 2. Add Required Images

See `IMAGES_NEEDED.md` for a complete list of required images. At minimum, you need:
- A1 Bulgaria logo
- IBM logo
- Three product images (IBM Storage, Maximo IT, Watsonx)

### 3. Configure EmailJS

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Add your email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{company}}`
   - `{{name}}`
   - `{{phone}}`
   - `{{email}}`
   - `{{service}}`
   - `{{timestamp}}`

4. Update `js/form.js` with your credentials:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'your_public_key_here',
    SERVICE_ID: 'your_service_id_here',
    TEMPLATE_ID: 'your_template_id_here'
};
```

### 4. Configure Google Tag Manager

1. Create a GTM account at [Google Tag Manager](https://tagmanager.google.com/)
2. Create a container for your website
3. Update `index.html` with your GTM ID (replace `GTM-XXXXXXX`)

### 5. Configure Google Analytics 4

**Option A: Via GTM (Recommended)**
1. In GTM, add a GA4 Configuration tag
2. Add your GA4 Measurement ID

**Option B: Direct Implementation**
1. Get your GA4 Measurement ID from Google Analytics
2. Uncomment and update the GA4 code in `index.html`

### 6. Launch

Open `index.html` in a web browser or deploy to a web server.

## 🌐 Deployment

### Option 1: Netlify (Recommended)

1. Create a free account at [Netlify](https://www.netlify.com/)
2. Drag and drop the `landing-page` folder to Netlify
3. Your site will be live with automatic HTTPS and CDN

**Netlify CLI:**
```bash
npm install -g netlify-cli
cd landing-page
netlify deploy
```

### Option 2: Vercel

1. Create a free account at [Vercel](https://vercel.com/)
2. Install Vercel CLI:
```bash
npm install -g vercel
```
3. Deploy:
```bash
cd landing-page
vercel
```

### Option 3: GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select your branch and root folder
5. Your site will be available at `https://username.github.io/repository-name/`

### Option 4: Traditional Web Hosting

Upload all files to your web server via FTP/SFTP. Ensure:
- All files maintain their directory structure
- The web server supports HTTPS
- File permissions are correct (644 for files, 755 for directories)

## ⚙️ Configuration

### Email Notifications

The contact form uses EmailJS. To receive notifications:

1. Configure EmailJS as described in Quick Start
2. Test the form submission
3. Check your email for notifications

### Tracking Events

The page tracks the following events via Google Analytics:

- **CTA button clicks** - Location and button text
- **Product banner clicks** - Which product was clicked
- **Form submission** - Service selected
- **Form success/error** - Submission status
- **Page load time** - Performance metric

View these events in Google Analytics under Events.

### Customizing Content

#### Update Text Content

All text is in `index.html`. Edit the Bulgarian text directly in the HTML file.

#### Update Colors

A1 brand colors are defined in `css/styles.css` using CSS variables:

```css
:root {
    --color-primary: #DA291C;        /* A1 Red */
    --color-primary-dark: #B82318;   /* Darker red for hover */
    --color-secondary: #000000;      /* Black */
    /* ... */
}
```

#### Update Form Options

To modify the service dropdown options in the contact form, edit `index.html`:

```html
<select id="service" name="service" required>
    <option value="">Изберете услуга</option>
    <option value="IBM Storage">IBM Storage</option>
    <option value="IBM Maximo IT">IBM Maximo IT</option>
    <option value="IBM Watsonx">IBM Watsonx</option>
    <!-- Add more options here -->
</select>
```

## 🧪 Testing

### Browser Testing

Test the page in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Performance Testing

Run a Lighthouse audit:

1. Open the page in Chrome
2. Open DevTools (F12)
3. Go to Lighthouse tab
4. Run audit for Performance, Accessibility, Best Practices, SEO

**Target Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Form Testing

Test the contact form:
- [ ] All fields show validation errors when empty
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Checkbox validation works
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Email notification is received
- [ ] Form resets after submission

### Mobile Testing

Test responsive design:
- [ ] Mobile menu works correctly
- [ ] All sections are readable on mobile
- [ ] Images scale properly
- [ ] Form is usable on mobile
- [ ] Buttons are touch-friendly (min 44px)
- [ ] No horizontal scroll

### Accessibility Testing

Use these tools:
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- Screen reader testing (NVDA, VoiceOver)

## 📊 Analytics & Tracking

### Custom Events

The page sends these custom events to Google Analytics:

```javascript
// CTA Button Click
dataLayer.push({
    'event': 'cta_click',
    'button_text': 'Button text',
    'button_location': 'Section ID'
});

// Product Banner Click
dataLayer.push({
    'event': 'product_banner_click',
    'product_name': 'Product name'
});

// Form Submission
dataLayer.push({
    'event': 'form_submission',
    'form_name': 'contact_form',
    'service_selected': 'Selected service'
});

// Form Success
dataLayer.push({
    'event': 'form_submission_success',
    'form_name': 'contact_form'
});
```

### Viewing Analytics

1. Log in to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Go to Reports > Engagement > Events
4. View custom events and metrics

## 🔒 Security

### Best Practices

- All external scripts use HTTPS
- Form validation on both client and server (EmailJS)
- No sensitive data stored in client-side code
- GDPR-compliant consent checkbox
- XSS protection via input validation

### Privacy Policy

Update the privacy policy link in the contact form:

```html
<a href="https://www.a1.bg/privacy-policy" target="_blank">
    Политиката за поверителност
</a>
```

## 🎨 Customization

### Adding New Sections

To add a new section:

1. Add HTML in `index.html`:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <h2>Section Title</h2>
        <!-- Content -->
    </div>
</section>
```

2. Add navigation link:
```html
<li><a href="#new-section">Link Text</a></li>
```

3. Add styles in `css/styles.css`:
```css
.new-section {
    padding: var(--spacing-xxl) 0;
    background-color: var(--color-bg-white);
}
```

### Adding New Products

To add another product card:

1. Copy an existing product card in `index.html`
2. Update the content and image path
3. Add the product image to `images/products/`

## 🐛 Troubleshooting

### Form Not Sending Emails

1. Check browser console for errors
2. Verify EmailJS credentials in `js/form.js`
3. Check EmailJS dashboard for usage limits
4. Ensure EmailJS service is active

### GTM/Analytics Not Tracking

1. Check GTM container ID in `index.html`
2. Use GTM Preview mode to debug
3. Check browser console for errors
4. Verify tags are firing in GTM

### Images Not Loading

1. Check file paths are correct
2. Verify images exist in correct directories
3. Check file permissions
4. Ensure image formats are supported

### Mobile Menu Not Working

1. Check browser console for JavaScript errors
2. Verify `main.js` is loading correctly
3. Clear browser cache
4. Test in different browsers

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1440px
- Large Desktop: 1441px+
```

## 🌍 Browser Support

- Chrome (last 2 versions) ✓
- Firefox (last 2 versions) ✓
- Safari (last 2 versions) ✓
- Edge (last 2 versions) ✓
- Mobile Safari ✓
- Mobile Chrome ✓

## 📞 Support

For questions or issues:

- **Email:** ibm@a1.bg
- **Phone:** +359 888 123 456
- **Documentation:** See `IMAGES_NEEDED.md` for image requirements

## 📝 License

© 2025 A1 България. All rights reserved.

## 🔄 Version History

### Version 1.0.0 (2025-01-13)
- Initial release
- Bulgarian language content
- Responsive design
- EmailJS integration
- GTM and GA4 tracking
- Accessibility compliant

## ✅ Pre-Launch Checklist

Before going live:

- [ ] All images added and optimized
- [ ] EmailJS configured and tested
- [ ] GTM container ID updated
- [ ] GA4 tracking verified
- [ ] Privacy policy link updated
- [ ] Contact information verified
- [ ] All links tested
- [ ] Form submission tested
- [ ] Mobile responsive tested
- [ ] Cross-browser tested
- [ ] Lighthouse audit passed
- [ ] Accessibility audit passed
- [ ] HTTPS enabled
- [ ] Favicon added
- [ ] Social media share image added
- [ ] 404 page created (if needed)
- [ ] Robots.txt configured (if needed)

## 🚀 Performance Optimization

The page is already optimized for performance:

- Vanilla JavaScript (no heavy frameworks)
- Minimal CSS (single file)
- Lazy loading images
- Optimized fonts (Inter via Google Fonts)
- Efficient animations (CSS-based)
- Minimal HTTP requests
- Gzip/Brotli compression (server-side)

For further optimization:
- Enable CDN
- Implement service workers
- Use HTTP/2 or HTTP/3
- Add resource hints (preconnect, prefetch)

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Google Tag Manager Guide](https://support.google.com/tagmanager)
- [Google Analytics 4 Setup](https://support.google.com/analytics)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

**Built with ❤️ for A1 България**
