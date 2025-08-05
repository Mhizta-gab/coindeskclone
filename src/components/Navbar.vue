<script setup>
import { ref } from 'vue'
import navLinks from './navLinks.js'


const isMobileMenuOpen = ref(false)

import { watch } from 'vue'
// Prevent body scroll when side nav is open
watch(isMobileMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
})
const isSearchModalOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const topCoins = ref([])
const showTopCoins = ref(true)
const dropdownOpen = ref(null)
// Side nav state
const sideNavPanel = ref('main') // 'main' or label of subnav
const sideNavSubLinks = ref([])
const sideNavSubTitle = ref('')

// Enhanced nav items (main + all required)
const sideNavLinks = [
  { label: 'News', sublinks: [
    { label: 'Markets', href: '#' },
    { label: 'Finance', href: '#' },
    { label: 'Tech', href: '#' },
    { label: 'Policy', href: '#' },
    { label: 'Focus', href: '#' },
  ] },
  { label: 'Prices', href: '#' },
  { label: 'Data', sublinks: [
    { label: 'Market Data', href: '#' },
    { label: 'On-Chain Data', href: '#' },
    { label: 'DeFi Data', href: '#' },
  ] },
  { label: 'Indices', sublinks: [
    { label: 'Bitcoin Index', href: '#' },
    { label: 'Ethereum Index', href: '#' },
    { label: 'DeFi Index', href: '#' },
  ] },
  { label: 'Research', href: '#' },
  { label: 'Events', sublinks: [
    { label: 'CoinDesk: Policy & Regulation', href: '#' },
    { label: 'Consensus Hong Kong', href: '#' },
    { label: 'Consensus Miami', href: '#' },
  ] },
  { label: 'Sponsored', sublinks: [
    { label: 'Sponsored Content', href: '#' },
    { label: 'Partner Content', href: '#' },
  ] },
  { label: 'Videos', sublinks: [
    { label: 'All Videos', href: '#' },
    { label: 'Explainers', href: '#' },
    { label: 'Interviews', href: '#' },
  ] },
  { label: 'Podcasts', sublinks: [
    { label: 'All Podcasts', href: '#' },
    { label: 'Markets Daily', href: '#' },
    { label: 'Opinionated', href: '#' },
  ] },
  { label: 'Newsletters', sublinks: [
    { label: 'All Newsletters', href: '#' },
    { label: 'Crypto Long & Short', href: '#' },
    { label: 'State of Crypto', href: '#' },
  ] },
]

function openSideNavSubPanel(link) {
  sideNavPanel.value = link.label
  sideNavSubLinks.value = link.sublinks
  sideNavSubTitle.value = link.label
}
function closeSideNavSubPanel() {
  sideNavPanel.value = 'main'
  sideNavSubLinks.value = []
  sideNavSubTitle.value = ''
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

async function openSearchModal() {
  isSearchModalOpen.value = true
  searchQuery.value = ''
  searchResults.value = []
  showTopCoins.value = true
  // Prevent page scroll when modal is open
  document.body.style.overflow = 'hidden';
  // Fetch top 5 coins by market cap
  isLoading.value = true
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false')
    const data = await res.json()
    topCoins.value = data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      thumb: coin.image,
      price: coin.current_price
    }))
  } catch (e) {
    topCoins.value = []
  } finally {
    isLoading.value = false
  }
}

function closeSearchModal() {
  isSearchModalOpen.value = false
  // Restore page scroll
  document.body.style.overflow = '';
}

function openDropdown(label) {
  dropdownOpen.value = label
}
function closeDropdown() {
  dropdownOpen.value = null
}

