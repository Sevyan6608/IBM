# Deployment Checklist

Use this checklist before and after deploying to ensure everything works correctly.

## Pre-Deployment (Local)

### Build & Test
- [ ] Run `npm run build` to create minified files
- [ ] Verify all `.min.css` and `.min.js` files exist
- [ ] Test locally in browser (open `index.html`)
- [ ] Test form submission locally
- [ ] Test dark mode toggle
- [ ] Test all animations
- [ ] Test on mobile devices/emulators
- [ ] Test in all major browsers (Chrome, Firefox, Safari, Edge)

### Files Ready
- [ ] `index.html` exists
- [ ] `css/styles.min.css` exists
- [ ] `js/main.min.js` exists
- [ ] `js/gsap-animations.min.js` exists
- [ ] `js/form.min.js` exists
- [ ] All images in `images/` folder
- [ ] All fonts in `fonts/` folder
- [ ] `send-email.php` exists
- [ ] `config.env.php` with correct credentials
- [ ] `.htaccess` exists

### Content Review
- [ ] All text in Bulgarian is correct
- [ ] All links work
- [ ] All images have proper alt text
- [ ] Contact email addresses are correct
- [ ] Phone numbers are correct
- [ ] No Lorem Ipsum placeholder text
- [ ] Copyright year is current (2025)

## Deployment

### Backup
- [ ] Download current live site (if updating existing site)
- [ ] Save backup with date: `ibm-backup-YYYY-MM-DD.zip`
- [ ] Store backup in safe location

### Upload
- [ ] Connect to FTP/SFTP
- [ ] Navigate to correct web root folder
- [ ] Upload all files maintaining folder structure
- [ ] Verify file count matches local files
- [ ] Check file sizes match

### File Permissions
- [ ] Folders: 755
- [ ] `index.html`: 644
- [ ] `*.php` files: 644
- [ ] `css/*.css`: 644
- [ ] `js/*.js`: 644
- [ ] `.htaccess`: 644
- [ ] Images: 644

### Configuration
- [ ] `config.env.php` has production SMTP settings
- [ ] Google Analytics ID updated (if applicable)
- [ ] Domain/subdomain configured correctly

### SSL/HTTPS
- [ ] SSL certificate installed
- [ ] HTTPS works: `https://ibm.a1.bg/`
- [ ] HTTP redirects to HTTPS automatically

## Post-Deployment Testing

### Basic Functionality
- [ ] Homepage loads without errors
- [ ] No console errors in browser DevTools
- [ ] All images load correctly
- [ ] Fonts render correctly (A1Sans and A1Serif)
- [ ] CSS styles applied correctly
- [ ] JavaScript executes without errors

### Navigation & Interactions
- [ ] All navigation links work
- [ ] Smooth scroll to sections works
- [ ] "Back to top" button works
- [ ] Mobile menu opens/closes correctly
- [ ] Dark mode toggle works
- [ ] Dark mode persists on page reload

### Animations
- [ ] Hero section visible on load
- [ ] Scroll animations trigger correctly
- [ ] USP cards animate on scroll
- [ ] Product cards animate on scroll
- [ ] No animation glitches or jerky movements
- [ ] Animations work on mobile

### Form Testing
- [ ] Form displays correctly
- [ ] All form fields work
- [ ] Form validation works (try submitting empty)
- [ ] Error messages display correctly
- [ ] Submit valid form
- [ ] Success message appears
- [ ] Email received at all configured addresses
- [ ] Email contains all form data
- [ ] Email formatting is correct

### Responsive Design
- [ ] Mobile view (< 768px) looks correct
- [ ] Tablet view (768px - 1024px) looks correct
- [ ] Desktop view (> 1024px) looks correct
- [ ] Images scale properly
- [ ] Text readable on all screen sizes
- [ ] No horizontal scroll on mobile
- [ ] Buttons clickable on mobile
- [ ] Form usable on mobile

### Cross-Browser Testing
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load quickly
- [ ] No render-blocking resources
- [ ] Smooth scrolling
- [ ] No layout shifts

### SEO & Metadata
- [ ] Page title correct
- [ ] Meta description present
- [ ] Open Graph tags correct
- [ ] Favicon loads
- [ ] Robots.txt configured (if needed)
- [ ] Sitemap.xml created (if needed)

### Security
- [ ] HTTPS enabled
- [ ] HSTS header present
- [ ] No sensitive data exposed in source code
- [ ] `config.env.php` not accessible via browser
- [ ] `.htaccess` protects sensitive files
- [ ] Form has CSRF protection (if implemented)

## Performance Benchmarks

Run these tests after deployment:

### Google PageSpeed Insights
- [ ] Run test: https://pagespeed.web.dev/
- [ ] Mobile score: 90+ (target)
- [ ] Desktop score: 95+ (target)
- [ ] Fix any red/yellow issues

### GTmetrix
- [ ] Run test: https://gtmetrix.com/
- [ ] Grade: A (target)
- [ ] Load time: < 2s (target)
- [ ] Page size: < 1MB (target)

### WebPageTest
- [ ] Run test: https://www.webpagetest.org/
- [ ] First Byte: < 0.5s
- [ ] Start Render: < 1s
- [ ] Fully Loaded: < 3s

## Monitoring Setup

### Analytics
- [ ] Google Analytics tracking working
- [ ] Google Tag Manager configured
- [ ] Test event tracking
- [ ] Form submission tracking works

### Uptime Monitoring
- [ ] Uptime monitor configured (UptimeRobot, Pingdom, etc.)
- [ ] Alert email configured
- [ ] Check frequency: 5 minutes

### Error Monitoring
- [ ] Error logging enabled
- [ ] Error log location known
- [ ] Regular error log review scheduled

## Documentation

- [ ] Deployment notes documented
- [ ] Any issues encountered documented
- [ ] Credentials stored securely
- [ ] Team members notified of deployment

## Final Verification

- [ ] Site accessible from different locations
- [ ] Site accessible from different networks (office, home, mobile data)
- [ ] All stakeholders tested and approved
- [ ] DNS propagated (if new domain)
- [ ] Email notifications working
- [ ] No broken links (use broken link checker)

## Post-Deployment (24-48 Hours)

- [ ] Monitor error logs
- [ ] Check analytics for traffic
- [ ] Verify form submissions received
- [ ] Check email delivery rate
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Check for any user-reported issues

## Rollback Plan

If issues occur:

- [ ] Have backup ready
- [ ] Know rollback procedure
- [ ] Can restore previous version in < 5 minutes
- [ ] Team knows who to contact for issues

## Success Criteria

Deployment is successful when:

✅ Site loads without errors
✅ All features work as expected
✅ Performance benchmarks met
✅ Form submissions work
✅ Emails delivered
✅ Mobile responsive
✅ Cross-browser compatible
✅ SSL/HTTPS working
✅ No console errors
✅ Analytics tracking

## Sign-off

- **Deployed by:** ___________________
- **Date:** ___________________
- **Time:** ___________________
- **Version:** ___________________
- **Tested by:** ___________________
- **Approved by:** ___________________

---

## Emergency Contacts

**Hosting Support:**
- Provider: ___________________
- Phone: ___________________
- Email: ___________________
- Login: ___________________

**Technical Contact:**
- Name: ___________________
- Phone: ___________________
- Email: ___________________

**Project Owner:**
- Name: ___________________
- Phone: ___________________
- Email: ___________________
