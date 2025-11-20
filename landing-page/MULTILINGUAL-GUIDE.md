# Multilingual Website Guide

This guide explains how to manage and update content in multiple languages on the IBM Landing Page.

## Overview

The website now supports **Bulgarian (BG)** and **English (EN)** with the following features:

- 🌐 **URL-based language switching** (`/` for Bulgarian, `/en` for English)
- 🔄 Language switcher with flag icons in the navigation
- 💾 Automatic language preference storage (localStorage)
- 🔍 SEO optimizations including hreflang tags and structured data
- 📱 Responsive design for both desktop and mobile
- ♿ Accessibility features

## URL Structure

The website uses **separate URLs** for each language:

- **Bulgarian (default):** `https://yoursite.com/` or `https://yoursite.com/index.html`
- **English:** `https://yoursite.com/en/` or `https://yoursite.com/en/index.html`

### Directory Structure

```
landing-page/
├── index.html              # Bulgarian version (root)
├── en/
│   └── index.html         # English version (copies content)
├── css/                   # Shared CSS files
├── js/                    # Shared JavaScript files
│   └── translations.js   # Translation data for both languages
├── images/                # Shared images (accessed via /images/ from both versions)
└── fonts/                 # Shared fonts
```

**Asset Path Strategy:**
- **CSS, JS, Fonts:** English version uses relative paths (`../css/`, `../js/`, `../fonts/`)
- **Images:** Both versions use absolute paths (`/images/`) to always reference the root images directory

## How to Update Content

### Method 1: Update the Translation File (Recommended)

All translatable content is stored in `js/translations.js`. This is the **easiest way** to update text content.

#### Example: Changing a Button Text

1. Open `js/translations.js`
2. Find the section you want to update (e.g., navigation, hero, products)
3. Update both Bulgarian (`bg`) and English (`en`) versions

```javascript
// Before
hero: {
    ctaButton: "Заявете консултация сега",
    // ... other content
}

// After
hero: {
    ctaButton: "Свържете се с нас",
    // ... other content
}
```

### Translation File Structure

The translation file is organized by sections:

```javascript
translations = {
    bg: {
        meta: { /* Page title, description, keywords */ },
        nav: { /* Navigation menu items */ },
        hero: { /* Hero section content */ },
        techSolutions: { /* USP cards and challenges */ },
        products: {
            storage: { /* IBM Storage product */ },
            maximo: { /* IBM Maximo product */ },
            watsonx: { /* IBM Watsonx product */ }
        },
        contact: {
            form: { /* Contact form labels and text */ }
        },
        footer: { /* Footer links and text */ }
    },
    en: {
        // Same structure as above
    }
}
```

### Adding New Translatable Content

If you need to add new content to the page:

1. **Add HTML with data-i18n attribute:**
```html
<h2 data-i18n="newSection.title">Заглавие на нова секция</h2>
<p data-i18n="newSection.description">Описание на новата секция</p>
```

2. **Add translations to js/translations.js:**
```javascript
translations = {
    bg: {
        // ... existing content
        newSection: {
            title: "Заглавие на нова секция",
            description: "Описание на новата секция"
        }
    },
    en: {
        // ... existing content
        newSection: {
            title: "New Section Title",
            description: "New section description"
        }
    }
}
```

3. **Update the updateContent() method:**
```javascript
updateContent() {
    const t = translations[this.currentLang];

    // ... existing code

    // Add your new translations
    this.setText('[data-i18n="newSection.title"]', t.newSection.title);
    this.setText('[data-i18n="newSection.description"]', t.newSection.description);
}
```

## SEO Features

### Hreflang Tags
Automatically configured in both HTML files:

**Root index.html (Bulgarian):**
```html
<link rel="alternate" hreflang="bg" href="/" />
<link rel="alternate" hreflang="en" href="/en/" />
<link rel="alternate" hreflang="x-default" href="/" />
```

**en/index.html (English):**
```html
<link rel="alternate" hreflang="bg" href="../" />
<link rel="alternate" hreflang="en" href="./" />
<link rel="alternate" hreflang="x-default" href="../" />
```

These use relative URLs which work for both development and production. When deploying, you can optionally update these to absolute URLs (e.g., `https://yoursite.com/en/`).

### Meta Tags
Meta tags (title, description, Open Graph, Twitter) automatically update when the language changes.

### Structured Data (JSON-LD)
The page includes Organization and WebPage structured data for better search engine understanding. Located in the HTML `<head>` section.

## Language Switcher Customization

### How It Works
The language switcher uses **URL-based navigation**:
- Clicking **BG** redirects to `/` (root)
- Clicking **EN** redirects to `/en/`
- The current language is detected from the URL automatically
- Language preference is saved to localStorage for future visits