async function fetchCoinSearch() {
  if (!searchQuery.value) {
    searchResults.value = []
    showTopCoins.value = true
    return
  }
  isLoading.value = true
  showTopCoins.value = false
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery.value}`)
    const data = await res.json()
    // Get price for each coin (limit to 10 for performance)
    const coins = data.coins.slice(0, 10)
    let priceData = {}
    if (coins.length > 0) {
      const priceRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.map(c => c.id).join(',')}&vs_currencies=usd`)
      priceData = await priceRes.json()
    }
    searchResults.value = coins.map(coin => ({
      ...coin,
      price: priceData[coin.id]?.usd ?? 'N/A'
    }))
  } catch (e) {
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <nav class="navbar">

      <!-- Mobile Navbar Layout -->
      <div class="navbar-mobile-row">
        <div class="navbar-mobile-left">
          <button class="hamburger" @click="toggleMobileMenu" aria-label="Toggle navigation">
            <span :class="{'open': isMobileMenuOpen}"></span>
            <span :class="{'open': isMobileMenuOpen}"></span>
            <span :class="{'open': isMobileMenuOpen}"></span>
          </button>
          <span class="search-icon" aria-label="Search" @click="openSearchModal">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#757070" stroke-width="2"/>
              <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#757070" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        </div>
        <div class="navbar-mobile-center">
          <a href="https://coindesk.com" target="_blank">
            <img src="../assets/coindesk-logo.avif" width="120px" class="logo" alt="Coindesk logo" />
          </a>
        </div>
        <div class="navbar-mobile-right">
          <a href="" class="sign-in-btn">Sign In</a>
        </div>
      </div>

      <!-- Desktop Navbar: Hamburger and Logo (visible on desktop) -->
      <div class="navbar-desktop-left">
        <button class="hamburger desktop-hamburger" @click="toggleMobileMenu" aria-label="Toggle navigation">
          <span :class="{'open': isMobileMenuOpen}"></span>
          <span :class="{'open': isMobileMenuOpen}"></span>
          <span :class="{'open': isMobileMenuOpen}"></span>
        </button>
        <a href="https://coindesk.com" target="_blank" class="desktop-logo-link">
          <img src="../assets/coindesk-logo.avif" width="170px" class="logo desktop-logo" alt="Coindesk logo" />
        </a>
      </div>

      <!-- Desktop Navbar (unchanged) -->
      <div class="right-desktop">
        <div class="nav-links">
          <template v-for="link in navLinks" :key="link.label">
            <div
              v-if="link.sublinks"
              class="nav-link-dropdown"
              @mouseenter="openDropdown(link.label)"
              @mouseleave="closeDropdown"
            >
              <a
                :href="link.href"
                class="nav-link has-dropdown"
                :class="{active: dropdownOpen === link.label}"
              >
                {{ link.label }}
              </a>
              <div
                class="dropdown-menu"
                v-if="dropdownOpen === link.label"
                style="pointer-events: auto;"
                @mouseenter="openDropdown(link.label)"
                @mouseleave="closeDropdown"
              >
                <div class="dropdown-header-row">
                  <span class="dropdown-header-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 0H0V32H32V0Z" fill="white"/>
                      <path d="M16.2032 17.2004C16.7404 17.2004 17.1758 16.7643 17.1758 16.2265C17.1758 15.6886 16.7404 15.2526 16.2032 15.2526C15.666 15.2526 15.2305 15.6886 15.2305 16.2265C15.2305 16.7643 15.666 17.2004 16.2032 17.2004Z" fill="black"/>
                      <path d="M22.0196 17.2004C22.5568 17.2004 22.9922 16.7643 22.9922 16.2265C22.9922 15.6886 22.5568 15.2526 22.0196 15.2526C21.4824 15.2526 21.0469 15.6886 21.0469 16.2265C21.0469 16.7643 21.4824 17.2004 22.0196 17.2004Z" fill="black"/>
                      <path d="M22.0196 23.0347C22.5568 23.0347 22.9922 22.5987 22.9922 22.0608C22.9922 21.5229 22.5568 21.0869 22.0196 21.0869C21.4824 21.0869 21.0469 21.5229 21.0469 22.0608C21.0469 22.5987 21.4824 23.0347 22.0196 23.0347Z" fill="black"/>
                      <path d="M23.9179 10.0145C23.8411 8.94761 22.9868 8.08258 21.9212 8.00569C21.2397 7.95764 20.6253 8.21714 20.1934 8.65927C19.867 8.99566 19.4254 9.1975 18.9551 9.1975H18.7823C18.3023 9.1975 17.8511 8.99566 17.5152 8.64965C17.1216 8.24598 16.5744 8.00569 15.9697 8.00569C15.3649 8.00569 14.8178 8.25559 14.4242 8.64965C14.0882 8.99566 13.637 9.1975 13.1571 9.1975H12.9939C12.5235 9.1975 12.0724 9.01489 11.746 8.67849C11.6788 8.61121 11.6116 8.54393 11.5444 8.48626C10.7285 7.82308 9.52855 7.8423 8.74141 8.54393C7.79108 9.38012 7.75268 10.841 8.63581 11.7253C8.64541 11.7349 8.65501 11.7445 8.66461 11.7541C9.01019 12.0809 9.19257 12.5423 9.19257 13.0132V13.1766C9.19257 13.6572 8.99099 14.1089 8.64541 14.4453C8.24224 14.8394 8.00226 15.3872 8.00226 15.9927C8.00226 16.5983 8.25184 17.1461 8.64541 17.5402C8.99099 17.8766 9.19257 18.3283 9.19257 18.8089V19.0299C9.19257 19.5009 8.99099 19.943 8.65501 20.2698C8.23264 20.6831 7.97346 21.2694 8.00226 21.9133C8.05026 23.0475 8.97179 23.9606 10.0949 23.999C10.7477 24.0182 11.3332 23.7587 11.746 23.3262C12.0724 22.9898 12.5139 22.7784 12.9843 22.7784H13.1667C13.637 22.7784 14.0786 22.9802 14.405 23.3262C14.837 23.7779 15.4609 24.0374 16.1425 23.9894C17.208 23.9125 18.0719 23.0475 18.1487 21.971C18.2351 20.6927 17.2368 19.6354 15.9793 19.6354C15.3841 19.6354 14.837 19.8757 14.4434 20.2698C14.1074 20.6062 13.6562 20.808 13.1859 20.808H12.9843C12.5139 20.808 12.0532 20.6254 11.7172 20.2794C11.7076 20.2698 11.7076 20.2698 11.698 20.2602C11.3524 19.9238 11.1508 19.472 11.1508 18.9915V18.7993C11.1508 18.3187 11.3524 17.867 11.698 17.5306C12.1012 17.1365 12.3411 16.5886 12.3411 15.9831C12.3411 15.3776 12.0916 14.8298 11.698 14.4357C11.3524 14.0993 11.1508 13.6476 11.1508 13.167V12.994C11.1508 12.5134 11.3524 12.0617 11.6884 11.7253C11.698 11.7157 11.698 11.7157 11.7076 11.7061C11.7172 11.6965 11.7172 11.6965 11.7268 11.6868C12.0628 11.3504 12.5139 11.1486 12.9939 11.1486H13.1667C13.6466 11.1486 14.0978 11.3504 14.4338 11.6965C14.8274 12.1001 15.3745 12.3404 15.9793 12.3404C16.584 12.3404 17.1312 12.0905 17.5248 11.6965C17.8607 11.3504 18.3119 11.1486 18.7919 11.1486H18.9455C19.4254 11.1486 19.8766 11.3504 20.2126 11.6965C20.6061 12.1001 21.1533 12.3404 21.7581 12.3404C23.006 12.35 24.0043 11.2928 23.9179 10.0145Z" fill="black"/>
                    </svg>
                  </span>
                  <span class="dropdown-header-title">{{ link.dropdownTitle || link.label }}</span>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-links-row">
                  <a v-for="sublink in link.sublinks" :key="sublink.label" :href="sublink.href" class="dropdown-link-item">
                    <div class="dropdown-link-label">{{ sublink.label }}</div>
                    <div class="dropdown-link-desc">{{ sublink.description }}</div>
                  </a>
                </div>
              </div>
            </div>
            <a v-else :href="link.href" class="nav-link">{{ link.label }}</a>
          </template>
        </div>
        <div class="register">
          <span class="search-icon" aria-label="Search" @click="openSearchModal">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="7" stroke="#757070" stroke-width="2"/>
              <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#757070" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <a href="">Sign In</a>
          <a class="sign-up" href="">Sign Up</a>
        </div>
      </div>


    </nav>

    <!-- Side drawer for mobile and desktop -->
    <div :class="['side-drawer', { 'open': isMobileMenuOpen }]">
      <!-- Main panel -->
      <div class="side-nav-panel" :class="{ 'slide-out': sideNavPanel !== 'main' }">
        <div class="side-nav-links side-nav-scroll">
          <template v-for="link in sideNavLinks" :key="link.label">
            <div v-if="link.sublinks" class="side-nav-link-group">
              <button class="side-nav-link-btn" @click="openSideNavSubPanel(link)">
                <span class="side-nav-link-label">{{ link.label }}</span>
                <svg class="side-nav-arrow right-arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7l3 3-3 3" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div v-else>
              <a :href="link.href" class="side-nav-link"><span class="side-nav-link-label">{{ link.label }}</span></a>
            </div>
          </template>
        </div>
        <!-- Side nav: removed search icon, sign in, and sign up as requested -->
      </div>

      <!-- Sub panel (slides in from right) -->
      <div v-if="sideNavPanel !== 'main'" class="side-nav-panel sub-panel slide-in">
        <button class="side-nav-back-btn" @click="closeSideNavSubPanel">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16l-4-4 4-4" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Back to menu</span>
        </button>
        <div class="side-nav-sub-title">{{ sideNavSubTitle }}</div>
        <ul class="side-nav-sublinks">
          <li v-for="sublink in sideNavSubLinks" :key="sublink.label">
            <a :href="sublink.href" class="side-nav-sublink">{{ sublink.label }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Overlay for side nav (now after side-drawer) -->
    <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="toggleMobileMenu"></div>

    <!-- Modal Search UI -->
    <div v-if="isSearchModalOpen" class="search-modal-bg">
      <div class="search-modal">
        <div class="search-input-row">
          <div class="search-input-wrapper">
            <span class="search-input-icon">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="7" stroke="#F7D307" stroke-width="2"/>
                <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#F7D307" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              @input="fetchCoinSearch"
              class="search-input-pill"
              type="text"
              placeholder="Search all assets or news articles"
              autofocus
            />
          </div>
          <button class="close-modal-inline" @click="closeSearchModal" aria-label="Close">&times;</button>
        </div>
        <div class="search-modal-content">
          <div class="search-section-header">Assets</div>
          <div v-if="isLoading" class="search-loading">Searching...</div>
          <ul v-if="!isLoading && showTopCoins && topCoins.length" class="search-results">
            <li v-for="coin in topCoins" :key="coin.symbol" class="search-result-item">
              <img :src="coin.thumb" :alt="coin.name" class="coin-thumb" />
              <span class="coin-name">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</span>
              <span class="coin-price mono">${{ coin.price }}</span>
            </li>
          </ul>
          <ul v-if="!isLoading && !showTopCoins && searchResults.length" class="search-results">
            <li v-for="coin in searchResults" :key="coin.symbol" class="search-result-item">
              <img :src="coin.thumb" :alt="coin.name" class="coin-thumb" />
              <span class="coin-name">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</span>
              <span class="coin-price mono">${{ coin.price }}</span>
            </li>
          </ul>
          <div v-if="!isLoading && !showTopCoins && searchQuery && searchResults.length === 0" class="search-no-results">No results found.</div>
          <div class="search-section-header news-header">
            News
            <a href="#" class="see-more">See more</a>
          </div>
          <div class="search-news-placeholder">Credit Agricole's Asset Servicing Unit Backs Tokenized SME Exchange</div>
        </div>
      </div>
    </div>

  </div>
</template>



<style scoped>
/* --- CoinDesk-style Search Modal --- */
.search-modal-bg {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 100px);
  background: rgba(30, 32, 36, 0.45);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  backdrop-filter: blur(6px);
  transition: background 0.3s;
  overflow-y: auto;
}
.search-modal {
  margin: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 8px 32px rgba(30,32,36,0.18), 0 1.5px 6px rgba(247,211,7,0.08);
  max-width: 680px;
  width: 95vw;
  height: 380px;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem 1.2rem 2rem;
  position: relative;
  animation: modalClipReveal 1s cubic-bezier(.4,0,.2,1);
  animation-delay: 0.18s;
  animation-fill-mode: both;
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.2rem;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  border-radius: 15px;
  border: 1px solid #b0b0b0;
  padding: 0.1rem 1.1rem;
  flex: 1 1 auto;
  transition: border 0.2s;
  height: 44px;
}

.search-input-wrapper:focus-within {
  border: 5px solid #F7D307;
}
.search-input-icon {
  display: flex;
  align-items: center;
  margin-right: 0.6rem;
  color: #b0b0b0;
}
.search-input-pill {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0.2rem 0 0.2rem 0;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  color: rgb(17, 24, 28);
  font-weight: 400;
  font-size: 1.08rem;
  line-height: 22px;
  font-style: normal;
  letter-spacing: 0.01em;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
}
.search-input-pill::placeholder {
  color: #b0b0b0;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 1.08rem;
  font-weight: 400;
  line-height: 22px;
  font-style: normal;
}
.close-modal-inline {
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  margin-left: 0.7rem;
  line-height: 1;
  transition: color 0.2s;
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-modal-inline:hover {
  color: #222;
}
.search-modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}
.search-section-header {
  font-size: 1.08rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.2rem;
  margin-top: 0.5rem;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.news-header {
  margin-top: 1.2rem;
  border-top: 1px solid #eee;
  padding-top: 0.7rem;
}
.see-more {
  font-size: 0.98rem;
  color: #222;
  text-decoration: underline;
  margin-left: 0.5rem;
}
.search-news-placeholder {
  font-size: 1.01rem;
  color: #222;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.search-loading {
  text-align: center;
  color: #4f8cff;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
}
/* Search result item: clean, no box, subtle hover underline */
.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.5rem 0.2rem 0.5rem 0;
  border-radius: 0;
  border: none;
  background: none;
  transition: background 0.12s;
  cursor: pointer;
  font-size: 1.01rem;
  box-shadow: none;
  border-bottom: 1px solid #f3f3f3;
}
.search-result-item:last-child {
  border-bottom: none;
}
.search-result-item:hover {
  background: none;
}
.search-result-item:hover .coin-name {
  text-decoration: underline;
}
.coin-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  object-fit: contain;
  border: none;
  margin-right: 0.5rem;
}
.coin-name {
  font-weight: 600;
  color: #222;
  font-size: 1.01rem;
  margin-right: 0.2rem;
}
.coin-symbol {
  color: #b0b0b0;
  font-size: 0.98rem;
  font-weight: 500;
  margin-left: 0.1rem;
}
/* Coin price and profit/loss: dmMono, 12px, 400, rgb(17,24,28), 14px line height */
.coin-price {
  margin-left: auto;
  font-family: dmMono, "dmMono Fallback", monospace;
  font-size: 8px;
  font-weight: 200;
  color: rgb(17, 24, 28);
  line-height: 10px;
  min-width: 70px;
  text-align: right;
  letter-spacing: 0.01em;
}
.mono {
  font-family: dmMono, "dmMono Fallback", monospace;
  font-size: 8px;
  font-weight: 200;
  color: rgb(17, 24, 28);
  line-height: 14px;
}
.coin-change {
  min-width: 56px;
  text-align: right;
  font-size: 0.98rem;
  font-weight: 600;
  margin-left: 0.7rem;
}
.coin-change.positive {
  color: #1ca75d;
}
.coin-change.negative {
  color: #e03a1c;
}
.search-no-results {
  text-align: center;
  color: #b0b0b0;
  font-size: 1.08rem;
  margin-top: 1.2rem;
}

