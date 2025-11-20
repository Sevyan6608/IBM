# Quick Content Update Guide

## For Content Editors: How to Update Text

### The Easiest Way: Edit translations.js

All website text is in **one file**: `js/translations.js`

### Step-by-Step Instructions

1. **Open the file:** `js/translations.js`

2. **Find the section** you want to update (use Ctrl+F to search):
   - `nav` - Navigation menu
   - `hero` - Main banner section
   - `techSolutions` - "Why Choose Us" section
   - `products.storage` - IBM Storage product
   - `products.maximo` - IBM Maximo product
   - `products.watsonx` - IBM Watsonx product
   - `contact` - Contact form
   - `footer` - Footer links

3. **Update BOTH languages:**

```javascript
// Example: Updating the main title
hero: {
    // Bulgarian text
    mainTitle: "IBM решения за растеж и устойчивост",

    // English text (scroll down to find the 'en:' section)
    mainTitle: "IBM solutions for growth and sustainability",
}
```

4. **Save the file** - Changes appear immediately on the website!

## Common Updates

### Change a Button Text
Search for "ctaButton" in translations.js:
```javascript
ctaButton: "Your New Button Text",
```

### Update Product Description
Find the product section (e.g., `products.storage`) and update:
```javascript
products: {
    storage: {
        title: "IBM Storage",
        tagline: "Your new tagline here",
        description: "Your new description here",
        feature1: "Feature 1 text",
        feature2: "Feature 2 text",
        feature3: "Feature 3 text"
    }
}
```

### Change Contact Form Labels
Find `contact.form` section:
```javascript
contact: {
    form: {
        companyLabel: "Company Name",
        nameLabel: "Full Name",
        // ... etc
    }
}
```

## URL Structure

The website has two versions:
- **Bulgarian:** `yoursite.com/` (default)
- **English:** `yoursite.com/en/`

Users can switch between languages using the flag buttons in the navigation.

## Need Help?

See the full guide: `MULTILINGUAL-GUIDE.md`

---

**Remember:** Always update BOTH Bulgarian (`bg:`) and English (`en:`) sections in translations.js!
