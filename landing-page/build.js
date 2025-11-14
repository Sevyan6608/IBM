#!/usr/bin/env node

/**
 * Build Script for IBM Landing Page
 * Minifies CSS and JavaScript files
 * Supports watch mode for automatic rebuilding
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for pretty output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    red: '\x1b[31m',
    gray: '\x1b[90m'
};

// Build configuration
const config = {
    css: {
        source: 'css/styles.css',
        output: 'css/styles.min.css',
        command: 'cleancss -o css/styles.min.css css/styles.css'
    },
    js: [
        {
            name: 'main.js',
            source: 'js/main.js',
            output: 'js/main.min.js',
            command: 'terser js/main.js -c -m -o js/main.min.js'
        },
        {
            name: 'gsap-animations.js',
            source: 'js/gsap-animations.js',
            output: 'js/gsap-animations.min.js',
            command: 'terser js/gsap-animations.js -c -m -o js/gsap-animations.min.js'
        },
        {
            name: 'form.js',
            source: 'js/form.js',
            output: 'js/form.min.js',
            command: 'terser js/form.js -c -m -o js/form.min.js'
        }
    ]
};

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return (stats.size / 1024).toFixed(2);
    } catch (e) {
        return '0.00';
    }
}

/**
 * Calculate size reduction percentage
 */
function getSavings(originalSize, minifiedSize) {
    const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
    return reduction;
}

/**
 * Format timestamp
 */
function timestamp() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false });
}

/**
 * Log with color
 */
function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

/**
 * Build CSS
 */
function buildCSS() {
    const startTime = Date.now();
    const originalSize = getFileSize(config.css.source);

    try {
        log(`\n${colors.blue}[${timestamp()}]${colors.reset} Building CSS...`);
        execSync(config.css.command, { stdio: 'inherit' });

        const minifiedSize = getFileSize(config.css.output);
        const savings = getSavings(parseFloat(originalSize), parseFloat(minifiedSize));
        const duration = Date.now() - startTime;

        log(
            `${colors.green}✓${colors.reset} CSS built successfully ` +
            `${colors.gray}(${originalSize}KB → ${minifiedSize}KB, ${savings}% smaller, ${duration}ms)${colors.reset}`
        );

        return true;
    } catch (error) {
        log(`${colors.red}✗ CSS build failed${colors.reset}`, colors.red);
        console.error(error.message);
        return false;
    }
}

/**
 * Build JavaScript file
 */
function buildJS(jsConfig) {
    const startTime = Date.now();
    const originalSize = getFileSize(jsConfig.source);

    try {
        log(`${colors.blue}[${timestamp()}]${colors.reset} Building ${jsConfig.name}...`);
        execSync(jsConfig.command, { stdio: 'inherit' });

        const minifiedSize = getFileSize(jsConfig.output);
        const savings = getSavings(parseFloat(originalSize), parseFloat(minifiedSize));
        const duration = Date.now() - startTime;

        log(
            `${colors.green}✓${colors.reset} ${jsConfig.name} built successfully ` +
            `${colors.gray}(${originalSize}KB → ${minifiedSize}KB, ${savings}% smaller, ${duration}ms)${colors.reset}`
        );

        return true;
    } catch (error) {
        log(`${colors.red}✗ ${jsConfig.name} build failed${colors.reset}`, colors.red);
        console.error(error.message);
        return false;
    }
}

/**
 * Build all JavaScript files
 */
function buildAllJS() {
    let allSuccess = true;
    for (const jsConfig of config.js) {
        const success = buildJS(jsConfig);
        if (!success) allSuccess = false;
    }
    return allSuccess;
}

/**
 * Build everything
 */
function buildAll() {
    log(`\n${colors.bright}${colors.blue}════════════════════════════════════════${colors.reset}`);
    log(`${colors.bright}  Building IBM Landing Page Assets${colors.reset}`);
    log(`${colors.bright}${colors.blue}════════════════════════════════════════${colors.reset}`);

    const startTime = Date.now();

    const cssSuccess = buildCSS();
    const jsSuccess = buildAllJS();

    const duration = Date.now() - startTime;

    log(`\n${colors.bright}${colors.blue}────────────────────────────────────────${colors.reset}`);

    if (cssSuccess && jsSuccess) {
        log(`${colors.green}${colors.bright}✓ Build completed successfully!${colors.reset} ${colors.gray}(${duration}ms)${colors.reset}`);
    } else {
        log(`${colors.yellow}⚠ Build completed with errors${colors.reset}`, colors.yellow);
    }

    log(`${colors.bright}${colors.blue}────────────────────────────────────────${colors.reset}\n`);
}

/**
 * Watch mode
 */
function watch() {
    log(`\n${colors.bright}${colors.blue}════════════════════════════════════════${colors.reset}`);
    log(`${colors.bright}  Watch Mode - IBM Landing Page${colors.reset}`);
    log(`${colors.bright}${colors.blue}════════════════════════════════════════${colors.reset}\n`);

    // Initial build
    buildAll();

    log(`${colors.yellow}👀 Watching for changes...${colors.reset}`);
    log(`${colors.gray}Press Ctrl+C to stop${colors.reset}\n`);

    // Import chokidar
    const chokidar = require('chokidar');

    // Watch CSS files
    const cssWatcher = chokidar.watch(config.css.source, {
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100
        }
    });

    cssWatcher.on('change', (filePath) => {
        log(`\n${colors.yellow}📝 ${filePath} changed${colors.reset}`);
        buildCSS();
        log(`\n${colors.yellow}👀 Watching for changes...${colors.reset}\n`);
    });

    // Watch JavaScript files
    const jsFiles = config.js.map(js => js.source);
    const jsWatcher = chokidar.watch(jsFiles, {
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100
        }
    });

    jsWatcher.on('change', (filePath) => {
        log(`\n${colors.yellow}📝 ${filePath} changed${colors.reset}`);

        // Find which JS config matches this file
        const jsConfig = config.js.find(js => js.source === filePath);
        if (jsConfig) {
            buildJS(jsConfig);
        }

        log(`\n${colors.yellow}👀 Watching for changes...${colors.reset}\n`);
    });

    // Handle errors
    cssWatcher.on('error', error => log(`Watcher error: ${error}`, colors.red));
    jsWatcher.on('error', error => log(`Watcher error: ${error}`, colors.red));

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        log(`\n\n${colors.yellow}Stopping watch mode...${colors.reset}`);
        cssWatcher.close();
        jsWatcher.close();
        log(`${colors.green}✓ Watch mode stopped${colors.reset}\n`);
        process.exit(0);
    });
}

/**
 * Main entry point
 */
function main() {
    const args = process.argv.slice(2);
    const isWatchMode = args.includes('--watch') || args.includes('-w');

    if (isWatchMode) {
        watch();
    } else {
        buildAll();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { buildAll, buildCSS, buildJS, buildAllJS };
