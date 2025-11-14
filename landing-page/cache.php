<?php
/**
 * Redis Caching Layer
 * Simple and efficient caching system using Redis
 * Configured for A1 Bulgaria IBM Landing Page
 */

// Load configuration
require_once 'cache-config.php';

class Cache {
    private $redis;
    private $connected = false;
    private $prefix;
    private $defaultTTL;

    public function __construct($host = null, $port = null, $timeout = null, $prefix = null) {
        // Use configuration values if not provided
        $host = $host ?? REDIS_HOST;
        $port = $port ?? REDIS_PORT;
        $timeout = $timeout ?? REDIS_TIMEOUT;
        $this->prefix = $prefix ?? CACHE_PREFIX;
        $this->defaultTTL = CACHE_TTL;

        if (!extension_loaded('redis')) {
            $this->log('Redis extension not loaded. Caching will be disabled.');
            return;
        }

        if (!CACHE_ENABLED) {
            $this->log('Caching is disabled in configuration.');
            return;
        }

        try {
            $this->redis = new Redis();
            $this->connected = $this->redis->connect($host, $port, $timeout);

            if (!$this->connected) {
                $this->log("Failed to connect to Redis server at {$host}:{$port}");
            } else {
                $this->log("Successfully connected to Redis at {$host}:{$port}");
            }
        } catch (Exception $e) {
            $this->log('Redis connection error: ' . $e->getMessage());
            $this->connected = false;
        }
    }

    /**
     * Log debug messages if debug mode is enabled
     */
    private function log($message) {
        if (CACHE_DEBUG) {
            error_log('[Cache] ' . $message);
        }
    }

    /**
     * Add prefix to cache key for isolation
     */
    private function prefixKey($key) {
        return $this->prefix . $key;
    }

    /**
     * Remove prefix from cache key
     */
    private function unprefixKey($key) {
        if (strpos($key, $this->prefix) === 0) {
            return substr($key, strlen($this->prefix));
        }
        return $key;
    }

    /**
     * Check if Redis is connected and available
     */
    public function isAvailable() {
        return $this->connected;
    }

