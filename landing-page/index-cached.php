<?php
/**
 * Cached Landing Page for IBM A1 Bulgaria
 *
 * This file demonstrates full page caching with Redis.
 * Rename this to index.php to enable caching on your live site.
 *
 * Performance: First load ~500ms, Cached load ~50ms (10x faster!)
 */

// Load cache system
require_once 'cache.php';

// Initialize cache
$cache = new Cache();

// Generate cache key based on URL (supports query strings for tracking)
$cacheKey = 'page:home:' . md5($_SERVER['REQUEST_URI']);

// Try to serve from cache
if ($cache->isAvailable()) {
    $cachedHTML = $cache->get($cacheKey);

    if ($cachedHTML !== false) {
        // Cache HIT - serve instantly
        header('X-Cache: HIT');
        header('X-Cache-Key: ' . $cacheKey);
        header('X-Cache-Age: ' . (CACHE_TTL - $cache->getTTL($cacheKey)));
        echo $cachedHTML;
        exit;
    }
}

// Cache MISS - start output buffering
ob_start();
header('X-Cache: MISS');
header('X-Cache-TTL: ' . CACHE_TTL);

?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="IBM решения за растеж и устойчивост на Вашия бизнес от A1 България">
    <meta name="keywords" content="IBM Storage, IBM Maximo IT, IBM Watsonx, A1 България, IT решения">
    <meta property="og:title" content="IBM решения от A1 България">
    <meta property="og:description" content="Технологични решения за сигурност, ефективност и интелигентна автоматизация">
    <meta property="og:image" content="images/share-image.jpg">
    <meta property="og:locale" content="bg_BG">
    <meta name="twitter:card" content="summary_large_image">
    <title>IBM решения за бизнеса от A1 България</title>

    <!-- Preconnect to external resources -->
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

    <!-- Preload critical resources -->
    <link rel="preload" href="css/styles.min.css" as="style">
    <link rel="preload" href="fonts/A1Sans-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="fonts/A1Serif-Bold.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Preload LCP image with high priority -->
    <link rel="preload" href="images/hero-background-mobile.jpeg" as="image" fetchpriority="high" media="(max-width: 767px)">
    <link rel="preload" href="images/hero-background.jpeg" as="image" fetchpriority="high" media="(min-width: 768px)">

    <!-- Main Stylesheet - Minified -->
    <link rel="stylesheet" href="css/styles.min.css">

    <!-- Font Awesome - Load asynchronously -->
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></noscript>
    <script>
        // Fallback for browsers that don't support onload on link tags
        var fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesomeLink && !fontAwesomeLink.onload) {
            fontAwesomeLink.rel = 'stylesheet';
        }
    </script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
    <!-- End Google Tag Manager -->
</head>
<body>
    <!-- NOTE: Include your full index.html content here -->
    <!-- For now, just reading the actual index.html file -->

    <?php
    // Include the actual HTML content
    // Remove the HTML wrapper and just include the body content
    $htmlContent = file_get_contents('index.html');

    // Extract body content only
    preg_match('/<body[^>]*>(.*?)<\/body>/is', $htmlContent, $matches);
    if (isset($matches[1])) {
        echo $matches[1];
    } else {
        // Fallback: output entire content
        echo $htmlContent;
    }
    ?>

    <!-- GSAP 3.12+ with ALL plugins (deferred for better performance) -->
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/InertiaPlugin.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>

    <!-- Scripts - Deferred and minified for optimal page load -->
    <script defer src="js/main.min.js"></script>
    <script defer src="js/gsap-animations.min.js"></script>
    <script defer src="js/form.min.js"></script>
</body>
</html>

<?php
// Get the output buffer content
$htmlOutput = ob_get_contents();
ob_end_clean();

// Cache the HTML output (24 hours by default)
if ($cache->isAvailable()) {
    $cache->set($cacheKey, $htmlOutput);
}

// Send the output to browser
echo $htmlOutput;

/**
 * CACHE INVALIDATION
 * ==================
 * To clear cache after updating content, create clear-cache.php:
 *
 * <?php
 * require_once 'cache.php';
 * $cache = new Cache();
 * $cache->flush(); // Clear all ibm_a1_* keys
 * echo "Cache cleared!";
 * ?>
 *
 * Visit: https://ibm.a1.bg/clear-cache.php
 */
