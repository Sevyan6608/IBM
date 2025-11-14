<?php
/**
 * Redis Connection Test
 * Tests Redis connectivity and cache functionality
 */

// Load cache system
require_once 'cache.php';

// Styling
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redis Connection Test - IBM A1</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .test-box {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #DA291C;
            margin-top: 0;
        }
        h2 {
            color: #333;
            border-bottom: 2px solid #DA291C;
            padding-bottom: 10px;
        }
        .success {
            color: #28a745;
            font-weight: bold;
        }
        .error {
            color: #dc3545;
            font-weight: bold;
        }
        .info {
            color: #17a2b8;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        code {
            background: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <h1>🔧 Redis Connection Test</h1>

    <div class="test-box">
        <h2>1. Configuration</h2>
        <table>
            <tr>
                <th>Setting</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Redis Host</td>
                <td><code><?php echo REDIS_HOST; ?></code></td>
            </tr>
            <tr>
                <td>Redis Port</td>
                <td><code><?php echo REDIS_PORT; ?></code></td>
            </tr>
            <tr>
                <td>Cache Prefix/Salt</td>
                <td><code><?php echo CACHE_PREFIX; ?></code></td>
            </tr>
            <tr>
                <td>Default TTL</td>
                <td><code><?php echo CACHE_TTL; ?>s (<?php echo round(CACHE_TTL/3600, 1); ?> hours)</code></td>
            </tr>
            <tr>
                <td>Cache Enabled</td>
                <td><span class="<?php echo CACHE_ENABLED ? 'success' : 'error'; ?>">
                    <?php echo CACHE_ENABLED ? '✓ YES' : '✗ NO'; ?>
                </span></td>
            </tr>
        </table>
    </div>

    <div class="test-box">
        <h2>2. PHP Redis Extension</h2>
        <?php if (extension_loaded('redis')): ?>
            <p class="success">✓ Redis extension is loaded</p>
            <table>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Extension Version</td>
                    <td><code><?php echo phpversion('redis'); ?></code></td>
                </tr>
                <tr>
                    <td>PHP Version</td>
                    <td><code><?php echo PHP_VERSION; ?></code></td>
                </tr>
            </table>
        <?php else: ?>
            <p class="error">✗ Redis extension is NOT loaded</p>
            <div class="warning">
                <strong>Fix:</strong> Install PHP Redis extension<br>
                Ubuntu: <code>sudo apt-get install php-redis</code><br>
                Then restart web server: <code>sudo systemctl restart apache2</code>
            </div>
        <?php endif; ?>
    </div>

    <div class="test-box">
        <h2>3. Redis Connection</h2>
        <?php
        $cache = new Cache();

        if ($cache->isAvailable()):
            $testStart = microtime(true);
        ?>
            <p class="success">✓ Successfully connected to Redis at <?php echo REDIS_HOST; ?>:<?php echo REDIS_PORT; ?></p>

            <h3>Connection Test</h3>
            <?php
            // Test write
            $testKey = 'test:connection';
            $testValue = [
                'message' => 'Hello from IBM A1 landing page!',
                'timestamp' => date('Y-m-d H:i:s'),
                'random' => rand(1000, 9999)
            ];

            $writeSuccess = $cache->set($testKey, $testValue, 60);
            $writeTime = round((microtime(true) - $testStart) * 1000, 2);

            if ($writeSuccess):
            ?>
                <p class="success">✓ Write test successful (<?php echo $writeTime; ?>ms)</p>
            <?php else: ?>
                <p class="error">✗ Write test failed</p>
            <?php endif; ?>

            <?php
            // Test read
            $readStart = microtime(true);
            $readValue = $cache->get($testKey);
            $readTime = round((microtime(true) - $readStart) * 1000, 2);

            if ($readValue !== false && $readValue === $testValue):
            ?>
                <p class="success">✓ Read test successful (<?php echo $readTime; ?>ms)</p>
                <p class="info">Retrieved value: <code><?php echo json_encode($readValue); ?></code></p>
            <?php else: ?>
                <p class="error">✗ Read test failed</p>
            <?php endif; ?>

            <?php
            // Test delete
            $deleteSuccess = $cache->delete($testKey);
            if ($deleteSuccess):
            ?>
                <p class="success">✓ Delete test successful</p>
            <?php else: ?>
                <p class="error">✗ Delete test failed</p>
            <?php endif; ?>

        <?php else: ?>
            <p class="error">✗ Failed to connect to Redis at <?php echo REDIS_HOST; ?>:<?php echo REDIS_PORT; ?></p>
            <div class="warning">
                <strong>Possible issues:</strong><br>
                • Redis server not running<br>
                • Wrong host or port<br>
                • Firewall blocking connection<br>
                • Redis requires authentication (password)<br>
                <br>
                <strong>Check:</strong><br>
                <code>redis-cli -h <?php echo REDIS_HOST; ?> -p <?php echo REDIS_PORT; ?> ping</code>
            </div>
        <?php endif; ?>
    </div>

    <?php if ($cache->isAvailable()): ?>
    <div class="test-box">
        <h2>4. Cache Statistics</h2>
        <?php
        $stats = $cache->getStats();
        ?>
        <table>
            <tr>
                <th>Metric</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Status</td>
                <td class="success"><?php echo $stats['status']; ?></td>
            </tr>
            <tr>
                <td>Key Prefix</td>
                <td><code><?php echo $stats['prefix']; ?></code></td>
            </tr>
            <tr>
                <td>Total Keys</td>
                <td><code><?php echo $stats['total_keys']; ?></code></td>
            </tr>
        </table>

        <?php if (!empty($stats['keys'])): ?>
            <h3>Cached Keys</h3>
            <ul>
                <?php foreach (array_slice($stats['keys'], 0, 10) as $key): ?>
                    <li><code><?php echo htmlspecialchars($key); ?></code></li>
                <?php endforeach; ?>
                <?php if (count($stats['keys']) > 10): ?>
                    <li><em>... and <?php echo count($stats['keys']) - 10; ?> more</em></li>
                <?php endif; ?>
            </ul>
        <?php endif; ?>
    </div>

    <div class="test-box">
        <h2>5. Performance Benchmark</h2>
        <?php
        // Benchmark: Write 100 keys
        $iterations = 100;
        $writeStart = microtime(true);

        for ($i = 0; $i < $iterations; $i++) {
            $cache->set("benchmark:test:{$i}", ['data' => str_repeat('x', 1000)], 60);
        }

        $writeTotal = round((microtime(true) - $writeStart) * 1000, 2);
        $writeAvg = round($writeTotal / $iterations, 2);

        // Benchmark: Read 100 keys
        $readStart = microtime(true);

        for ($i = 0; $i < $iterations; $i++) {
            $cache->get("benchmark:test:{$i}");
        }

        $readTotal = round((microtime(true) - $readStart) * 1000, 2);
        $readAvg = round($readTotal / $iterations, 2);

        // Cleanup
        $cache->deletePattern('benchmark:*');
        ?>

        <table>
            <tr>
                <th>Operation</th>
                <th>Total Time</th>
                <th>Average Time</th>
                <th>Operations/sec</th>
            </tr>
            <tr>
                <td>Write (<?php echo $iterations; ?> keys)</td>
                <td><?php echo $writeTotal; ?>ms</td>
                <td><?php echo $writeAvg; ?>ms</td>
                <td><?php echo round(1000 / $writeAvg); ?></td>
            </tr>
            <tr>
                <td>Read (<?php echo $iterations; ?> keys)</td>
                <td><?php echo $readTotal; ?>ms</td>
                <td><?php echo $readAvg; ?>ms</td>
                <td><?php echo round(1000 / $readAvg); ?></td>
            </tr>
        </table>

        <p class="info">
            <strong>Note:</strong> First-time access may be slower due to connection setup.
            Typical performance: ~0.1-0.5ms per operation on localhost.
        </p>
    </div>
    <?php endif; ?>

    <div class="test-box">
        <h2>✅ Next Steps</h2>
        <?php if ($cache->isAvailable()): ?>
            <p class="success"><strong>Redis is working perfectly!</strong></p>
            <ol>
                <li>Rename <code>index.html</code> to <code>index-static.html</code> (keep as backup)</li>
                <li>Rename <code>index-cached.php</code> to <code>index.php</code></li>
                <li>Visit your website - first load will be cached</li>
                <li>Refresh page - should see <code>X-Cache: HIT</code> header (use browser DevTools)</li>
                <li>Create <code>clear-cache.php</code> to clear cache when updating content</li>
            </ol>
            <p class="info">
                <strong>Expected Performance:</strong><br>
                First load (cache miss): ~500ms<br>
                Cached load (cache hit): ~50ms<br>
                <strong>10x faster!</strong>
            </p>
        <?php else: ?>
            <p class="error"><strong>Fix Redis connection first</strong></p>
            <ol>
                <li>Check Redis is running: <code>redis-cli -h <?php echo REDIS_HOST; ?> -p <?php echo REDIS_PORT; ?> ping</code></li>
                <li>Verify PHP Redis extension installed</li>
                <li>Check <code>cache-config.php</code> settings</li>
                <li>Contact hosting support if issues persist</li>
            </ol>
        <?php endif; ?>
    </div>

    <div class="test-box" style="text-align: center; color: #666;">
        <p>IBM Landing Page - Redis Cache Test</p>
        <p>Generated at: <?php echo date('Y-m-d H:i:s'); ?></p>
    </div>
</body>
</html>
