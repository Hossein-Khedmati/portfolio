# SEO Verification Quick Guide

## Quick Verification Steps

### 1. Local Testing

```bash
# Start development server
npm run dev

# In browser, test these URLs:
http://localhost:3000/en
http://localhost:3000/fa
http://localhost:3000/en/skills
http://localhost:3000/en/projects
http://localhost:3000/en/contact
```

### 2. Check Metadata (Browser)

**Open DevTools (F12) → Elements/Inspector**

Look for these tags in `<head>`:

```html
<!-- Title -->
<title>Hossein Khedmati - Frontend Developer | React & Next.js Expert</title>

<!-- Description -->
<meta name="description" content="Professional Frontend Developer..." />

<!-- Keywords -->
<meta name="keywords" content="Hossein Khedmati, Frontend Developer..." />

<!-- OpenGraph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content=".../og-image.png" />
<meta property="og:locale" content="en_US" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Canonical -->
<link rel="canonical" href="https://hosseinkhedmati.ir/en" />

<!-- Language Alternates -->
<link rel="alternate" hreflang="en" href="https://hosseinkhedmati.ir/en" />
<link rel="alternate" hreflang="fa" href="https://hosseinkhedmati.ir/fa" />

<!-- Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Hossein Khedmati",
  ...
}
</script>
```

### 3. Test Sitemap

```bash
# Visit in browser
http://localhost:3000/sitemap.xml

# Should show XML with all pages:
# /en, /fa, /en/skills, /fa/skills, etc.
```

### 4. Test Robots.txt

```bash
# Visit in browser
http://localhost:3000/robots.txt

# Should show:
User-agent: *
Allow: /
Disallow: /api/
...
Sitemap: https://hosseinkhedmati.ir/sitemap.xml
```

### 5. Verify Persian Content

**Check Persian pages have:**
- ✅ `lang="fa"` on `<html>`
- ✅ `dir="rtl"` on `<html>`
- ✅ Persian title and description
- ✅ `og:locale="fa_IR"`

### 6. Test Build

```bash
# Build for production
npm run build

# Should complete without errors
# Check for successful metadata generation

# Start production server
npm start

# Test all pages again
```

## Online Verification Tools

### After Deployment to Production

#### 1. Google Rich Results Test
**URL**: https://search.google.com/test/rich-results

**Test these URLs:**
- `https://hosseinkhedmati.ir/en`
- `https://hosseinkhedmati.ir/fa`

**Look for:**
- ✅ Person schema detected
- ✅ No errors or warnings
- ✅ Preview shows correct data

#### 2. Schema Markup Validator
**URL**: https://validator.schema.org/

**Paste your HTML or enter URL**

**Expected:** No errors in structured data

#### 3. OpenGraph Preview
**URL**: https://www.opengraph.xyz/

**Enter:** `https://hosseinkhedmati.ir/en`

**Check:**
- ✅ Title displays correctly
- ✅ Description appears
- ✅ Image loads (1200x630)
- ✅ URL is correct

#### 4. Twitter Card Validator
**URL**: https://cards-dev.twitter.com/validator

**Enter:** `https://hosseinkhedmati.ir/en`

**Check:**
- ✅ Summary large image card
- ✅ Title and description
- ✅ Image displays

#### 5. PageSpeed Insights
**URL**: https://pagespeed.web.dev/

**Test both:**
- `https://hosseinkhedmati.ir/en`
- `https://hosseinkhedmati.ir/fa`

**Look for:**
- ✅ Good Core Web Vitals
- ✅ Mobile score > 90
- ✅ Desktop score > 95
- ✅ No SEO issues flagged

#### 6. Mobile-Friendly Test
**URL**: https://search.google.com/test/mobile-friendly

**Test:** `https://hosseinkhedmati.ir/en`

**Expected:** Page is mobile-friendly

## Search Console Setup

### Google Search Console

**URL**: https://search.google.com/search-console

**Steps:**
1. Add property: `https://hosseinkhedmati.ir`
2. Verify ownership (DNS or HTML file)
3. Submit sitemap: `https://hosseinkhedmati.ir/sitemap.xml`
4. Wait for indexing (1-7 days)
5. Monitor coverage report

### Bing Webmaster Tools

**URL**: https://www.bing.com/webmasters

