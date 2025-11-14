<?php
/**
 * Example: HTML Page Caching with Redis
 *
 * This file demonstrates how to cache the entire HTML output
 * to dramatically reduce server load and improve page speed.
 *
 * IMPLEMENTATION INSTRUCTIONS:
 * 1. Make sure Redis is installed and running on your server
 * 2. Install PHP Redis extension: sudo apt-get install php-redis (Ubuntu)
 * 3. Add the caching code to the top of your index.html (rename to index.php)
 * 4. Test by visiting the page and checking response times
 */

// Load the cache class
require_once 'cache.php';

// Initialize cache
$cache = new Cache('127.0.0.1', 6379);

// Generate a cache key based on the current page URL and query string
$cacheKey = 'page:' . md5($_SERVER['REQUEST_URI']);

// Cache TTL (time to live) - 15 minutes for dynamic pages
$cacheTTL = 900; // 15 minutes

// Try to get cached HTML
if ($cache->isAvailable()) {
    $cachedHTML = $cache->get($cacheKey);

    if ($cachedHTML !== false) {
        // Cache hit - serve cached HTML
        header('X-Cache: HIT');
        header('X-Cache-Key: ' . $cacheKey);
        echo $cachedHTML;
        exit;
    }
}

// Cache miss - start output buffering
ob_start();

// Set cache miss header
header('X-Cache: MISS');

?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <!-- Your HTML head content here -->
    <title>IBM решения за бизнеса от A1 България</title>
</head>
<body>
    <!-- Your page content here -->
    <h1>This content will be cached</h1>
</body>
</html>
<?php

// Get the output buffer content
$htmlOutput = ob_get_contents();
ob_end_clean();

// Cache the HTML output
if ($cache->isAvailable()) {
    $cache->set($cacheKey, $htmlOutput, $cacheTTL);
}

// Send the output to browser
echo $htmlOutput;

/**
 * ADVANCED USAGE EXAMPLES
 * =======================
 */

// Example 1: Cache form submission data
function cacheFormSubmission($formData) {
    $cache = new Cache();
    $key = 'form:submission:' . $formData['email'];

    // Prevent duplicate submissions within 5 minutes
    if ($cache->exists($key)) {
        return ['error' => 'Submission already processed. Please wait 5 minutes.'];
    }

    // Process form...
    $result = processForm($formData);

    // Cache the submission
    $cache->set($key, $result, 300); // 5 minutes

    return $result;
}

// Example 2: Cache database queries
function getUserData($userId) {
    $cache = new Cache();
    $key = "user:data:{$userId}";

    return $cache->remember($key, function() use ($userId) {
        // This expensive query only runs on cache miss
        return fetchUserFromDatabase($userId);
    }, 1800); // 30 minutes
}

// Example 3: Rate limiting with Redis
function checkRateLimit($ipAddress, $maxRequests = 100, $window = 3600) {
    $cache = new Cache();
    $key = "ratelimit:ip:{$ipAddress}";

    $requests = $cache->increment($key);

    if ($requests === 1) {
        // First request - set expiry
        $cache->set($key, 1, $window);
    }

    if ($requests > $maxRequests) {
        header('HTTP/1.1 429 Too Many Requests');
        die('Rate limit exceeded. Please try again later.');
    }

    return $requests;
}

// Example 4: Clear cache on content update
function clearPageCache($pattern = 'page:*') {
    $cache = new Cache();

    if ($cache->isAvailable()) {
        $deletedCount = $cache->deletePattern($pattern);
        error_log("Cleared {$deletedCount} cached pages");
        return $deletedCount;
    }

    return 0;
}

// Example 5: Session storage in Redis (faster than file-based)
function setupRedisSession() {
    ini_set('session.save_handler', 'redis');
    ini_set('session.save_path', 'tcp://127.0.0.1:6379');
    session_start();
}

/**
 * CACHE WARMING STRATEGY
 * ======================
 * Pre-populate cache for better performance on first load
 */
function warmCache() {
    $cache = new Cache();
    $pages = [
        '/',
        '/index.php',
        '/products',
        '/contact'
    ];

    foreach ($pages as $page) {
        $cacheKey = 'page:' . md5($page);

        if (!$cache->exists($cacheKey)) {
            // Fetch and cache the page
            $html = file_get_contents("https://yourdomain.com{$page}");
            $cache->set($cacheKey, $html, 900);
            echo "Warmed cache for: {$page}\n";
        }
    }
}

/**
 * MONITORING AND STATS
 * ====================
 * Track cache performance
 */
function getCacheStats() {
    $cache = new Cache();

    if (!$cache->isAvailable()) {
        return ['status' => 'unavailable'];
    }

    // You can add custom stats tracking here
    $stats = [
        'status' => 'available',
        'hits' => $cache->get('cache:stats:hits') ?: 0,
        'misses' => $cache->get('cache:stats:misses') ?: 0,
    ];

    $total = $stats['hits'] + $stats['misses'];
    $stats['hit_rate'] = $total > 0 ? round(($stats['hits'] / $total) * 100, 2) . '%' : '0%';

    return $stats;
}

/**
 * HELPER FUNCTIONS (implement these based on your needs)
 */
function processForm($formData) {
    // Your form processing logic
    return ['success' => true, 'message' => 'Form processed'];
}

function fetchUserFromDatabase($userId) {
    // Your database query logic
    return ['id' => $userId, 'name' => 'John Doe'];
}
