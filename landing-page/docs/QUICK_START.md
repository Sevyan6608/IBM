# Quick Start Guide

Get your A1 Bulgaria IBM landing page up and running in 5 minutes!

## 🚀 Immediate Preview

1. Open `index.html` in your web browser
2. The page will load with placeholder content and logos
3. Navigation, animations, and interactions are fully functional

**Note:** The contact form is in "demo mode" until you configure EmailJS.

## ⚡ Essential Setup (5 minutes)

### Step 1: Configure EmailJS (2 minutes)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Add an email service (Gmail is easiest)
3. Create a template with variables: `{{company}}`, `{{name}}`, `{{phone}}`, `{{email}}`, `{{service}}`
4. Copy your credentials and update `js/form.js`:

```javascript
// Line 13-15 in js/form.js
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'paste_your_public_key',
    SERVICE_ID: 'paste_your_service_id',
    TEMPLATE_ID: 'paste_your_template_id'
};
```

### Step 2: Add GTM (1 minute)

1. Get your GTM Container ID (format: `GTM-XXXXXXX`)
2. Find and replace `GTM-XXXXXXX` in `index.html` (appears 2 times)

### Step 3: Replace Logos (2 minutes)

Replace these placeholder files with your actual logos:
- `images/a1-logo.svg` - A1 Bulgaria logo
- `images/ibm-logo.svg` - IBM logo

## 📸 Add Product Images (Optional)

Replace placeholder files in `images/products/`:
- `ibm-storage.jpg`
- `ibm-maximo.jpg`
- `ibm-watsonx.jpg`

Or temporarily use placeholder services:
```html
<img src="https://placehold.co/400x250/DA291C/FFFFFF/png?text=Your+Text" alt="Description">
```

## 🌐 Deploy (1 minute)

### Fastest: Netlify Drag & Drop

1. Go to [Netlify](https://app.netlify.com/drop)
2. Drag the `landing-page` folder
3. Done! Your site is live with HTTPS

### Alternative: Vercel, GitHub Pages, or traditional hosting

See `README.md` for detailed deployment instructions.

## ✅ Test Everything

1. **Mobile menu**: Tap hamburger icon (mobile view)
2. **Navigation**: Click menu items
3. **Smooth scroll**: All anchors scroll smoothly
4. **Form**: Fill and submit (check for email)
5. **Responsive**: Resize browser window

## 📚 Full Documentation

- **README.md** - Complete documentation
- **SETUP_CHECKLIST.md** - Detailed configuration checklist
- **IMAGES_NEEDED.md** - Image requirements and specifications

## 🆘 Troubleshooting

### Form not working?
- Check EmailJS credentials in `js/form.js`
- Check browser console for errors
- Form will work in "demo mode" without EmailJS (logs to console)

### Images not showing?
- Replace placeholder files with actual images
- Check file paths and names match exactly
- Ensure images are in correct directories

### Tracking not working?
- Update GTM Container ID in `index.html`
- Use GTM Preview mode to test
- Check browser console for errors

## 💡 Pro Tips

1. **Test locally first**: Open `index.html` in a browser before deploying
2. **Use browser DevTools**: Press F12 to see console messages
3. **Mobile testing**: Use Chrome DevTools device emulation
4. **Performance**: Run Lighthouse audit (in Chrome DevTools)

## 📞 Need Help?

- Email: ibm@a1.bg
- Phone: +359 888 123 456

## 🎯 What's Already Working

Without any configuration, the landing page already has:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Mobile menu with smooth animations
- ✅ Smooth scrolling navigation
- ✅ Form validation (Bulgarian messages)
- ✅ Accessibility features (keyboard navigation, ARIA labels)
- ✅ Animations on scroll
- ✅ Cross-browser compatibility
- ✅ Performance optimizations

## 🔧 Customization

### Change Colors
Edit `css/styles.css` line 10-11:
```css
--color-primary: #DA291C;    /* Your red */
--color-secondary: #000000;  /* Your black */
```

### Update Text
All Bulgarian text is in `index.html` - just edit directly

### Add/Remove Products
Copy existing product cards in `index.html` and modify

---

**That's it! You're ready to go! 🚀**

For advanced configuration, see README.md