.side-nav-link-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  outline: none;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: rgb(17, 24, 28);
  line-height: 32px;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s;
  text-align: left;
}
.side-nav-link-btn:hover, .side-nav-link-btn:focus {
  background: #f5f5f5;
}
.side-nav-link-label {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: rgb(17, 24, 28);
  line-height: 32px;
  letter-spacing: 0.01em;
}
.side-nav-link {
  display: block;
  width: 100%;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  color: rgb(17, 24, 28);
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  line-height: 32px;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.15s;
  text-align: left;
}
.side-nav-link:hover {
  background: #f5f5f5;
  box-shadow: 0 1px 4px rgba(247,211,7,0.04);
  transition: border 0.2s;
  position: relative;
}

.search-input-wrapper:focus-within {
  border: 2px solid #F7D307;
}
.search-input-icon {
  display: flex;
  align-items: center;
  margin-right: 0.6rem;
  color: #b0b0b0;
}
.search-input-pill {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0.2rem 0 0.2rem 0;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  color: rgb(17, 24, 28);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  font-style: normal;
  letter-spacing: 0.01em;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
}
.search-input-pill::placeholder {
  color: rgb(54, 56, 58);
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  font-style: normal;
}

.search-modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}
.search-section-header {
  font-size: 1.08rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.2rem;
  margin-top: 0.5rem;
}
.news-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  border-top: 1px solid #eee;
  padding-top: 0.7rem;
}
.see-more {
  font-size: 0.98rem;
  color: #222;
  text-decoration: underline;
  margin-left: 0.5rem;
}
.search-news-placeholder {
  font-size: 1.01rem;
  color: #222;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}



.close-modal-inline {
  background: none;
  border: none;
  font-size: 1.7rem;
  color: #888;
  cursor: pointer;
  margin-left: 0.7rem;
  line-height: 1;
  transition: color 0.2s;
}
.close-modal-inline:hover {
  color: #222;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.search-input:focus {
  border: 1.5px solid #4f8cff;
  box-shadow: 0 0 0 2px #e3f0ff;
}

.search-loading {
  text-align: center;
  color: #4f8cff;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
}
.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 0.5rem;
  border-radius: 8px;
  transition: background 0.18s;
  cursor: pointer;
}
.search-result-item:hover {
  background: #f5f8ff;
}
.coin-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f2f2f2;
  object-fit: contain;
  border: 1px solid #e0e0e0;
}
.coin-name {
  font-weight: 500;
  color: #222;
  font-size: 1.05rem;
}
.coin-price {
  margin-left: auto;
  font-weight: 600;
  color: #4f8cff;
  font-size: 1.04rem;
}
.search-no-results {
  text-align: center;
  color: #b0b0b0;
  font-size: 1.08rem;
  margin-top: 1.2rem;
}

