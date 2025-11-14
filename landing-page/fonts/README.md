# Custom Fonts Directory

## How to Add Your Custom Fonts

1. **Place your font files here** in the following formats:
   - `.woff2` (required - modern browsers, best compression)
   - `.woff` (recommended - wider browser support)
   - `.ttf` or `.otf` (optional - fallback)

2. **Font File Naming Convention:**
   ```
   YourFontName-Regular.woff2
   YourFontName-Regular.woff
   YourFontName-Bold.woff2
   YourFontName-Bold.woff
   YourFontName-SemiBold.woff2
   YourFontName-SemiBold.woff
   YourFontName-Light.woff2
   YourFontName-Light.woff
   ```

3. **Common Font Weights:**
   - 100: Thin
   - 200: Extra Light
   - 300: Light
   - 400: Regular/Normal
   - 500: Medium
   - 600: Semi Bold
   - 700: Bold
   - 800: Extra Bold
   - 900: Black

## Where to Get WOFF2/WOFF Files

If you only have TTF/OTF files, convert them using:
- **Online:** https://transfonter.org/ (recommended)
- **Online:** https://cloudconvert.com/ttf-to-woff2
- **Command line:** `fonttools` Python package

## Example Structure

```
fonts/
├── README.md
├── Inter-Regular.woff2
├── Inter-Regular.woff
├── Inter-Bold.woff2
├── Inter-Bold.woff
├── Inter-SemiBold.woff2
└── Inter-SemiBold.woff
```

## After Adding Fonts

1. Update the `@font-face` declarations in `css/styles.css`
2. Change the font file names to match your actual files
3. Update the `--font-family` CSS variable to use your custom font
4. Test in multiple browsers
