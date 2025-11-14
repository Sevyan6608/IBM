# Redis Setup Guide - Quick Start

Complete setup guide for Redis caching on your shared hosting server.

## Your Configuration

✅ **Redis Host:** 127.0.0.1
✅ **Redis Port:** 12402
✅ **Cache Prefix:** `ibm_a1_` (for isolation)
✅ **Default TTL:** 24 hours (86400 seconds)

## Quick Setup (3 Steps)

### 1. Upload Files

Upload these files to your server:
- ✅ `cache.php` - Main cache class
- ✅ `cache-config.php` - Configuration (port, prefix, TTL)
- ✅ `index-cached.php` - Cached version of landing page
- ✅ `test-redis.php` - Connection test
- ✅ `clear-cache.php` - Cache clearing utility

### 2. Test Redis Connection

Visit: `https://ibm.a1.bg/test-redis.php`

You should see:
- ✓ Configuration correct
- ✓ PHP Redis extension loaded
- ✓ Successfully connected to Redis
- ✓ Write/Read/Delete tests pass
- ✓ Performance benchmarks

If any test fails, see Troubleshooting below.

### 3. Enable Caching

Once tests pass:

```bash
# On your server, rename files:
mv index.html index-static.html    # Backup original
mv index-cached.php index.php       # Enable caching
```

Now visit `https://ibm.a1.bg/` and check response headers (browser DevTools → Network):
- First visit: `X-Cache: MISS` (~500ms)
- Refresh: `X-Cache: HIT` (~50ms) ← 10x faster!

## Configuration

Your Redis settings are in `cache-config.php`:

```php
// Redis connection
define('REDIS_HOST', '127.0.0.1');
define('REDIS_PORT', 12402);  // Custom port

// Unique prefix for isolation (multiple domains on same Redis)
define('CACHE_PREFIX', 'ibm_a1_');

// Cache duration: 24 hours
define('CACHE_TTL', 86400);

// Enable/disable caching
define('CACHE_ENABLED', true);
```

### Why Key Prefix?

The `ibm_a1_` prefix ensures your cache keys don't conflict with other domains on the same Redis server. All your keys will be:
- `ibm_a1_page:home:xyz123`
- `ibm_a1_user:session:abc456`
- etc.

When you flush cache, only `ibm_a1_*` keys are deleted, leaving other domains untouched.

## Cache Duration Settings

Configured in `cache-config.php`:

```php
define('CACHE_TTL_PAGE', 86400);      // 24 hours - full HTML pages
define('CACHE_TTL_QUERY', 43200);     // 12 hours - database queries
define('CACHE_TTL_API', 3600);        // 1 hour - API responses
define('CACHE_TTL_SESSION', 7200);    // 2 hours - session data
define('CACHE_TTL_TEMPORARY', 300);   // 5 minutes - temporary data
```

### Recommended TTL by Content Type

| Content Type | TTL | Use Case |
|--------------|-----|----------|
| Static pages | 24 hours | Landing page, about page |
| News/Blog | 1-6 hours | Frequently updated content |
| Product data | 12 hours | Moderate update frequency |
| User sessions | 2 hours | Active user data |
| API responses | 1 hour | External data |
| Search results | 15 minutes | Dynamic queries |

## Clearing Cache

### Method 1: Visit clear-cache.php

Visit: `https://ibm.a1.bg/clear-cache.php`

This clears all `ibm_a1_*` keys.

### Method 2: Programmatically

```php
<?php
require_once 'cache.php';
$cache = new Cache();
$cache->flush(); // Clear all ibm_a1_* keys
?>
```

### Method 3: Clear Specific Key

```php
$cache->delete('page:home:xyz123');
```

### When to Clear Cache

- ✅ After updating content (text, images)
- ✅ After code changes (CSS, JS)
- ✅ After form/feature changes
- ❌ Don't need to clear for user-specific actions

## Usage Examples

### Basic Page Caching

```php
<?php
require_once 'cache.php';
$cache = new Cache();

$cacheKey = 'page:about';
$html = $cache->remember($cacheKey, function() {
    // This only runs on cache miss
    return generatePageHTML();
}, CACHE_TTL_PAGE);

echo $html;
?>
```

### Database Query Caching

```php
$products = $cache->remember('products:list', function() {
    // Expensive database query
    return $db->query("SELECT * FROM products")->fetchAll();
}, CACHE_TTL_QUERY);
```

### Form Submission Rate Limiting

```php
$ipAddress = $_SERVER['REMOTE_ADDR'];
$submissionsToday = $cache->increment("ratelimit:form:{$ipAddress}");

if ($submissionsToday === 1) {
    // First submission, set 24-hour expiry
    $cache->set("ratelimit:form:{$ipAddress}", 1, 86400);
}

if ($submissionsToday > 5) {
    die('Too many submissions. Please try tomorrow.');
}
```

## Monitoring

### Check Cache Stats

Visit: `https://ibm.a1.bg/test-redis.php`

Shows:
- Total cached keys
- List of all keys
- Performance metrics
- Connection status

### Check Individual Key

```php
<?php
require_once 'cache.php';
$cache = new Cache();

// Check if exists
if ($cache->exists('page:home')) {
    // Get remaining TTL
    $ttl = $cache->getTTL('page:home');
    echo "Expires in {$ttl} seconds";
}
?>
```

