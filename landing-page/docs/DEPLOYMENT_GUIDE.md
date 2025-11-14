# Deployment Guide - Shared Hosting

Complete guide for deploying the IBM landing page to shared hosting (cPanel, Plesk, or similar).

## Prerequisites

- ✅ Shared hosting account with:
  - PHP 7.4+ support
  - Apache/Nginx web server
  - FTP/SFTP access
  - (Optional) Redis support for caching
- ✅ Domain or subdomain configured
- ✅ FTP client installed (FileZilla, Cyberduck, or WinSCP)

## Quick Deployment Steps

### 1. Build for Production

Before uploading, build the minified files:

```bash
# Build all assets
npm run build

# Verify minified files exist
ls -la css/styles.min.css
ls -la js/*.min.js
```

### 2. Prepare Files

Create a clean deployment package by excluding unnecessary files:

**Files to upload:**
```
✅ index.html
✅ css/ (folder)
✅ js/ (folder)
✅ images/ (folder)
✅ fonts/ (folder)
✅ send-email.php
✅ config.env.php
✅ .htaccess
✅ cache.php (if using Redis)
✅ cache-example.php (optional, for reference)
```

**Files to EXCLUDE (don't upload):**
```
❌ node_modules/ (folder)
❌ docs/ (folder)
❌ .git/ (folder)
❌ package.json
❌ package-lock.json
❌ build.js
❌ .gitignore
❌ README.md
❌ *.md files
```

### 3. Upload via FTP/SFTP

#### Option A: Using FileZilla (Recommended)

1. **Download FileZilla**: https://filezilla-project.org/download.php?type=client

2. **Connect to your server:**
   - Host: `ftp.yourdomain.com` or IP address
   - Username: Your cPanel/FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

3. **Navigate to web root:**
   - Common paths:
     - `/public_html/` (main domain)
     - `/public_html/ibm/` (subdomain or subfolder)
     - `/www/`
     - `/htdocs/`

4. **Upload files:**
   - Drag and drop files from local to remote
   - Maintain folder structure
   - Upload all files and folders listed above

#### Option B: Using cPanel File Manager

1. **Login to cPanel**
2. **Open File Manager**
3. **Navigate to public_html** (or your domain folder)
4. **Click Upload**
5. **Select all files** and upload
6. **Extract if needed** (if you uploaded a ZIP file)

#### Option C: Using Command Line (SFTP)

```bash
# Connect via SFTP
sftp username@yourdomain.com

# Navigate to web root
cd public_html

# Upload files
put -r css
put -r js
put -r images
put -r fonts
put index.html
put send-email.php
put config.env.php
put .htaccess
put cache.php

# Exit
exit
```

### 4. Set File Permissions

Set correct permissions via FTP client or cPanel:

```
Folders:      755 (drwxr-xr-x)
PHP files:    644 (-rw-r--r--)
HTML files:   644 (-rw-r--r--)
CSS/JS files: 644 (-rw-r--r--)
Images:       644 (-rw-r--r--)
.htaccess:    644 (-rw-r--r--)
```

**Important:** Never use 777 permissions - it's a security risk!

### 5. Configure Environment

Edit `config.env.php` on the server to ensure SMTP settings are correct:

```php
<?php
define('SMTP_HOST', 'mail.a1digitalroom.com');
define('SMTP_PORT', 465);
define('SMTP_USER', 'ibm@a1digitalroom.com');
define('SMTP_PASS', 'your-password-here');
define('SMTP_TO', 'konstantin.tsvetkov@a1.bg, m.manzova@a1.bg, Lyubomir.Levchev@a1.bg, plamen.ruskov@a1.bg');
define('SMTP_SECURE', 'ssl');
?>
```

### 6. Test Your Deployment

Visit your website and test:

1. **Homepage loads**: https://ibm.a1.bg/
2. **Images load**: Check hero background, banners, icons
3. **Fonts render**: Check A1Sans and A1Serif fonts
4. **Dark mode works**: Toggle dark mode button
5. **Animations work**: Scroll down to see GSAP animations
6. **Form submission**: Fill and submit the contact form
7. **Email delivery**: Check if emails arrive
8. **Mobile view**: Test responsive design
9. **HTTPS redirect**: Visit http://ibm.a1.bg/ (should redirect to https://)

## Detailed Deployment Methods

### Method 1: FTP Upload (Most Common)

**Step-by-step with FileZilla:**

1. **Install FileZilla Client**
   - Download: https://filezilla-project.org/

2. **Get FTP Credentials**
   - Login to your hosting cPanel
   - Go to "FTP Accounts" or "File Manager"
   - Get hostname, username, password

3. **Connect**
   - Open FileZilla
   - File → Site Manager → New Site
   - Protocol: SFTP (recommended) or FTP
   - Host: ftp.yourdomain.com
   - User: your-username
   - Password: your-password
   - Click "Connect"

4. **Upload Files**
   - Left pane: Your local computer
   - Right pane: Your server
   - Navigate to web root on server (usually `public_html/`)
   - Drag files from left to right
   - Wait for upload to complete

5. **Verify Upload**
   - Check all folders and files are present
   - Check file sizes match local files
   - Check no upload errors in FileZilla log

### Method 2: cPanel File Manager

**Step-by-step:**

1. **Login to cPanel**
   - Usually at: https://yourdomain.com:2083
   - Or: https://yourdomain.com/cpanel

2. **Open File Manager**
   - Click "File Manager" icon
   - Select "Web Root (public_html)"
   - Click "Go"

3. **Create Subfolder** (if deploying to subfolder)
   - Click "New Folder"
   - Name it "ibm"
   - Navigate into folder

4. **Upload Files**
   - Click "Upload" button
   - Drag files or click "Select File"
   - Wait for upload (progress bar shows status)

5. **Extract ZIP** (if you uploaded a ZIP file)
   - Right-click ZIP file
   - Click "Extract"
   - Delete ZIP file after extraction

6. **Set Permissions**
   - Select all files/folders
   - Click "Permissions"
   - Set folders to 755
   - Set files to 644

### Method 3: Git Deployment (Advanced)

If your hosting supports SSH and Git:

```bash
# SSH into your server
ssh username@yourdomain.com

# Navigate to web root
cd public_html

# Clone repository
git clone https://github.com/Sevyan6608/IBM.git ibm

# Navigate to folder
cd ibm/landing-page

# Install dependencies (if Node.js available)
npm install

# Build assets
npm run build

# Done!
```

**Note:** Most shared hosting doesn't have Node.js, so build locally first.

### Method 4: Rsync (Advanced)

For developers comfortable with command line:

```bash
# Build locally first
npm run build

# Sync to server (excludes unnecessary files)
rsync -avz --exclude 'node_modules' \
           --exclude '.git' \
           --exclude 'docs' \
           --exclude '*.md' \
           --exclude 'package*.json' \
           --exclude 'build.js' \
           ./ username@yourdomain.com:~/public_html/ibm/

# Or use a deployment script (see deploy.sh below)
```

## Domain Configuration

### Main Domain Deployment

If deploying to main domain (https://ibm.a1.bg/):
- Upload files to: `/public_html/`
- URL will be: https://ibm.a1.bg/

### Subdomain Deployment

If deploying to subdomain (https://ibm.a1.bg/):

1. **Create Subdomain in cPanel**
   - Go to "Subdomains"
   - Enter: `ibm`
   - Domain: `a1.bg`
   - Document Root: `/public_html/ibm`
   - Click "Create"

2. **Upload Files**
   - Upload to: `/public_html/ibm/`

### Subfolder Deployment

If deploying to subfolder (https://yourdomain.com/ibm/):
- Upload files to: `/public_html/ibm/`
- URL will be: https://yourdomain.com/ibm/

**Important:** Update all absolute URLs in your files if using subfolder!

## SSL Certificate Setup

### Free SSL (Let's Encrypt) via cPanel

1. **Login to cPanel**
2. **Go to SSL/TLS Status**
3. **Check the domain/subdomain**
4. **Click "Run AutoSSL"**
5. **Wait for installation** (usually 1-5 minutes)
6. **Test HTTPS**: https://ibm.a1.bg/

The `.htaccess` file already forces HTTPS redirect, so HTTP traffic will automatically redirect to HTTPS.

## Post-Deployment Configuration

### 1. Test Email Functionality

**Test the contact form:**
```bash
# Or use the form on the website
curl -X POST https://ibm.a1.bg/send-email.php \
  -d "company=Test Company" \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "phone=+359888123456" \
  -d "service=IBM Storage" \
  -d "consent=true"
```

Check if email arrives at all configured addresses.

### 2. Enable Redis Caching (Optional)

**Check if Redis is available:**

Create a test file `redis-test.php`:
```php
<?php
if (extension_loaded('redis')) {
    echo "Redis is available!";
    $redis = new Redis();
    if ($redis->connect('127.0.0.1', 6379)) {
        echo " And connected successfully!";
    } else {
        echo " But connection failed.";
    }
} else {
    echo "Redis extension not installed.";
}
?>
```

Visit: https://ibm.a1.bg/redis-test.php

If Redis is available, follow `docs/REDIS_CACHING.md` for setup.

### 3. Optimize Performance

**Enable OPcache (if available):**

Add to `.htaccess` or create `php.ini`:
```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60
```

**Enable gzip compression (already in .htaccess):**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### 4. Set Up Monitoring

**Google Analytics:**
- Already included in `index.html` (GTM-XXXXXXX)
- Update with your actual GTM ID

**Uptime Monitoring:**
- Use tools like UptimeRobot, Pingdom, or StatusCake
- Monitor: https://ibm.a1.bg/

**Error Logging:**

Create `php.ini` in web root:
```ini
display_errors = Off
log_errors = On
error_log = /path/to/error.log
```

## Troubleshooting

### Issue: "Internal Server Error" (500 Error)

**Causes:**
- `.htaccess` syntax error
- PHP version incompatibility
- File permissions too restrictive

**Solutions:**
```bash
# 1. Check .htaccess syntax
# Temporarily rename .htaccess to .htaccess.bak and test

# 2. Check PHP version in cPanel
# Go to "Select PHP Version" and ensure PHP 7.4+

# 3. Check error logs
# cPanel → Error Log
```

### Issue: "403 Forbidden" Error

**Cause:** File permissions too restrictive

**Solution:**
```bash
# Set correct permissions
Folders: 755
Files: 644
```

### Issue: Images or CSS not loading

**Causes:**
- Incorrect file paths
- Case sensitivity (Linux servers are case-sensitive)
- Files not uploaded

**Solutions:**
```bash
# 1. Check browser console for 404 errors
# 2. Verify files exist on server
# 3. Check case matches exactly:
#    images/Banner-Storage.jpeg ≠ images/banner-storage.jpeg
# 4. Check .htaccess for rewrite rules
```

### Issue: Form emails not sending

**Causes:**
- SMTP credentials incorrect
- Port blocked by hosting
- PHP mail function disabled

**Solutions:**
```bash
# 1. Check config.env.php credentials
# 2. Test SMTP connection
# 3. Check hosting firewall settings
# 4. Contact hosting support to enable port 465/587
# 5. Check send-email.php for errors
```

### Issue: HTTPS not working

**Causes:**
- SSL certificate not installed
- Mixed content (HTTP resources on HTTPS page)

**Solutions:**
```bash
# 1. Install SSL certificate in cPanel
# 2. Check all resources use HTTPS or relative URLs
# 3. Check browser console for mixed content warnings
```

### Issue: "Permission Denied" when uploading

**Cause:** FTP user doesn't have write permissions

**Solution:**
- Contact hosting support
- Check if uploading to correct directory
- Verify FTP user has proper permissions

## Maintenance

### Regular Updates

**Weekly:**
- Check form submissions are being received
- Monitor email delivery
- Check website uptime

**Monthly:**
- Review error logs
- Check disk space usage
- Update dependencies (if applicable)
- Review analytics

**After Content Changes:**
```bash
# 1. Edit files locally
# 2. Build minified versions
npm run build

# 3. Upload changed files via FTP
# Only upload: .min.css, .min.js, index.html

# 4. Clear browser cache and test
Ctrl+Shift+R (hard refresh)
```

### Backup Strategy

**Before Deployment:**
```bash
# Download current live site
# Via FTP or cPanel File Manager
# Store with date: ibm-backup-2025-11-14.zip
```

**Automated Backups:**
- Use cPanel backup feature (if available)
- Schedule daily/weekly backups
- Store off-site (Google Drive, Dropbox)

### Rollback Procedure

If deployment breaks the site:

1. **Download broken version** (for debugging later)
2. **Upload previous backup**
3. **Test site**
4. **Fix issues locally**
5. **Re-deploy**

## Deployment Checklist

Before going live, verify:

- [ ] All files built with `npm run build`
- [ ] All files uploaded to server
- [ ] File permissions set correctly (755/644)
- [ ] config.env.php has correct SMTP credentials
- [ ] Domain/subdomain configured
- [ ] SSL certificate installed
- [ ] HTTPS redirect working
- [ ] All images loading
- [ ] Fonts rendering correctly
- [ ] Dark mode toggle working
- [ ] Scroll animations working
- [ ] Form submission working
- [ ] Email delivery working
- [ ] Mobile responsive design working
- [ ] All browsers tested (Chrome, Firefox, Safari, Edge)
- [ ] Google Analytics tracking ID updated
- [ ] 404 page configured (optional)
- [ ] Favicon present
- [ ] robots.txt configured (optional)
- [ ] sitemap.xml created (optional)

## Performance Testing

After deployment, test performance:

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/analysis?url=https://ibm.a1.bg/

# GTmetrix
https://gtmetrix.com/

# Pingdom
https://tools.pingdom.com/
```

**Expected Scores:**
- PageSpeed: 90+ (Mobile), 95+ (Desktop)
- GTmetrix: A grade
- Load time: < 2 seconds

## Support

### Hosting Provider Support

Contact your hosting provider if:
- FTP/SFTP credentials don't work
- Can't access cPanel
- SSL certificate won't install
- Redis not available
- Port 465/587 blocked for SMTP

### Common Hosting Providers

**cPanel-based hosting:**
- SiteGround, Bluehost, HostGator, A2 Hosting, InMotion

**Plesk-based hosting:**
- Similar to cPanel, different interface

**All typically support:**
- PHP 7.4+
- Apache with mod_rewrite
- FTP/SFTP access
- SSL certificates (Let's Encrypt)
- Email (SMTP)

## Next Steps After Deployment

1. **Monitor for 24 hours** - Check for errors, test all features
2. **Set up analytics** - Monitor traffic and user behavior
3. **Configure backups** - Automate daily/weekly backups
4. **Optimize further** - Consider CDN, Redis caching
5. **Security hardening** - Regular updates, security monitoring

Your site is now live! 🎉
