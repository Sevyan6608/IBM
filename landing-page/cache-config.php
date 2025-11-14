<?php
/**
 * Redis Cache Configuration
 * Configuration file for Redis caching system
 */

// Redis connection settings
define('REDIS_HOST', '127.0.0.1');
define('REDIS_PORT', 12402);
define('REDIS_TIMEOUT', 2.5); // Connection timeout in seconds

// Cache key prefix/salt for isolation (multiple domains on same Redis)
// Change this to make it unique for your domain
define('CACHE_PREFIX', 'ibm_a1_'); // Unique prefix for IBM A1 landing page

// Default cache TTL (Time To Live) in seconds
define('CACHE_TTL', 86400); // 24 hours = 86400 seconds

// Cache configuration for different content types
define('CACHE_TTL_PAGE', 86400);      // 24 hours for full page cache
define('CACHE_TTL_QUERY', 43200);     // 12 hours for database queries
define('CACHE_TTL_API', 3600);        // 1 hour for API responses
define('CACHE_TTL_SESSION', 7200);    // 2 hours for session data
define('CACHE_TTL_TEMPORARY', 300);   // 5 minutes for temporary data

// Enable/disable caching
define('CACHE_ENABLED', true);

// Enable debug logging
define('CACHE_DEBUG', false);
