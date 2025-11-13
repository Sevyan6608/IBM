# Required Images for A1 Bulgaria IBM Landing Page

This document lists all the images that need to be provided for the landing page.

## Logo Files

### A1 Logo
- **File:** `images/a1-logo.svg` (preferred) or `images/a1-logo.png`
- **Description:** A1 Bulgaria logo with red and black colors
- **Requirements:**
  - Transparent background
  - High resolution (SVG preferred)
  - Optimized for web
- **Dimensions:** Flexible, but should look good at 80x40px (header) and 100x50px (footer)

### IBM Logo
- **File:** `images/ibm-logo.svg` (preferred) or `images/ibm-logo.png`
- **Description:** IBM logo for the hero banner
- **Requirements:**
  - Transparent background
  - High resolution (SVG preferred)
- **Dimensions:** Should look good at 60x24px

## Product Images

### IBM Storage
- **File:** `images/products/ibm-storage.jpg` or `ibm-storage.webp`
- **Description:** Product image for IBM Storage solution
- **Requirements:**
  - Professional, clean image
  - WebP format preferred (with JPG fallback)
  - Optimized for web (compressed)
- **Dimensions:** 400x250px (or larger, will be scaled down)

### IBM Maximo IT
- **File:** `images/products/ibm-maximo.jpg` or `ibm-maximo.webp`
- **Description:** Product image for IBM Maximo IT solution
- **Requirements:**
  - Professional, clean image
  - WebP format preferred (with JPG fallback)
  - Optimized for web (compressed)
- **Dimensions:** 400x250px (or larger, will be scaled down)

### IBM Watsonx
- **File:** `images/products/ibm-watsonx.jpg` or `ibm-watsonx.webp`
- **Description:** Product image for IBM Watsonx solution
- **Requirements:**
  - Professional, clean image
  - WebP format preferred (with JPG fallback)
  - Optimized for web (compressed)
- **Dimensions:** 400x250px (or larger, will be scaled down)

## Social Media Share Image

### OpenGraph/Share Image
- **File:** `images/share-image.jpg`
- **Description:** Image shown when the page is shared on social media
- **Requirements:**
  - High quality
  - Includes A1 and IBM branding
  - Includes key message
- **Dimensions:** 1200x630px (OpenGraph standard)

## Icon Images (Already Created)

The following icon SVGs have been created as placeholders:
- `images/icons/implementation.svg` ✓
- `images/icons/sla.svg` ✓
- `images/icons/expertise.svg` ✓

These can be replaced with custom icons if desired.

## Image Optimization Guidelines

### For WebP Conversion
```bash
# Install webp tools (macOS with Homebrew)
brew install webp

# Convert JPG/PNG to WebP
cwebp -q 85 input.jpg -o output.webp
```

### For Image Compression
Use online tools or command-line tools:
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim** (macOS): https://imageoptim.com/

### Recommended Specifications
- **Format:** WebP with JPG/PNG fallback
- **Compression:** 85% quality for photos, 90% for graphics
- **File Size:** Aim for under 100KB per image
- **Dimensions:** Appropriate to usage (see above)

## Favicon (Optional)

If you want to add a favicon:
- **File:** `favicon.ico` and `favicon.png`
- **Location:** Root directory or `images/`
- **Dimensions:**
  - ICO: 32x32px
  - PNG: 192x192px and 512x512px for different devices

### Favicon HTML (add to `<head>`)
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
```

## Testing Checklist

After adding images:
- [ ] All images load correctly
- [ ] Alt text is appropriate
- [ ] Images are optimized (run Lighthouse audit)
- [ ] WebP images have proper fallbacks
- [ ] Images look good on mobile devices
- [ ] Social media share image appears correctly
- [ ] Logo is visible on both light and dark backgrounds

## Where to Get Images

1. **A1 Brand Assets:** Contact A1 Bulgaria marketing team
2. **IBM Product Images:** IBM Digital Assets Portal or IBM partner portal
3. **Stock Photos:** Unsplash, Pexels (if generic images are acceptable)
4. **Custom Photography:** Professional photoshoot for authentic imagery

## Placeholder Images (Temporary)

While waiting for real images, you can use placeholder services:
- https://placeholder.com/
- https://via.placeholder.com/
- https://placehold.co/

Example:
```html
<img src="https://placehold.co/400x250/DA291C/FFFFFF/png?text=IBM+Storage" alt="IBM Storage">
```

## Contact

For questions about image requirements, contact:
- **Email:** ibm@a1.bg
- **Project Manager:** [Name]