/*  */
.close-modal {
  position: absolute;
  top: 0.7rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.search-input {
  padding: 0.7rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}
.search-loading {
  text-align: center;
  color: #888;
  margin-bottom: 1rem;
}
.search-results {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
}
.search-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.coin-thumb {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f5f5f5;
}
.coin-name {
  flex: 1;
  font-weight: 500;
}
.coin-price {
  font-weight: 600;
  color: #222;
}
.search-no-results {
  text-align: center;
  color: #888;
  margin-top: 1rem;
}


@keyframes modalClipReveal {
  0% {
    opacity: 0;
    clip-path: inset(-30% -30% -30% -30% round 18px);
  }
  60% {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0% round 18px);
  }
  100% {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0% round 18px);
  }
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: none; }
}
.search-modal-bg {
  animation: fadeInBg 0.32s cubic-bezier(.4,0,.2,1);
}

@keyframes fadeInBg {
  from { opacity: 0; }
  to { opacity: 1; }
}
.search-modal {
  animation: modalClipReveal 1s cubic-bezier(.4,0,.2,1);
  animation-delay: 0.18s;
  animation-fill-mode: both;
}
</style >


<style scoped>
.read-the-docs {
  color: #888;
}

a {
  text-decoration: none;
  color: rgb(17, 24, 28);
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  font-style: normal;
}

