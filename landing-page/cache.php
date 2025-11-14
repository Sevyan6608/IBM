<?php
/**
 * Redis Caching Layer
 * Simple and efficient caching system using Redis
 */

class Cache {
    private $redis;
    private $connected = false;
    private $defaultTTL = 3600; // 1 hour default TTL

    public function __construct($host = '127.0.0.1', $port = 6379, $timeout = 2.5) {
        if (!extension_loaded('redis')) {
            error_log('Redis extension not loaded. Caching will be disabled.');
            return;
        }

        try {
            $this->redis = new Redis();
            $this->connected = $this->redis->connect($host, $port, $timeout);

            if (!$this->connected) {
                error_log('Failed to connect to Redis server');
            }
        } catch (Exception $e) {
            error_log('Redis connection error: ' . $e->getMessage());
            $this->connected = false;
        }
    }

    /**
     * Check if Redis is connected and available
     */
    public function isAvailable() {
        return $this->connected;
    }

    /**
     * Get a value from cache
     * @param string $key The cache key
     * @return mixed|false Returns the cached value or false if not found
     */
    public function get($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            $value = $this->redis->get($key);

            // Redis returns false if key doesn't exist
            if ($value === false) {
                return false;
            }

            // Try to unserialize, if it fails return raw value
            $unserialized = @unserialize($value);
            return ($unserialized !== false || $value === 'b:0;') ? $unserialized : $value;
        } catch (Exception $e) {
            error_log('Redis get error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Set a value in cache
     * @param string $key The cache key
     * @param mixed $value The value to cache
     * @param int $ttl Time to live in seconds (default: 1 hour)
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
            $serialized = serialize($value);
            return $this->redis->setex($key, $ttl, $serialized);
        } catch (Exception $e) {
            error_log('Redis set error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Delete a value from cache
     * @param string $key The cache key
     * @return bool Success status
     */
    public function delete($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            return $this->redis->del($key) > 0;
        } catch (Exception $e) {
            error_log('Redis delete error: ' . $e->getMessage());
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
            $keys = $this->redis->keys($pattern);
            if (empty($keys)) {
                return 0;
            }
            return $this->redis->del($keys);
        } catch (Exception $e) {
            error_log('Redis deletePattern error: ' . $e->getMessage());
            return 0;
        }
    }

    /**
     * Check if a key exists in cache
     * @param string $key The cache key
     * @return bool
     */
    public function exists($key) {
        if (!$this->connected) {
            return false;
        }

        try {
            return $this->redis->exists($key);
        } catch (Exception $e) {
            error_log('Redis exists error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Clear all cache (use with caution)
     * @return bool Success status
     */
    public function flush() {
        if (!$this->connected) {
            return false;
        }

        try {
            return $this->redis->flushDB();
        } catch (Exception $e) {
            error_log('Redis flush error: ' . $e->getMessage());
            return false;
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
     * @param string $key The cache key
     * @param int $amount Amount to increment by (default: 1)
     * @return int|false New value or false on failure
     */
    public function increment($key, $amount = 1) {
        if (!$this->connected) {
            return false;
        }

        try {
            return $this->redis->incrBy($key, $amount);
        } catch (Exception $e) {
            error_log('Redis increment error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Decrement a counter
     * @param string $key The cache key
     * @param int $amount Amount to decrement by (default: 1)
     * @return int|false New value or false on failure
     */
    public function decrement($key, $amount = 1) {
        if (!$this->connected) {
            return false;
        }

        try {
            return $this->redis->decrBy($key, $amount);
        } catch (Exception $e) {
            error_log('Redis decrement error: ' . $e->getMessage());
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
            } catch (Exception $e) {
                error_log('Redis close error: ' . $e->getMessage());
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
// // Simple get/set
// $cache->set('user:123', ['name' => 'John', 'email' => 'john@example.com'], 3600);
// $user = $cache->get('user:123');
//
// // Remember pattern (get or execute and cache)
// $data = $cache->remember('expensive_query', function() {
//     // Expensive database query or API call
//     return fetchDataFromDatabase();
// }, 1800);
