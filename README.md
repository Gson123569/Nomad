# Nomad Wealth Atlas

> **A comprehensive guide to wealth nomadism, international tax optimization, and jurisdictional arbitrage.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://pages.github.com/)

---

## Quick Start

### Deploy in 3 Minutes

1. **Fork this repository** or download the source code
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click Save
3. **Your site is live** at `https://yourusername.github.io/nomad-wealth-atlas/`

### Alternative: Netlify Drop

1. Download this repository as ZIP
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop the folder
4. Get instant HTTPS deployment

---

## Project Structure

```
nomad-wealth-atlas/
├── index.html              # Homepage
├── calculator.html         # Tax savings calculator
├── ai-transparency.html    # AI content disclosure
├── about.html              # About page
├── sources.html            # Data sources & methodology
├── now.html                # Current status / changelog
├── 01-escape.html          # Tier 1: Escape Routes
├── 02-foundations.html     # Tier 2: Foundations
├── 03-optimization.html    # Tier 3: Optimization
├── 04-preservation.html    # Tier 4: Preservation
├── 05-structures.html      # Tier 5: Structures
├── 06-vehicles.html        # Tier 6: Vehicles
├── 07-legacy.html          # Tier 7: Legacy
├── 08-civilization.html    # Tier 8: Civilization
├── assets/
│   ├── css/
│   │   └── main.css        # Complete stylesheet (~15KB)
│   └── js/
│       └── app.js          # Interactive features (~12KB)
└── README.md               # This file
```

---

## Customize

### 1. Brand Identity

Edit these elements in each HTML file:

```html
<!-- Logo text -->
<div class="logo">
  <span class="logo-icon">N</span>
  <span>Nomad Wealth Atlas</span>
</div>

<!-- Footer -->
<footer class="footer">
  <p>&copy; 2024 Nomad Wealth Atlas. All rights reserved.</p>
</footer>
```

### 2. Affiliate Links

Replace placeholder links throughout the site:

```html
<!-- Example: Replace with your affiliate links -->
<a href="YOUR-AFFILIATE-LINK" class="btn btn-primary">
  Open Account
</a>
```

**Recommended affiliate programs:**
- Interactive Brokers (trading accounts)
- Wise (multi-currency accounts)
- Revolut Business (banking)
- Various offshore service providers

### 3. Color Scheme

Edit CSS variables in `assets/css/main.css`:

```css
:root {
  --color-accent-primary: #4F46E5;    /* Change primary color */
  --color-success: #10B981;            /* Change success color */
  --color-warning: #F59E0B;            /* Change warning color */
}
```

### 4. Typography

Change fonts by updating the Google Fonts import in HTML `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update in CSS:

```css
:root {
  --font-primary: 'Your Font', sans-serif;
}
```

---

## Monetization Setup

### Cryptocurrency Wallet Addresses

Add your wallet addresses for donations/tips:

```html
<!-- In footer or dedicated support page -->
<div class="crypto-wallets">
  <p><strong>Bitcoin:</strong> bc1qyouraddresshere</p>
  <p><strong>Ethereum:</strong> 0xYourEthereumAddress</p>
  <p><strong>Monero:</strong> 4YourMoneroAddress</p>
</div>
```

### Recommended Monetization Strategies

1. **Affiliate Marketing**
   - Offshore banking services
   - Tax residency programs
   - Investment platforms
   - Legal/consulting services

2. **Premium Content**
   - Create a `/premium/` folder
   - Add password protection via `.htaccess` or JavaScript
   - Sell access to detailed guides

3. **Consulting Bookings**
   - Add Calendly or similar booking widget
   - Offer 1-on-1 jurisdictional strategy sessions

4. **Newsletter**
   - Integrate Substack, Beehiiv, or ConvertKit
   - Build email list for updates

---

## Content Update Guide

### Editing Tax Data

Tax rates and regulations are embedded directly in HTML for easy editing:

```html
<!-- Example: Update country tax rate -->
<tr>
  <td>United Arab Emirates</td>
  <td class="rate rate-low">0%</td>
  <td>No personal income tax</td>
</tr>
```

### Adding New Jurisdictions

1. Find the comparison table in the relevant tier page
2. Add a new row:

```html
<tr>
  <td>Country Name</td>
  <td class="rate rate-low">0%</td>
  <td>Brief description</td>
  <td><span class="badge badge-success">Recommended</span></td>
</tr>
```

### Updating Acronym Tooltips

Tooltips are defined inline with `data-tooltip` attributes:

```html
<span class="tooltip" data-tooltip="Non-Habitual Resident - Portuguese tax regime">
  NHR