### Performance Monitoring

Add to your analytics:

```php
$startTime = microtime(true);
$html = $cache->get('page:home');
$loadTime = round((microtime(true) - $startTime) * 1000, 2);

// Log performance
error_log("Cache load time: {$loadTime}ms");
```

## Troubleshooting

### Redis Extension Not Loaded

**Error:** "Redis extension not loaded"

**Fix:**
```bash
# Ubuntu/Debian
sudo apt-get install php-redis
sudo systemctl restart apache2

# cPanel: Enable in PHP Extensions
# Contact hosting support if not available
```

### Connection Failed

**Error:** "Failed to connect to Redis server"

**Possible causes:**
1. Wrong port (should be 12402, not 6379)
2. Redis not running
3. Firewall blocking connection

**Fix:**
```bash
# Test Redis connection
redis-cli -h 127.0.0.1 -p 12402 ping

# Should return: PONG
```

If Redis is not responding, contact your hosting provider.

### Cache Not Working

**Symptoms:** Always seeing `X-Cache: MISS`

**Checklist:**
- [ ] `CACHE_ENABLED` is `true` in `cache-config.php`
- [ ] Redis connection successful (test-redis.php shows green)
- [ ] PHP Redis extension installed
- [ ] Using `index.php` (not `index.html`)
- [ ] No PHP errors (check error logs)

**Debug:**
```php
// Enable debug logging in cache-config.php
define('CACHE_DEBUG', true);

// Check error log
tail -f /path/to/error.log
```

### Keys Not Isolated

**Problem:** Seeing other domains' cache keys

**Fix:** Verify unique prefix in `cache-config.php`:
```php
// Make sure this is unique per domain
define('CACHE_PREFIX', 'ibm_a1_');

// NOT 'cache_' or 'site_' (too generic)
```

## Security

### Protect Sensitive Files

Add to `.htaccess`:

```apache
<FilesMatch "^(cache-config\.php|test-redis\.php|clear-cache\.php)$">
    Order allow,deny
    Deny from all
    # Allow only from your IP
    Allow from 123.456.789.0
</FilesMatch>
```

### Or Delete Test Files After Setup

```bash
rm test-redis.php
rm clear-cache.php  # Or keep with password protection
```

### Password-Protect clear-cache.php

Uncomment in `clear-cache.php`:

```php
$password = 'your_secure_password_here';
if (!isset($_GET['password']) || $_GET['password'] !== $password) {
    die('Access denied');
}
```

Visit: `https://ibm.a1.bg/clear-cache.php?password=your_secure_password_here`

## Performance Expectations

### Before Caching
- Page load: ~500-800ms
- Database queries: ~100-200ms
- Total TTFB: ~400-600ms

### After Caching
- Page load: ~50-100ms (10x faster!)
- Cache hit: ~0.5-2ms
- Total TTFB: ~50-100ms (5-10x faster!)

### Expected Cache Hit Rate
- After 1 hour: ~80-90%
- After 24 hours: ~95-98%
- Peak traffic: ~99%

## Maintenance

### Daily
- Monitor cache hit rate
- Check error logs
- Verify site performance

### After Content Updates
1. Make changes to HTML/CSS/JS
2. Visit `clear-cache.php`
3. Test site to verify changes visible
4. Monitor for any errors

### Weekly
- Review cache statistics
- Check Redis memory usage
- Review performance metrics

### Monthly
- Optimize cache TTL based on usage patterns
- Clean up unused cache keys
- Review and update cache strategy

## Advanced Usage

### Cache Warming

Pre-populate cache for better first-load performance:

```php
<?php
require_once 'cache.php';
$cache = new Cache();

$pages = ['/', '/products', '/contact'];

foreach ($pages as $page) {
    $html = file_get_contents("https://ibm.a1.bg{$page}");
    $cache->set("page:{$page}", $html, CACHE_TTL_PAGE);
    echo "Warmed cache for: {$page}\n";
}
?>
```

### Conditional Caching

Cache only for anonymous users:

```php
<?php
require_once 'cache.php';
$cache = new Cache();

// Don't cache for logged-in users
if (!isset($_SESSION['user_id'])) {
    $html = $cache->remember('page:home', function() {
        return generateHTML();
    });
} else {
    $html = generateHTML(); // No cache for logged-in users
}

echo $html;
?>
```

### Cache Tags

Organize cache by tags:

```php
// Set cache with tag
$cache->set('product:123', $data);
$cache->set('product:tag:electronics', ['product:123', 'product:456']);

// Clear all electronics products
$productIds = $cache->get('product:tag:electronics');
foreach ($productIds as $id) {
    $cache->delete($id);
}
```

## Support

- **Documentation:** See `docs/REDIS_CACHING.md` for detailed guide
- **Test Tool:** `test-redis.php`
- **Clear Cache:** `clear-cache.php`
- **Configuration:** `cache-config.php`

## Summary

✅ **Configuration:** Port 12402, prefix `ibm_a1_`, TTL 24h
✅ **Test:** Visit `test-redis.php`
✅ **Enable:** Rename `index-cached.php` to `index.php`
✅ **Clear:** Visit `clear-cache.php` after updates
✅ **Performance:** 10x faster with 95%+ cache hit rate

Your Redis caching is now configured and ready to use! 🚀
