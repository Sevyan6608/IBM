<?php
/**
 * SMTP Configuration File - EXAMPLE
 *
 * INSTRUCTIONS:
 * 1. Copy this file to config.env.php
 * 2. Update the values below with your actual SMTP credentials
 * 3. The config.env.php file is in .gitignore for security
 */

// SMTP Server Configuration
define('SMTP_HOST', 'smtp.example.com');          // Your SMTP server (e.g., smtp.gmail.com, smtp.office365.com)
define('SMTP_PORT', 587);                          // Port: 587 for TLS, 465 for SSL
define('SMTP_USER', 'your-email@example.com');     // Your SMTP username/email
define('SMTP_PASS', 'your-password');              // Your SMTP password or app-specific password
define('SMTP_TO', 'ibm@a1.bg');                    // Email address to receive form submissions

// SMTP Security
define('SMTP_SECURE', 'tls');                      // 'tls' or 'ssl'

// Additional Settings
define('SMTP_FROM_NAME', 'IBM A1 Contact Form');   // Sender name
define('SMTP_CHARSET', 'UTF-8');                   // Email charset

/**
 * Example configurations for popular email providers:
 *
 * Gmail:
 * - SMTP_HOST: smtp.gmail.com
 * - SMTP_PORT: 587
 * - SMTP_SECURE: tls
 * - Note: You need to enable "Less secure app access" or use App Password
 *
 * Office365:
 * - SMTP_HOST: smtp.office365.com
 * - SMTP_PORT: 587
 * - SMTP_SECURE: tls
 *
 * Outlook.com:
 * - SMTP_HOST: smtp-mail.outlook.com
 * - SMTP_PORT: 587
 * - SMTP_SECURE: tls
 *
 * SendGrid:
 * - SMTP_HOST: smtp.sendgrid.net
 * - SMTP_PORT: 587
 * - SMTP_SECURE: tls
 * - SMTP_USER: apikey
 * - SMTP_PASS: your-sendgrid-api-key
 *
 * Mailgun:
 * - SMTP_HOST: smtp.mailgun.org
 * - SMTP_PORT: 587
 * - SMTP_SECURE: tls
 */
?>
