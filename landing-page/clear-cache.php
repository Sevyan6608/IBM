<?php
/**
 * Clear Cache Utility
 * Clears all cached pages for IBM A1 landing page
 *
 * Usage: Visit https://ibm.a1.bg/clear-cache.php in your browser
 * Or run: curl https://ibm.a1.bg/clear-cache.php
 *
 * SECURITY: Protect this file or delete after use!
 */

// Load cache system
require_once 'cache.php';

// Initialize cache
$cache = new Cache();

// Simple password protection (optional)
// Uncomment and set a password to protect this file
/*
$password = 'your_secure_password_here';
if (!isset($_GET['password']) || $_GET['password'] !== $password) {
    http_response_code(403);
    die('Access denied. Password required.');
}
*/

?>
<!DOCTYPE html>
<html lang="bg">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clear Cache - IBM A1</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 600px;
            margin: 100px auto;
            padding: 40px;
            text-align: center;
            background: #f5f5f5;
        }
        .box {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #DA291C;
            margin-top: 0;
        }
        .success {
            color: #28a745;
            font-size: 48px;
            margin: 20px 0;
        }
        .error {
            color: #dc3545;
            font-size: 48px;
            margin: 20px 0;
        }
        .info {
            color: #666;
            margin: 20px 0;
            line-height: 1.6;
        }
        code {
            background: #f8f9fa;
            padding: 2px 8px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background: #DA291C;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.3s;
        }
        .button:hover {
            background: #b82117;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1>🗑️ Clear Cache</h1>

        <?php
        if (!$cache->isAvailable()) {
            ?>
            <div class="error">✗</div>
            <p class="info">
                <strong>Redis is not available</strong><br>
                Cache system is not connected.
            </p>
            <?php
        } else {
            // Get cache stats before clearing
            $statsBefore = $cache->getStats();
            $keysBefore = $statsBefore['total_keys'];

            // Clear all cache with our prefix
            $deleted = $cache->flush();

            // Get stats after clearing
            $statsAfter = $cache->getStats();
            $keysAfter = $statsAfter['total_keys'];
            ?>

            <div class="success">✓</div>
            <p class="info">
                <strong>Cache cleared successfully!</strong><br><br>
                Prefix: <code><?php echo CACHE_PREFIX; ?></code><br>
                Keys before: <code><?php echo $keysBefore; ?></code><br>
                Keys deleted: <code><?php echo $deleted; ?></code><br>
                Keys after: <code><?php echo $keysAfter; ?></code><br>
                <br>
                <em>Next page visit will rebuild the cache.</em>
            </p>

            <?php if ($deleted > 0): ?>
                <p class="info">
                    Cleared keys included:
                    <ul style="text-align: left; max-height: 200px; overflow-y: auto;">
                        <?php
                        foreach (array_slice($statsBefore['keys'], 0, 20) as $key) {
                            echo '<li><code>' . htmlspecialchars($key) . '</code></li>';
                        }
                        if (count($statsBefore['keys']) > 20) {
                            echo '<li><em>... and ' . (count($statsBefore['keys']) - 20) . ' more</em></li>';
                        }
                        ?>
                    </ul>
                </p>
            <?php endif; ?>
        <?php } ?>

        <a href="/" class="button">← Back to Homepage</a>

        <p class="info" style="margin-top: 40px; font-size: 12px; color: #999;">
            <strong>Security Tip:</strong> Delete this file or add password protection after use.
        </p>
    </div>
</body>
</html>