.sign-up {
  background: rgb(247, 211, 7);
  padding: 0.5rem;
  color: rgb(13, 16, 17);
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  font-style: normal;
  border-radius: 4px;
}

/* --- Desktop Navbar Left: Hamburger and Logo --- */
.navbar-desktop-left {
  display: none;
  align-items: center;
  gap: 1.5rem;
}
.desktop-logo-link {
  display: flex;
  align-items: center;
}
.desktop-logo {
  width: 170px !important;
  height: auto;
  display: block;
}
.desktop-hamburger {
  display: none;
}

@media (min-width: 901px) {
  .navbar-desktop-left {
    display: flex;
    margin-right: 1.5rem;
  }
  .desktop-hamburger {
    display: flex;
    margin-right: 0.5rem;
  }
  .logo {
    width: 170px !important;
  }
}

@media (max-width: 900px) {
  .navbar-desktop-left {
    display: none;
  }
  .desktop-hamburger {
    display: none;
  }
  .desktop-logo-link {
    display: none;
  }
}

/* --- Mobile Navbar Layout --- */
.navbar-mobile-row {
  display: none;
}
.navbar-mobile-left,
.navbar-mobile-center,
.navbar-mobile-right {
  display: flex;
  align-items: center;
}
.navbar-mobile-left {
  gap: 0.7rem;
}
.navbar-mobile-center {
  flex: 1 1 auto;
  justify-content: center;
}
.navbar-mobile-right {
  justify-content: flex-end;
  min-width: 70px;
}
.sign-in-btn {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #111;
  background: none;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .navbar-mobile-row {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    min-height: 56px;
    background: #fff;
    border-bottom: 0.3px solid rgb(226, 226, 226);
    position: relative;
    z-index: 999;
  }
  .navbar-mobile-left {
    min-width: 90px;
    gap: 0.7rem;
  }
  .navbar-mobile-center {
    flex: 1 1 auto;
    justify-content: center;
  }
  .navbar-mobile-right {
    min-width: 70px;
    justify-content: flex-end;
  }
  .logo {
    width: 120px !important;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  .navbar {
    padding: 0;
    min-height: 56px;
    border: none;
  }
}

@media (min-width: 901px) {
  .navbar-mobile-row {
    display: none;
  }
}


/* Desktop navbar right section: horizontal layout */
.right-desktop {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
.right-desktop .nav-links {
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
}
.right-desktop .register {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

/* Hide .right-desktop on mobile, show on desktop */
@media (max-width: 900px) {
  .right-desktop {
    display: none;
  }
}
@media (min-width: 901px) {
  .right-desktop {
    display: flex;
  }
}


/* Side drawer styles (for both mobile and desktop) */
.side-drawer {
  position: fixed;
  top: 102px; /* Height of navbar + LivePrices (adjust as needed) */
  left: -100vw;
  height: calc(100vh - 102px);
  width: 70vw;
  max-width: 320px;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0,0,0,0.08);
  z-index: 100;
  transition: left 0.3s ease;
  display: flex;
  overflow: hidden;
}
.side-drawer.open {
  left: 0;
}

.side-nav-panel {
  position: absolute;
  top: 8vh;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.32s cubic-bezier(.4,0,.2,1);
  z-index: 2;
}
.side-nav-panel.slide-out {
  transform: translateX(-100%);
}
.side-nav-panel.sub-panel {
  left: 0;
  z-index: 3;
  box-shadow: -2px 0 8px rgba(0,0,0,0.04);
  background: #ffffff;
}
.side-nav-panel.slide-in {
  animation: sidePanelIn 0.32s cubic-bezier(.4,0,.2,1);
  left: 0;
}
@keyframes sidePanelIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.side-nav-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #222;
  font-size: 1.08rem;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-weight: 500;
  padding: 1.2rem 1.5rem 0.5rem 1.5rem;
  cursor: pointer;
}
.side-nav-sub-title {
  font-size: 1.08rem;
  font-weight: 700;
  color: #222;
  padding: 1.1rem 1.5rem 0.7rem 1.5rem;
  letter-spacing: 0.01em;
}

.side-nav-links {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0;
}
.side-nav-scroll {
  flex: 1 1 auto;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  min-height: 0;
  scrollbar-width: thin;
}
.side-nav-link-group {
  width: 100%;
}
.side-nav-link-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  outline: none;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 1.08rem;
  font-weight: 700;
  color: #111;
  padding: 1.1rem 1.5rem 1.1rem 1.5rem;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s;
  text-align: left;
}
.side-nav-link-btn:hover, .side-nav-link-btn:focus {
  background: #f5f5f5;
}
.side-nav-link-label {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111;
  letter-spacing: 0.01em;
}
.side-nav-arrow {
  margin-left: 0.5rem;
  transition: transform 0.2s;
  min-width: 18px;
  min-height: 18px;
}
.right-arrow {
  transform: rotate(0deg);
}