</span>
```

**Available acronyms (pre-configured):**
- NHR, CFC, SFO, AEO, UHNW, OECD, CRS, FATCA
- PE, IP, GAAR, DTT, EU, UAE, ADGM, DIFC
- PIF, ADIA, SWF, FEIE

### Adding New Pages

1. Copy an existing tier page (e.g., `01-escape.html`)
2. Rename to your new page (e.g., `09-newtopic.html`)
3. Update:
   - `<title>` tag
   - Page heading (`<h1>`)
   - Navigation links (add to header nav)
   - Content sections

---

## ACRONYM REFERENCE

| Acronym | Full Name | Tooltip Text |
|---------|-----------|--------------|
| NHR | Non-Habitual Resident | Portuguese tax regime offering foreign income exemptions for 10 years |
| CFC | Controlled Foreign Corporation | Rules taxing undistributed profits of foreign subsidiaries |
| SFO | Single Family Office | Private wealth management firm for one family |
| AEO | Authorized Economic Operator | Customs certification for secure supply chains |
| UHNW | Ultra High Net Worth | Individuals with $30M+ in investable assets |
| OECD | Organisation for Economic Co-operation and Development | International organization setting tax standards |
| CRS | Common Reporting Standard | Automatic exchange of financial account information |
| FATCA | Foreign Account Tax Compliance Act | US law requiring foreign banks to report US accounts |
| PE | Permanent Establishment | Taxable business presence in a jurisdiction |
| IP | Intellectual Property | Intangible assets like patents, trademarks, copyrights |
| GAAR | General Anti-Avoidance Rule | Broad legislation to counter tax avoidance |
| DTT | Double Taxation Treaty | Agreement preventing double taxation between countries |
| EU | European Union | Political and economic union of 27 European countries |
| UAE | United Arab Emirates | Gulf federation with zero personal income tax |
| ADGM | Abu Dhabi Global Market | International financial center in Abu Dhabi |
| DIFC | Dubai International Financial Centre | Dubai's independent financial jurisdiction |
| PIF | Public Investment Fund | Saudi Arabia's sovereign wealth fund |
| ADIA | Abu Dhabi Investment Authority | Abu Dhabi's sovereign wealth fund |
| SWF | Sovereign Wealth Fund | State-owned investment fund |
| FEIE | Foreign Earned Income Exclusion | US tax exclusion for overseas earnings |

---

## Technical Specifications

### Performance Targets

- **Lighthouse Score**: 100/100/100/100
- **CSS Size**: ~15KB (gzipped)
- **JS Size**: ~12KB (gzipped)
- **No Build Step**: Pure HTML/CSS/JS
- **All Paths Relative**: Works on any domain

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Accessibility (WCAG 2.1 AA)

- Keyboard navigation support
- Screen reader compatible
- Color contrast ratio ≥ 4.5:1
- Reduced motion support
- Focus indicators visible

---

## Customization Examples

### Change Hero Section

```html
<section class="hero">
  <div class="container">
    <h1 class="hero-title">Your Custom Title</h1>
    <p class="hero-subtitle">Your custom description</p>
    <div class="hero-cta">
      <a href="calculator.html" class="btn btn-primary btn-lg">
        Your CTA Button
      </a>
    </div>
  </div>
</section>
```

### Add Custom Calculator Presets

Edit `assets/js/app.js`:

```javascript
const presets = {
  'tech-exec': { wealth: 50000000, rate: 37 },
  'crypto-whale': { wealth: 100000000, rate: 20 },
  'family-office': { wealth: 500000000, rate: 40 }
};
```

### Custom Comparison Table

```html
<div class="table-container">
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Jurisdiction</th>
        <th>Corporate Tax</th>
        <th>Personal Tax</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Your Country</td>
        <td class="rate rate-low">0%</td>
        <td class="rate rate-low">0%</td>
        <td><span class="badge badge-success">Excellent</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## SEO Optimization

### Meta Tags Template

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Nomad Wealth Atlas</title>
  <meta name="description" content="Unique description for this page (150-160 chars)">
  <meta name="keywords" content="wealth nomadism, tax optimization, international">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Page Title | Nomad Wealth Atlas">
  <meta property="og:description" content="Page description">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yoursite.com/page.html">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Page description">
</head>
```

---

## Troubleshooting

### Common Issues

**Calculator not working?**
- Check that `app.js` is loaded after the DOM
- Verify element IDs match in HTML and JS

**Tooltips not appearing?**
- Ensure `data-tooltip` attribute is present
- Check CSS is properly linked

**Mobile menu not toggling?**
- Verify `.mobile-nav-toggle` and `.mobile-nav` classes exist
- Check that `app.js` is loaded

**Styles not applying?**
- Confirm `main.css` path is correct (`./assets/css/main.css`)
- Check browser console for 404 errors

---

## License

MIT License - feel free to use, modify, and distribute.

**Attribution appreciated but not required.**

---

## Support

For questions or issues:

1. Check this README first
2. Review the code comments in `main.css` and `app.js`
3. Open an issue on GitHub

---

## Changelog

### v1.0.0 (2024)
- Initial release
- 14 complete pages
- Tax savings calculator
- Responsive design
- WCAG 2.1 AA compliant

---

**Built with care for the global wealth nomad community.**
