<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-brand-row">
          <div class="footer-logo">
            <a title="CoinDesk homepage" href="/" class="footer-logo-link">
              <!-- CoinDesk SVG logo here -->
             <img src="../assets/coindesk-logo.avif" alt="coin desk logo" width="150px">
            </a>
          </div>
        </div>
        <div class="footer-divider-bar"></div>
        <div class="footer-main-grid">
          <div class="footer-about">
            <p class="footer-section-title">About</p>
            <ul class="footer-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/masthead">Masthead</a></li>
              <li><a target="_blank" href="https://bullish.wd3.myworkdayjobs.com/CoinDesk">Careers</a></li>
              <li><a href="/coindesk-news">CoinDesk News</a></li>
              <li><a href="https://developers.coindesk.com/documentation/data-api/introduction">Crypto API Documentation</a></li>
              <li><a target="_blank" href="https://data.coindesk.com/blogs">Blog</a></li>
            </ul>
          </div>
          <div class="footer-contact">
            <p class="footer-section-title">Contact</p>
            <ul class="footer-list">
              <li><a href="/contact-us">Contact Us</a></li>
              <li><a href="/accessibility-help">Accessibility</a></li>
              <li><a href="/advertise">Advertise</a></li>
              <li>
                <a href="/sitemap">Sitemap</a>
              </li>
              <li><a href="https://status.coindesk.com">System Status</a></li>
            </ul>
          </div>
          <div class="footer-disclaimer">
            <div class="footer-disclaimer-title">Disclosure &amp; Polices</div>
            <div class="footer-disclaimer-text">
              CoinDesk is an
              <a rel="noopener noreferrer" href="/business/2023/02/20/coindesk-wins-a-polk-award-a-top-journalism-prize-for-explosive-ftx-coverage">award-winning</a>
              media outlet that covers the cryptocurrency industry. Its journalists abide by a strict set of
              <a rel="noopener noreferrer" href="/ethics">editorial policies</a>.
              CoinDesk has adopted a set of principles aimed at ensuring the integrity, editorial independence and freedom from bias of its publications. CoinDesk is part of the Bullish group, which owns and invests in digital asset businesses and digital assets. CoinDesk employees, including journalists, may receive Bullish group equity-based compensation. Bullish was incubated by technology investor Block.one.
            </div>
            <div class="footer-disclaimer-links">
              <a href="/ethics">Ethics</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms of Use</a>
              <a>Cookie Settings</a>
              <a href="/privacy#dnsmpi">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
        <div class="footer-divider-bar"></div>
        <div class="footer-bottom">
          <div class="footer-bottom-left">
            <div class="footer-copyright">© 2025 CoinDesk, Inc.</div>
            <div class="footer-social">
              <!-- Social links SVGs here -->
            </div>
          </div>
          <div class="footer-bottom-right">
            <div class="footer-apps">
              <!-- App store and Google Play SVGs here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>


<style>
.footer {
  background: #fafafa;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.7rem 0 0.5rem 0;
  box-sizing: border-box;
  border-top: 1px solid #e5e7eb;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
  color: rgb(103, 103, 103);
  font-size: 12px;
  line-height: 18px;
}
.footer-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}
.footer-content {
  width: 100%;
  box-sizing: border-box;
}
.footer-brand-row {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
}
.footer-logo {
  display: flex;
  align-items: center;
}
.footer-logo-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.footer-divider-bar {
  width: 100%;
  height: 2px;
  background: #e5e7eb;
  margin: 0 0 2.5rem 0;
}
.footer-main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
@media (min-width: 900px) {
  .footer-main-grid {
    grid-template-columns: 1fr 1fr 2fr;
    gap: 2.5rem;
  }
}
.footer-about, .footer-contact, .footer-disclaimer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.footer-section-title {
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
}
.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-list li {
  font-size: 12px;
  color: rgb(103, 103, 103);
  margin-bottom: 0.4rem;
  line-height: 18px;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
}
.footer-list li a {
  color: rgb(103, 103, 103);
  text-decoration: none;
  transition: color 0.2s;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
}
.footer-list li a:hover {
  text-decoration: underline;
  color: #111;
}
.footer-disclaimer-title {
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.01em;
}
.footer-disclaimer-text {
  font-size: 12px;
  color: rgb(103, 103, 103);
  margin-bottom: 0.7rem;
  line-height: 18px;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
}
.footer-disclaimer-text a {
  color: #1a1a1a;
  text-decoration: underline;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
}
.footer-disclaimer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-bottom: 0.2rem;
}
.footer-disclaimer-links a {
  font-size: 12px;
  color: #1a1a1a;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
}
.footer-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}
@media (min-width: 900px) {
  .footer-bottom {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
}
.footer-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
@media (min-width: 600px) {
  .footer-bottom-left {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
  }
}
.footer-bottom-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
}
@media (min-width: 600px) {
  .footer-bottom-right {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
  }
}
.footer-copyright {
  font-size: 12px;
  color: rgb(103, 103, 103);
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
.footer-social {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
.footer-apps {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
/* Responsive tweaks for mobile spacing */
@media (max-width: 600px) {
  .footer-container {
    padding: 0 0.5rem;
  }
  .footer-main-grid {
    gap: 1.2rem;
    margin-bottom: 1.2rem;
  }
  .footer-bottom {
    gap: 1.2rem;
    margin-top: 1.2rem;
    padding-top: 1rem;
  }
}
</style>