.side-nav-sublinks {
  list-style: none;
  margin: 0;
  padding: 0;
  background: none;
}
.side-nav-sublink {
  display: block;
  padding: 0.85rem 1.5rem 0.85rem 1.5rem;
  font-size: 1.01rem;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-weight: 400;
  color: #111;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.15s, color 0.15s;
  margin: 0;
  background: none;
  letter-spacing: 0.01em;
  text-align: left;
}
.side-nav-sublink:hover,
.side-nav-sublink.active {
  background: #f5f5f5;
  color: #111;
}
.side-nav-sublink:focus {
  background: #f5f5f5;
  outline: none;
}
.side-nav-link {
  display: block;
  width: 100%;
  padding: 1.1rem 1.5rem 1.1rem 1.5rem;
  font-size: 1.08rem;
  font-weight: 700;
  color: #111;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.15s;
  text-align: left;
}
.side-nav-link:hover {
  background: #f5f5f5;
}
@media (min-width: 901px) {
  .side-drawer {
    width: 320px;
    left: -320px;
    top: 112px;
    height: calc(100vh - 112px);
    max-width: 320px;
  }
  .side-drawer.open {
    left: 0;
  }
}
@media (max-width: 900px) {
  .side-drawer {
    width: 100vw;
    left: -100vw;
    top: 120px;
    height: calc(100vh - 120px);
    max-width: 320px;
  }
  .side-drawer.open {
    left: 0;
  }
}