### Desktop Switcher
Located in the navigation bar (`nav-actions` section):
- Shows BG and EN flags with text labels
- Active language is highlighted in red (based on current URL)
- Clicking switches to the corresponding URL

### Mobile Switcher
Shows in the mobile menu:
- Same flag design as desktop
- Center-aligned for better mobile UX
- Appears above the dark mode toggle
- URL-based navigation for seamless language switching

### Styling
All language switcher styles are in `css/styles.css` under the `/* Language Switcher */` section.

To customize colors:
```css
.lang-btn.active {
    background: var(--color-primary); /* Change active button color */
    color: white;
}
```

## Testing the Implementation

### 1. Test Language Switching
- Click the BG/EN buttons in the navigation
- Verify all text content changes
- Check that the preference is saved (refresh page)

### 2. Test SEO Tags
- View page source
- Verify hreflang tags are present
- Check meta tags update when switching languages

### 3. Test Mobile View
- Open dev tools (F12)
- Toggle device toolbar
- Verify mobile language switcher appears
- Test switching languages on mobile

### 4. Test Accessibility
- Tab through the language switcher
- Verify aria-labels are present
- Check keyboard navigation works

## Updating SEO Content

### Page Title and Description
Edit in `js/translations.js`:
```javascript
meta: {
    title: "Your Page Title",
    description: "Your page description for search engines",
    keywords: "keyword1, keyword2, keyword3"
}
```

### Structured Data
Update in `index.html` (search for "JSON-LD"):
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    // ... update other fields
}
</script>
```

## Common Tasks

### Add a New Language (e.g., German)

1. **Add translations:**
```javascript
translations = {
    bg: { /* existing */ },
    en: { /* existing */ },
    de: {
        // Add all German translations
    }
}
```

2. **Add flag button in HTML:**
```html
<button data-lang="de" class="lang-btn" aria-label="German">
    <!-- Add German flag SVG -->
    <span class="lang-text">DE</span>
</button>
```

3. **Add hreflang tag:**
```html
<link rel="alternate" hreflang="de" href="https://www.a1.bg/de/" />
```

### Change Default Language
Edit `js/translations.js`:
```javascript
constructor() {
    this.currentLang = this.getStoredLanguage() || 'en'; // Change 'bg' to 'en'
    this.init();
}
```

### Remove a Language
1. Delete the language from `translations` object
2. Remove the flag button from HTML
3. Remove the hreflang tag
4. Update `<html lang="">` attribute

## File Structure

```
landing-page/
├── index.html                    # Bulgarian version (root)
├── en/
│   └── index.html               # English version (copy of root with relative paths)
├── js/
│   └── translations.js          # All translatable content (UPDATE THIS!)
├── css/
│   ├── styles.css               # Source CSS with language switcher styles
│   └── styles.min.css           # Minified CSS (auto-generated)
└── MULTILINGUAL-GUIDE.md        # This file
```

## Deployment & Maintenance

### Important: Keeping Both Versions in Sync

Both `/index.html` and `/en/index.html` share the same HTML structure but differ in:
1. `<html lang="">` attribute (bg vs en)
2. Hreflang tags (absolute vs relative paths)
3. Asset paths (direct vs `../` paths)

**When updating HTML structure:**
1. Update `/index.html` (Bulgarian root)
2. Copy changes to `/en/index.html`
3. Run this command to update asset paths in English version:

```bash
cd landing-page
cp index.html en/index.html
cd en && sed -i '' 's|href="css/|href="../css/|g; s|src="js/|src="../js/|g; s|href="fonts/|href="../fonts/|g' index.html && cd ..
```

**Important:** Images use absolute paths (`/images/`) and should NOT be changed!

**Then manually update:**
- Change `<html lang="bg">` to `<html lang="en">` in `/en/index.html`
- Update hreflang tags from `/` to `../` format

## Build Process

After making changes to `css/styles.css`, rebuild:
```bash
npm run build
```

This will minify CSS and JS files for production.

## Browser Compatibility

The multilingual system works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

LocalStorage is used for language preference - it's supported in all modern browsers.

## Troubleshooting

### Content Not Changing
- Check browser console for JavaScript errors
- Verify `data-i18n` attributes match translation keys
- Clear browser cache and reload

### Language Not Persisting
- Check localStorage is enabled in browser
- Verify no browser extensions are blocking localStorage

### Missing Translations
- Check translation key exists in both `bg` and `en`
- Verify the key path matches (e.g., `products.storage.title`)
- Check console for missing key warnings

### Flags Not Showing
- Verify SVG code is correct
- Check CSS is loaded properly
- Clear cache and rebuild CSS

## Support

For questions or issues:
1. Check this guide first
2. Review `js/translations.js` for examples
3. Test in browser developer tools
4. Check console for error messages

---

**Last Updated:** January 2025
**Version:** 1.0.0