**Steps:**
1. Add site: `https://hosseinkhedmati.ir`
2. Verify ownership
3. Submit sitemap: `https://hosseinkhedmati.ir/sitemap.xml`
4. Monitor site explorer

## Common Issues & Solutions

### Issue: Metadata not showing
**Solution:**
- Clear browser cache
- Check if page is server-rendered
- Verify generateMetadata() is async
- Check translation keys exist

### Issue: Sitemap returns 404
**Solution:**
- Verify `src/app/sitemap.ts` exists
- Check Next.js version (requires 13.3+)
- Rebuild the project

### Issue: Robots.txt not accessible
**Solution:**
- Verify `src/app/robots.ts` exists
- Check file exports correct function
- Restart dev server

### Issue: Persian pages show wrong direction
**Solution:**
- Check `getDir()` function in layout.tsx
- Verify `dir="rtl"` in HTML output
- Clear browser cache

### Issue: Structured data errors
**Solution:**
- Validate JSON-LD syntax
- Check for missing required fields
- Use Schema.org validator

## Manual Checklist

### English Pages (EN)

**Home (/en)**
- [ ] Title: "Hossein Khedmati - Frontend Developer | React & Next.js Expert"
- [ ] Description exists and is compelling
- [ ] Keywords include: Frontend Developer, React, Next.js
- [ ] OG image loads
- [ ] Canonical URL correct
- [ ] Hreflang tags present

**Skills (/en/skills)**
- [ ] Title: "Skills & Technologies - Hossein Khedmati"
- [ ] Description mentions React, Next.js, TypeScript
- [ ] Keywords relevant to technical skills

**Projects (/en/projects)**
- [ ] Title: "Projects & Portfolio - Hossein Khedmati"
- [ ] Description mentions web applications
- [ ] Keywords include portfolio, projects

**Contact (/en/contact)**
- [ ] Title: "Contact Me - Hossein Khedmati | Hire Frontend Developer"
- [ ] Description mentions freelance/full-time
- [ ] Keywords include hire, contact, remote

### Persian Pages (FA)

**Home (/fa)**
- [ ] Title: "حسین خدمتی - توسعه‌دهنده فرانت‌اند | متخصص React و Next.js"
- [ ] Description in Persian
- [ ] dir="rtl" on HTML element
- [ ] og:locale="fa_IR"

**Skills (/fa/skills)**
- [ ] Title: "مهارت‌ها و تکنولوژی‌ها - حسین خدمتی"
- [ ] Persian description
- [ ] RTL layout

**Projects (/fa/projects)**
- [ ] Title: "پروژه‌ها و نمونه کارها - حسین خدمتی"
- [ ] Persian description
- [ ] RTL layout

**Contact (/fa/contact)**
- [ ] Title: "تماس با من - حسین خدمتی | استخدام توسعه‌دهنده فرانت‌اند"
- [ ] Persian description
- [ ] RTL layout

## Browser Extension Tools

### Recommended Extensions

1. **SEO Meta in 1 Click** (Chrome/Firefox)
   - Quick view of all meta tags
   - Structured data viewer

2. **OpenGraph Preview** (Chrome)
   - Live preview of OG tags
   - Social media card simulation

3. **Lighthouse** (Chrome DevTools)
   - Built-in SEO audit
   - Performance metrics

4. **Wappalyzer** (Chrome/Firefox)
   - Detect technologies used
   - Verify Next.js version

## Success Metrics

### Week 1
- [ ] All pages indexed by Google
- [ ] Sitemap processed without errors
- [ ] No crawl errors in Search Console

### Month 1
- [ ] Ranking for brand name ("Hossein Khedmati")
- [ ] Impressions showing in Search Console
- [ ] Click-through rate > 2%

### Month 3
- [ ] Ranking on page 2-3 for "Frontend Developer Iran"
- [ ] Growing organic traffic
- [ ] Featured in related searches

### Month 6
- [ ] Page 1 ranking for primary keywords
- [ ] Rich snippets appearing
- [ ] Backlinks starting to build

## Support

If you encounter issues:

1. Check `SEO_IMPLEMENTATION.md` for detailed explanations
2. Review `SEO_CHANGES_SUMMARY.md` for what was changed
3. Verify all files are correctly placed
4. Test in production environment
5. Use browser DevTools to inspect HTML

---

**Remember:** SEO is a long-term strategy. Initial results may take 2-4 weeks. Consistent content updates and monitoring will improve rankings over time.