.navbar {
  /* max-width: 1400px;   */
  width: 100%;
  padding: 0.8rem 2rem;
  background: #ffffff;
  border: 0.3px solid rgb(226, 226, 226);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* overflow: hidden;  Removed to allow dropdowns to overflow */
  position: relative;
  z-index: 999;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  font-style: normal;
  color: rgb(17, 24, 28);
  position: relative;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: background 0.18s;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.nav-link:hover,
.nav-link.active {
  background: #f5f5f5;
}

.nav-link-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}



.dropdown-menu {
  position: fixed;
  top: 60px;
  right: 30px;
  left: auto;
  width: 700px;
  max-width: min(728px, 95vw);
  background: #fff;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  padding: 0.75rem;
  z-index: 999;
  display: block;
  animation: fadeInBg 0.25s cubic-bezier(.4,0,.2,1);
  box-sizing: border-box;
  border: 0px solid #e5e7eb;
  overflow-x: auto;
}

.dropdown-header-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
}
.dropdown-header-icon {
  display: block;
  /* vertical-align: middle; */
}
.dropdown-header-title {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.75rem;
}

.dropdown-divider {
  margin: 0.5rem;
  border: 0px solid #e5e7eb;
  box-sizing: border-box;
  height: 1px;
  width: calc(100% - 1.5rem);
  background: #e5e5e5;
}
.dropdown-links-row {
  display: flex;
  width: 100%;
  min-width: 352px;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
}
.dropdown-link-item {
  display: flex;
  width: 50%;
  cursor: pointer;
  flex-direction: column;
  padding: 0.35rem 0.5rem;
  box-sizing: border-box;
  text-decoration: none;
  color: #000;
  border: 0px solid #e5e7eb;
  transition: background 0.15s;
}
.dropdown-link-item:hover {
  background: #f5f5f5;
}

