# Redis Caching Setup Guide

This guide will help you implement Redis caching on your IBM landing page to dramatically improve performance.

## Benefits

- **Faster Page Load Times**: Serve cached HTML in milliseconds
- **Reduced Server Load**: Minimize database queries and PHP processing
- **Better Scalability**: Handle more concurrent users
- **Improved SEO**: Faster sites rank better in search engines

## Prerequisites

1. Redis server installed on your hosting
2. PHP Redis extension installed
3. Access to PHP configuration

## Installation Steps

### 1. Install Redis Server

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**macOS (Homebrew):**
```bash
brew install redis
brew services start redis
```

**Verify Redis is running:**
```bash
redis-cli ping
# Should return: PONG
```

### 2. Install PHP Redis Extension

**Ubuntu/Debian:**
```bash
sudo apt-get install php-redis
sudo systemctl restart apache2  # or nginx
```

**macOS:**
```bash
pecl install redis
# Add extension=redis.so to php.ini
```

**Verify installation:**
```bash
php -m | grep redis
# Should show: redis
```

### 3. Configure Redis (Optional)

Edit Redis config for production:
```bash
sudo nano /etc/redis/redis.conf
```

Recommended settings:
```conf
maxmemory 256mb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
```

Restart Redis:
```bash
sudo systemctl restart redis-server
```

## Implementation

### Option 1: Full Page Caching (Recommended)

Rename `index.html` to `index.php` and add this at the very top:

```php
<?php
require_once 'cache.php';
$cache = new Cache();
$cacheKey = 'page:home';

// Try to serve from cache
if ($cache->isAvailable()) {
    $html = $cache->get($cacheKey);
    if ($html !== false) {
        header('X-Cache: HIT');
        echo $html;
        exit;
    }
}

// Start output buffering
ob_start();
header('X-Cache: MISS');
?>
<!DOCTYPE html>
<!-- Your existing HTML here -->
<?php
$html = ob_get_contents();
ob_end_clean();
$cache->set($cacheKey, $html, 900); // Cache for 15 minutes
echo $html;
?>
```

### Option 2: API Response Caching

For form submissions and API calls:

```php
<?php
require_once 'cache.php';
$cache = new Cache();

// Cache expensive queries
$data = $cache->remember('expensive_query', function() {
    // Your expensive operation
    return fetchFromDatabase();
}, 3600);
?>
```

### Option 3: Session Storage in Redis

Add to your PHP files:

```php
<?php
// Use Redis for session storage (faster than files)
ini_set('session.save_handler', 'redis');
ini_set('session.save_path', 'tcp://127.0.0.1:6379');
session_start();
?>
```

## Cache Invalidation

Clear cache when content updates:

```php
<?php
require_once 'cache.php';
$cache = new Cache();

// Clear specific page
$cache->delete('page:home');

// Clear all pages
$cache->deletePattern('page:*');

// Clear everything (use with caution)
$cache->flush();
?>
```

## Performance Testing

### Before Caching
```bash
ab -n 100 -c 10 https://ibm.a1.bg/
```

### After Caching
```bash
ab -n 100 -c 10 https://ibm.a1.bg/
```

You should see:
- **Response time reduced by 50-90%**
- **Requests per second increased by 10-100x**
- **Server load significantly reduced**

## Monitoring

### Check Cache Status
```bash
redis-cli info stats
```

### Monitor Real-time Activity
```bash
redis-cli monitor
```

### Check Memory Usage
```bash
redis-cli info memory
```

### View All Keys
```bash
redis-cli keys '*'
```

## Troubleshooting

### Redis not connecting
```bash
# Check if Redis is running
sudo systemctl status redis-server

# Check if port is open
netstat -an | grep 6379

# Test connection
redis-cli ping
```

### PHP extension not loaded
```bash
# Check if extension is installed
php -m | grep redis

# Check php.ini
php --ini

# Add extension if missing
echo "extension=redis.so" | sudo tee -a /etc/php/8.1/cli/php.ini
```

### Cache not updating
```php
// Force cache refresh
$cache->delete('page:home');

// Or clear all
$cache->flush();
```

## Best Practices

1. **Cache TTL Strategy**
   - Static pages: 1-24 hours
   - Dynamic content: 5-15 minutes
   - User-specific data: Don't cache or use very short TTL

2. **Cache Keys**
   - Use descriptive prefixes: `page:`, `user:`, `query:`
   - Include version numbers: `page:home:v2`
   - Add language/region: `page:home:bg`

3. **Security**
   - Never cache sensitive user data
   - Use different cache keys for authenticated users
   - Clear cache after security updates

4. **Memory Management**
   - Monitor Redis memory usage
   - Set appropriate maxmemory limits
   - Use LRU eviction policy

## Advanced Features

### Rate Limiting
```php
function checkRateLimit($ip, $limit = 100) {
    global $cache;
    $key = "ratelimit:$ip";
    $requests = $cache->increment($key);

    if ($requests === 1) {
        $cache->set($key, 1, 3600); // 1 hour window
    }

    return $requests <= $limit;
}
```

### Cache Warming
```bash
# Warm cache after deployment
curl https://ibm.a1.bg/
curl https://ibm.a1.bg/?utm_source=test
```

### Automated Cache Clearing
```bash
# Add to cron (clear cache every 6 hours)
0 */6 * * * php /path/to/clear-cache.php
```

## Production Checklist

- [ ] Redis installed and running
- [ ] PHP Redis extension installed
- [ ] Redis persistence enabled (RDB or AOF)
- [ ] Maxmemory and eviction policy configured
- [ ] Cache invalidation strategy implemented
- [ ] Monitoring and alerting set up
- [ ] Backup strategy for Redis data
- [ ] Security: Redis password set (if needed)

## Support

For issues with:
- **Redis**: https://redis.io/documentation
- **PHP Redis Extension**: https://github.com/phpredis/phpredis
- **This implementation**: Check `cache-example.php` for usage examples

## Performance Benchmarks

Expected improvements after implementing Redis caching:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Page Load Time | 800ms | 150ms | 81% faster |
| Time to First Byte | 400ms | 50ms | 87.5% faster |
| Server CPU Usage | 65% | 15% | 77% reduction |
| Concurrent Users | 100 | 1000+ | 10x capacity |
| Cost per Request | $0.001 | $0.0001 | 90% savings |

*Actual results may vary based on server configuration and content complexity*