    /**
     * Get a value from cache
     * @param string $key The cache key (will be automatically prefixed)
     * @return mixed|false Returns the cached value or false if not found
     */
    public function get($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            $value = $this->redis->get($prefixedKey);

            if ($value === false) {
                $this->log("Cache MISS for key: {$key}");
                return false;
            }

            $this->log("Cache HIT for key: {$key}");

            // Try to unserialize, if it fails return raw value
            $unserialized = @unserialize($value);
            return ($unserialized !== false || $value === 'b:0;') ? $unserialized : $value;
        } catch (Exception $e) {
            $this->log('Redis get error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Set a value in cache
     * @param string $key The cache key (will be automatically prefixed)
     * @param mixed $value The value to cache
     * @param int $ttl Time to live in seconds (default: 24 hours)
     * @return bool Success status
     */
    public function set($key, $value, $ttl = null) {
        if (!$this->connected) {
            return false;
        }

        if ($ttl === null) {
            $ttl = $this->defaultTTL;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            $serialized = serialize($value);
            $result = $this->redis->setex($prefixedKey, $ttl, $serialized);

            $this->log("Cache SET for key: {$key} (TTL: {$ttl}s)");

            return $result;
        } catch (Exception $e) {
            $this->log('Redis set error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete a value from cache
     * @param string $key The cache key (will be automatically prefixed)
     * @return bool Success status
     */
    public function delete($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            $result = $this->redis->del($prefixedKey) > 0;

            $this->log("Cache DELETE for key: {$key}");

            return $result;
        } catch (Exception $e) {
            $this->log('Redis delete error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete multiple keys matching a pattern
     * @param string $pattern The pattern to match (e.g., 'user:*')
     * @return int Number of keys deleted
     */
    public function deletePattern($pattern) {
        if (!$this->connected) {
            return 0;
        }

        try {
            $prefixedPattern = $this->prefixKey($pattern);
            $keys = $this->redis->keys($prefixedPattern);

            if (empty($keys)) {
                $this->log("No keys found for pattern: {$pattern}");
                return 0;
            }

            $deleted = $this->redis->del($keys);
            $this->log("Deleted {$deleted} keys matching pattern: {$pattern}");

            return $deleted;
        } catch (Exception $e) {
            $this->log('Redis deletePattern error: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * Check if a key exists in cache
     * @param string $key The cache key (will be automatically prefixed)
     * @return bool
     */
    public function exists($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            return $this->redis->exists($prefixedKey) > 0;
        } catch (Exception $e) {
            $this->log('Redis exists error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Clear all cache for this prefix only (safe for multi-tenant)
     * @return int Number of keys deleted
     */
    public function flush() {
        if (!$this->connected) {
            return 0;
        }

        try {
            // Only delete keys with our prefix
            $pattern = $this->prefix . '*';
            $keys = $this->redis->keys($pattern);

            if (empty($keys)) {
                $this->log("No keys to flush for prefix: {$this->prefix}");
                return 0;
            }

            $deleted = $this->redis->del($keys);
            $this->log("Flushed {$deleted} keys with prefix: {$this->prefix}");

            return $deleted;
        } catch (Exception $e) {
            $this->log('Redis flush error: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * Get or set a cached value
     * If key exists, return it. Otherwise, execute callback and cache result
     * @param string $key The cache key
     * @param callable $callback Function to execute if cache miss
     * @param int $ttl Time to live in seconds
     * @return mixed
     */
    public function remember($key, $callback, $ttl = null) {
        $value = $this->get($key);

        if ($value !== false) {
            return $value;
        }

        $value = $callback();
        $this->set($key, $value, $ttl);

        return $value;
    }

    /**
     * Increment a counter
     * @param string $key The cache key (will be automatically prefixed)
     * @param int $amount Amount to increment by (default: 1)
     * @return int|false New value or false on failure
     */
    public function increment($key, $amount = 1) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            return $this->redis->incrBy($prefixedKey, $amount);
        } catch (Exception $e) {
            $this->log('Redis increment error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Decrement a counter
     * @param string $key The cache key (will be automatically prefixed)
     * @param int $amount Amount to decrement by (default: 1)
     * @return int|false New value or false on failure
     */
    public function decrement($key, $amount = 1) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            return $this->redis->decrBy($prefixedKey, $amount);
        } catch (Exception $e) {
            $this->log('Redis decrement error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Get cache statistics
     * @return array Statistics about cached items with this prefix
     */
    public function getStats() {
        if (!$this->connected) {
            return ['status' => 'unavailable'];
        }

        try {
            $pattern = $this->prefix . '*';
            $keys = $this->redis->keys($pattern);

            return [
                'status' => 'available',
                'prefix' => $this->prefix,
                'total_keys' => count($keys),
                'keys' => array_map([$this, 'unprefixKey'], $keys),
                'redis_info' => $this->redis->info('stats')
            ];
        } catch (Exception $e) {
            $this->log('Redis getStats error: ' . $e->getMessage());
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    /**
     * Get time until key expires
     * @param string $key The cache key
     * @return int|false Seconds until expiry, -1 if no expiry, false if key doesn't exist
     */
    public function getTTL($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            $prefixedKey = $this->prefixKey($key);
            return $this->redis->ttl($prefixedKey);
        } catch (Exception $e) {
            $this->log('Redis getTTL error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Close the Redis connection
     */
    public function close() {
        if ($this->connected && $this->redis) {
            try {
                $this->redis->close();
                $this->log('Redis connection closed');
            } catch (Exception $e) {
                $this->log('Redis close error: ' . $e->getMessage());
            }
        }
    }

    /**
     * Destructor - ensure connection is closed
     */
    public function __destruct() {
        $this->close();
    }
}

// Example usage:
// $cache = new Cache();
//
// // Simple get/set (24 hour TTL by default)
// $cache->set('homepage', $htmlContent);
// $html = $cache->get('homepage');
//
// // Custom TTL
// $cache->set('temporary', $data, 300); // 5 minutes
//
// // Remember pattern (get or execute and cache)
// $data = $cache->remember('expensive_query', function() {
//     return fetchDataFromDatabase();
// }, CACHE_TTL_QUERY);
//
// // All keys are automatically prefixed with 'ibm_a1_' for isolation