.dropdown-link-label {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 700;
  color: rgb(17, 24, 28);
  font-size: 15px;
  line-height: 28px;
}
.dropdown-link-desc {
  font-family: family, "family Fallback", serif;
  font-style: normal;
  font-weight: 400;
  color: rgb(103, 103, 103);
  font-size: 14px;
  line-height: 21px;
}

.ham_and_logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.register {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Hamburger styles */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  z-index: 20;
}
.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  margin: 2px 0;
  background: #4a4b4a;
  border-radius: 2px;
  transition: 0.3s;
}
.hamburger span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile styles */
@media (max-width: 900px) {
  .right {
    position: fixed;
    top: 0;
    left: -100vw;
    height: 100vh;
    width: 70vw;
    max-width: 320px;
    background: #fff;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem 1.5rem;
    gap: 2rem;
    box-shadow: 2px 0 10px rgba(0,0,0,0.08);
    z-index: 15;
    transition: left 0.3s ease;
    right: auto;
  }
  .right.mobile-open {
    left: 0;
  }
  .nav-links {
    flex-direction: column;
    gap: 1.2rem;
    width: 100%;
  }
  .register {
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
  }
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    z-index: 70;
  }
}

/* Desktop drawer styles */
@media (min-width: 901px) {
  .right {
    position: fixed;
    top: 0;
    left: -400px;
    height: 100vh;
    width: 320px;
    background: #fff;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 2rem 1.5rem;
    gap: 2rem;
    box-shadow: 2px 0 10px rgba(0,0,0,0.08);
    z-index: 15;
    transition: left 0.3s ease;
    right: auto;
  }
  .right.mobile-open {
    left: 0;
  }
  .mobile-overlay {
    position: fixed;
    top: 20;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 84vh;
    background: rgba(0,0,0,0.4);
    z-index: 70;
  }
  .nav-links, .register {
    flex-direction: column;
    width: 100%;
  }
}
</style>


