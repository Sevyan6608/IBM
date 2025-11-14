# Setup Checklist for A1 Bulgaria IBM Landing Page

Use this checklist to ensure all required configurations are completed before launching the site.

## 📋 Configuration Tasks

### 1. EmailJS Setup
- [ ] Create EmailJS account at https://www.emailjs.com/
- [ ] Add email service (Gmail, Outlook, etc.)
- [ ] Create email template with required variables
- [ ] Copy Public Key: `_______________________`
- [ ] Copy Service ID: `_______________________`
- [ ] Copy Template ID: `_______________________`
- [ ] Update `js/form.js` with EmailJS credentials
- [ ] Test form submission

**Files to update:**
- `js/form.js` (lines 13-15)

### 2. Google Tag Manager
- [ ] Create GTM account at https://tagmanager.google.com/
- [ ] Create container
- [ ] Copy GTM Container ID: `GTM-_______`
- [ ] Update `index.html` with GTM ID (2 locations)
- [ ] Test GTM using Preview mode

**Files to update:**
- `index.html` (lines 18 and 27)

### 3. Google Analytics 4
- [ ] Create GA4 property
- [ ] Copy Measurement ID: `G-__________`
- [ ] Add GA4 tag via GTM OR update `index.html` directly
- [ ] Verify tracking in GA4 Real-Time reports

**Files to update (if using direct implementation):**
- `index.html` (uncomment GA4 script section)

### 4. Images

#### Logo Files
- [ ] Add A1 logo: `images/a1-logo.svg` (or .png)
- [ ] Add IBM logo: `images/ibm-logo.svg` (or .png)

#### Product Images
- [ ] Add IBM Storage image: `images/products/ibm-storage.jpg`
- [ ] Add IBM Maximo image: `images/products/ibm-maximo.jpg`
- [ ] Add IBM Watsonx image: `images/products/ibm-watsonx.jpg`

#### Social Media
- [ ] Add share image: `images/share-image.jpg` (1200x630px)

#### Optional
- [ ] Add favicon: `favicon.ico`
- [ ] Add apple-touch-icon: `images/apple-touch-icon.png`

**See `IMAGES_NEEDED.md` for detailed requirements**

### 5. Content Updates

#### Contact Information
- [ ] Update phone number in HTML (currently: +359 888 123 456)
- [ ] Update email address in HTML (currently: ibm@a1.bg)
- [ ] Verify contact details in footer

**Files to update:**
- `index.html` (lines 376, 377, 425, 426)

#### Privacy Policy
- [ ] Add privacy policy page or external link
- [ ] Update privacy policy link in form checkbox

**Files to update:**
- `index.html` (line 365)

#### Service Dropdown Options
- [ ] Review dropdown options for contact form
- [ ] Add/remove services as needed

**Files to update:**
- `index.html` (lines 348-354)

### 6. Domain & Hosting

- [ ] Choose hosting provider (Netlify, Vercel, traditional hosting)
- [ ] Register or configure domain
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure DNS records
- [ ] Test domain accessibility

### 7. Testing

#### Functionality
- [ ] Test mobile menu on all devices
- [ ] Test all navigation links
- [ ] Test contact form validation
- [ ] Test form submission (receive email)
- [ ] Test all CTA buttons
- [ ] Test smooth scrolling

#### Cross-Browser
- [ ] Chrome (desktop & mobile)
- [ ] Firefox
- [ ] Safari (desktop & mobile)
- [ ] Edge
- [ ] Test on iOS devices
- [ ] Test on Android devices

#### Performance
- [ ] Run Lighthouse audit (target: >90 all categories)
- [ ] Check page load time (<2 seconds)
- [ ] Verify images are optimized
- [ ] Test on slow 3G connection

#### Accessibility
- [ ] Run WAVE accessibility test
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Check focus indicators

#### Responsive Design
- [ ] Test on mobile (320px - 767px)
- [ ] Test on tablet (768px - 1023px)
- [ ] Test on desktop (1024px+)
- [ ] Verify no horizontal scroll on mobile
- [ ] Check touch target sizes (min 44px)

#### Analytics & Tracking
- [ ] Verify GTM is loading
- [ ] Test CTA button click events
- [ ] Test form submission events
- [ ] Check GA4 Real-Time reports
- [ ] Verify custom events are firing

### 8. SEO

- [ ] Verify meta description is appropriate
- [ ] Check Open Graph tags
- [ ] Add structured data (optional)
- [ ] Create sitemap.xml (optional)
- [ ] Create robots.txt (optional)
- [ ] Submit to Google Search Console (optional)

### 9. Legal & Compliance

- [ ] Privacy policy is accessible
- [ ] GDPR consent checkbox is present
- [ ] Cookie notice (if using cookies beyond GA)
- [ ] Terms and conditions (if applicable)

### 10. Security

- [ ] HTTPS is enabled
- [ ] All external resources use HTTPS
- [ ] Form validation is working
- [ ] No sensitive data in client-side code
- [ ] Security headers configured (server-side)

## 🚀 Launch Day Tasks

- [ ] Final content review
- [ ] Final testing on all browsers
- [ ] Backup all files
- [ ] Deploy to production
- [ ] Verify production site loads correctly
- [ ] Test form on production site
- [ ] Verify GTM/GA tracking on production
- [ ] Monitor for errors in console
- [ ] Check mobile experience
- [ ] Share with stakeholders

## 📊 Post-Launch

- [ ] Monitor analytics for first 24 hours
- [ ] Check form submissions are being received
- [ ] Review any error reports
- [ ] Monitor page performance
- [ ] Collect user feedback
- [ ] Plan iterative improvements

## 🆘 Emergency Contacts

**Technical Issues:**
- Email: ibm@a1.bg
- Phone: +359 888 123 456

**Hosting Support:**
- Provider: _______________
- Support: _______________

**Domain Registrar:**
- Provider: _______________
- Support: _______________

## 📝 Configuration Summary

Keep a record of all credentials and IDs (store securely):

```
EmailJS Public Key: _______________________
EmailJS Service ID: _______________________
EmailJS Template ID: _______________________

GTM Container ID: GTM-_______

GA4 Measurement ID: G-__________

Domain: _______________________
Hosting: _______________________
Deploy Date: _______________________
```

## ✅ Final Checklist Before Launch

- [ ] All configurations completed
- [ ] All images added
- [ ] All testing passed
- [ ] Stakeholder approval received
- [ ] Backup created
- [ ] Monitoring set up
- [ ] Documentation reviewed
- [ ] Team briefed
- [ ] Support plan in place
- [ ] Ready to launch! 🚀

---

**Last Updated:** 2025-01-13
**Version:** 1.0.0
