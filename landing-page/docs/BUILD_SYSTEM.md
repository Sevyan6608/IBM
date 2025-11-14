# Build System Documentation

This project includes an automated build system that minifies CSS and JavaScript files for optimal performance.

## Quick Start

### One-time Build
```bash
npm run build
```

### Watch Mode (Auto-rebuild on changes)
```bash
npm run watch
```

This will automatically rebuild minified files whenever you save changes to the source files.

## What Gets Built

The build system minifies:

### CSS
- **Source**: `css/styles.css`
- **Output**: `css/styles.min.css`
- **Savings**: ~31% smaller

### JavaScript
- **Source**: `js/main.js` → **Output**: `js/main.min.js` (~62% smaller)
- **Source**: `js/gsap-animations.js` → **Output**: `js/gsap-animations.min.js` (~69% smaller)
- **Source**: `js/form.js` → **Output**: `js/form.min.js` (~57% smaller)

## Development Workflow

### 1. Start Watch Mode
```bash
npm run watch
```

You should see:
```
════════════════════════════════════════
  Watch Mode - IBM Landing Page
════════════════════════════════════════

Building IBM Landing Page Assets...
✓ CSS built successfully (29.53KB → 20.23KB, 31.5% smaller, 480ms)
✓ main.js built successfully (10.14KB → 3.87KB, 61.8% smaller, 292ms)
✓ gsap-animations.js built successfully (9.56KB → 2.95KB, 69.1% smaller, 82ms)
✓ form.js built successfully (15.60KB → 6.77KB, 56.6% smaller, 95ms)

👀 Watching for changes...
Press Ctrl+C to stop
```

### 2. Edit Your Files
Work on the original files:
- `css/styles.css`
- `js/main.js`
- `js/gsap-animations.js`
- `js/form.js`

### 3. Auto-rebuild
When you save a file, it automatically rebuilds:
```
📝 css/styles.css changed
Building CSS...
✓ CSS built successfully (29.53KB → 20.23KB, 31.5% smaller, 450ms)

👀 Watching for changes...
```

### 4. Stop Watch Mode
Press `Ctrl+C` to stop watching

## Build Commands

### Build Everything
```bash
npm run build
```
Minifies all CSS and JavaScript files once.

### Watch Mode
```bash
npm run watch
```
Continuously watches for changes and rebuilds automatically.

### Build Only CSS
```bash
npm run build:css
```

### Build Only JavaScript
```bash
npm run build:js
```

### Build Individual JS Files
```bash
npm run build:js:main        # Build main.js only
npm run build:js:animations  # Build gsap-animations.js only
npm run build:js:form        # Build form.js only
```

## How It Works

### Technologies Used
- **clean-css-cli**: Minifies CSS (removes whitespace, comments, optimizes rules)
- **terser**: Minifies JavaScript (removes whitespace, shortens variable names, optimizes code)
- **chokidar**: Watches files for changes in watch mode

### Build Process
1. Reads source file
2. Minifies content
3. Writes to `.min.css` or `.min.js` file
4. Shows file size comparison and savings

### Watch Mode Process
1. Runs initial build
2. Starts watching source files
3. When file changes:
   - Waits 300ms for file to stabilize (handles multiple quick saves)
   - Rebuilds only the changed file
   - Shows timestamp and rebuild stats
4. Continues watching until stopped

## File Structure

```
landing-page/
├── css/
│   ├── styles.css           # Source CSS (edit this)
│   └── styles.min.css       # Minified CSS (auto-generated)
├── js/
│   ├── main.js              # Source JS (edit this)
│   ├── main.min.js          # Minified JS (auto-generated)
│   ├── gsap-animations.js   # Source JS (edit this)
│   ├── gsap-animations.min.js
│   ├── form.js              # Source JS (edit this)
│   └── form.min.js
├── build.js                 # Build script
├── package.json             # NPM configuration
└── node_modules/            # Dependencies (ignored by git)
```

## Installation

If you clone the repo on a new machine:

```bash
# Install dependencies
npm install

# Run build
npm run build

# Or start watch mode
npm run watch
```

## Tips

### Development
- Use **watch mode** during development for automatic rebuilds
- Edit the **source files** (without `.min` extension)
- Never edit the `.min` files directly (they'll be overwritten)

### Before Committing
- Always run `npm run build` before committing
- Commit both source and minified files
- The `.min` files should always be in sync with source files

### Production Deployment
- Only the `.min` files are served to users (configured in `index.html`)
- Regular files are kept for development and debugging

## Troubleshooting

### "npm: command not found"
Install Node.js and npm:
```bash
# macOS
brew install node

# Ubuntu/Debian
sudo apt-get install nodejs npm
```

### "Cannot find module 'chokidar'"
Install dependencies:
```bash
npm install
```

### Build fails with errors
Check that source files exist and have valid syntax:
```bash
ls -la css/styles.css
ls -la js/*.js
```

### Watch mode doesn't detect changes
- Make sure you're editing the source files (not `.min` files)
- Try restarting watch mode (`Ctrl+C`, then `npm run watch`)
- Check file permissions

### Minified files not updating in browser
- Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Check browser DevTools Network tab

## Performance Impact

### Before Minification
- CSS: 29.53 KB
- JavaScript: 35.30 KB
- **Total**: 64.83 KB

### After Minification
- CSS: 20.23 KB (-31.5%)
- JavaScript: 13.59 KB (-61.5%)
- **Total**: 33.82 KB

### Savings
- **47.8% smaller** total file size
- **~31 KB saved** per page load
- Faster page loads, especially on mobile networks

## Advanced Usage

### Custom Build Configuration

Edit `build.js` to add more files or change settings:

```javascript
const config = {
    css: {
        source: 'css/styles.css',
        output: 'css/styles.min.css',
        command: 'cleancss -o css/styles.min.css css/styles.css'
    },
    js: [
        {
            name: 'custom.js',
            source: 'js/custom.js',
            output: 'js/custom.min.js',
            command: 'terser js/custom.js -c -m -o js/custom.min.js'
        }
    ]
};
```

### Run Build Script Directly
```bash
node build.js          # One-time build
node build.js --watch  # Watch mode
```

### CI/CD Integration

Add to GitHub Actions or deployment script:
```yaml
- name: Install dependencies
  run: npm install

- name: Build assets
  run: npm run build

- name: Deploy
  run: ./deploy.sh
```

## Best Practices

1. **Always use watch mode during development**
   - Saves time
   - Prevents forgetting to rebuild

2. **Commit both source and minified files**
   - Source files for development
   - Minified files for production

3. **Never edit .min files directly**
   - Changes will be lost on next build

4. **Run build before deploying**
   - Ensures latest changes are minified
   - Can be automated in deployment script

5. **Check file sizes after build**
   - Build script shows size savings
   - Helps catch accidentally large files

## Support

For issues with the build system:
- Check this documentation
- Review `build.js` for configuration
- Ensure dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 14+)
