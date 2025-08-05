<template>
  <div class="sponsored-page">
    <div class="sponsored-banner-ref">
      <div class="banner-main">
        <div class="banner-brand">
          <span class="banner-label">Sponsored by</span>
          <img
            alt="Stellar logo"
            loading="lazy"
            width="100"
            height="120"
            decoding="async"
            src="https://www.coindesk.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fs3y3vcno%2Fproduction%2F60d0e44ad9e64800198806adeeb8bca7552886cc-2500x1041.png%3Fw%3D192%26h%3D64%26auto%3Dformat&w=256&q=75"
            class="banner-logo"
          />
          
        </div>

        <div class="banner-share" data-submodule-name="social-share">
          <button class="share-btn" @click="toggleShare">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <rect width="20" height="20" fill="#D9D9D9"></rect>
              </mask>
              <g mask="url(#mask0)">
                <path d="M5.51324 18.3334C5.12963 18.3334 4.80935 18.205 4.55241 17.948C4.29546 17.6911 4.16699 17.3708 4.16699 16.9872V8.84636C4.16699 8.46275 4.29546 8.14247 4.55241 7.88553C4.80935 7.62858 5.12963 7.50011 5.51324 7.50011H7.27595V8.33344H5.51324C5.38491 8.33344 5.26734 8.38685 5.16053 8.49365C5.05373 8.60046 5.00033 8.71803 5.00033 8.84636V16.9872C5.00033 17.1155 5.05373 17.2331 5.16053 17.3399C5.26734 17.4467 5.38491 17.5001 5.51324 17.5001H14.4874C14.6157 17.5001 14.7333 17.4467 14.8401 17.3399C14.9469 17.2331 15.0003 17.1155 15.0003 16.9872V8.84636C15.0003 8.71803 14.9469 8.60046 14.8401 8.49365C14.7333 8.38685 14.6157 8.33344 14.4874 8.33344H12.7247V7.50011H14.4874C14.871 7.50011 15.1913 7.62858 15.4482 7.88553C15.7052 8.14247 15.8337 8.46275 15.8337 8.84636V16.9872C15.8337 17.3708 15.7052 17.6911 15.4482 17.948C15.1913 18.205 14.871 18.3334 14.4874 18.3334H5.51324ZM9.58366 12.9168V3.84469L7.83366 5.59469L7.24387 5.00011L10.0003 2.24365L12.7568 5.00011L12.167 5.59469L10.417 3.84469V12.9168H9.58366Z" fill="#262626"></path>
              </g>
            </svg>
            Share
          </button>
          <div v-if="showShare" class="share-dropdown">
            <button class="close-btn" @click="toggleShare">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask1" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"></rect>
                </mask>
                <g mask="url(#mask1)">
                  <path d="M6.39994 18.6538L5.34619 17.6L10.9462 12L5.34619 6.4L6.39994 5.34625L11.9999 10.9463L17.5999 5.34625L18.6537 6.4L13.0537 12L18.6537 17.6L17.5999 18.6538L11.9999 13.0538L6.39994 18.6538Z"></path>
                </g>
              </svg>
            </button>
            <span class="share-title">Share this article</span>
            <div class="share-actions">
              <button class="share-action" @click="copyLink">
                <span class="icon-bg">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 7H14C13.45 7 13 7.45 13 8C13 8.55 13.45 9 14 9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H14C13.45 15 13 15.45 13 16C13 16.55 13.45 17 14 17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7ZM8 12C8 12.55 8.45 13 9 13H15C15.55 13 16 12.55 16 12C16 11.45 15.55 11 15 11H9C8.45 11 8 11.45 8 12ZM10 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H10C10.55 9 11 8.55 11 8C11 7.45 10.55 7 10 7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H10C10.55 17 11 16.55 11 16C11 15.45 10.55 15 10 15Z" fill="#262626"></path>
                  </svg>
                </span>
                Copy link
              </button>
              <a target="_blank" href="https://x.com/intent/tweet?utm_source=twitter&text=Rewiring+Global+Payroll+with+Stellar+https%3A%2F%2Fwww.coindesk.com%2Fsponsored-content%2Frewiring-global-payroll-with-stellar+via+%40coindesk&editorial=utm_content&social=utm_medium&organic=utm_term" class="share-action">
                <span class="icon-bg">
                  <svg width="16" height="16" viewBox="0 0 1400 1027" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="twitter-svg-a11y-label-id">
                    <title>X icon</title>
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="#262626"></path>
                  </svg>
                </span>
                X (Twitter)
              </a>
              <a target="_blank" href="https://www.linkedin.com/shareArticle?utm_source=linkedin&mini=true&summary=null&url=https%3A%2F%2Fwww.coindesk.com%2Fsponsored-content%2Frewiring-global-payroll-with-stellar&editorial=utm_content&social=utm_medium&organic=utm_term" class="share-action">
                <span class="icon-bg">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.25362 9.21772H6.53986V22.1164H2.25362V9.21772ZM4.42543 3C2.95843 3 2 3.9631 2 5.22719C2 6.46529 2.93038 7.45638 4.36933 7.45638H4.39667C5.89171 7.45638 6.82276 6.46524 6.82276 5.22719C6.79471 3.9631 5.89176 3 4.42543 3ZM17.0638 8.91471C14.7886 8.91471 13.7693 10.1661 13.2007 11.0438V9.21772H8.91314C8.9699 10.4278 8.91314 22.1164 8.91314 22.1164H13.2007V14.9129C13.2007 14.527 13.2287 14.1427 13.3415 13.8663C13.652 13.0961 14.3574 12.2985 15.5407 12.2985C17.0931 12.2985 17.7131 13.4819 17.7131 15.2151V22.1163H22V14.72C22 10.7581 19.8856 8.91471 17.0638 8.91471Z" fill="#262626"></path>
                  </svg>
                </span>
                LinkedIn
              </a>
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?utm_source=facebook&u=https%3A%2F%2Fwww.coindesk.com%2Fsponsored-content%2Frewiring-global-payroll-with-stellar&editorial=utm_content&social=utm_medium&organic=utm_term" class="share-action">
                <span class="icon-bg">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.3447 13.6068L16.863 10.1942H13.621V7.9796C13.621 7.04596 14.0739 6.13593 15.526 6.13593H17V3.2306C17 3.2306 15.6623 3 14.3834 3C11.7132 3 9.96805 4.63437 9.96805 7.59321V10.1942H7V13.6068H9.96805V21.8566C10.5632 21.9509 11.1732 22 11.7945 22C12.4159 22 13.0259 21.9509 13.621 21.8566V13.6068H16.3447Z" fill="#262626"></path>
                  </svg>
                </span>
                Facebook
              </a>
              <a target="_blank" href="mailto:%20?subject=Rewiring%20Global%20Payroll%20with%20Stellar%20%E2%80%94%20CoinDesk&body=Rewiring%20Global%20Payroll%20with%20Stellar%0Anull%0A%0ARead%20the%20full%20article%20on%20CoinDesk%3A%0A%0Ahttps%3A%2F%2Fwww.coindesk.com%2Fsponsored-content%2Frewiring-global-payroll-with-stellar" class="share-action">
                <span class="icon-bg">
                  <svg width="16" height="16" fill="#262626" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.294 75.294">
                    <g>
                      <path d="M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9   c5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089   H61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065   c0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016   c0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102   c0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069   c0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z"></path>
                    </g>
                  </svg>
                </span>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showShare = ref(false);
function toggleShare() {
  showShare.value = !showShare.value;
}
function copyLink() {
  navigator.clipboard.writeText('https://www.coindesk.com/sponsored-content/rewiring-global-payroll-with-stellar');
  // Optionally, show a copied message
  toggleShare();
}
</script>

<style scoped>
.sponsored-page {
  width: 100%;
  background: #fff;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
}
.sponsored-banner-ref {
  background-color: #f4f4f4;
  max-width: 1400px;
  width: 100vw;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: 0px solid #e5e7eb;
}
.banner-main {
  max-width: 700px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0px;
  color: #676767;
  box-sizing: border-box;
}
.banner-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.banner-label {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 700;
  color: rgb(103, 103, 103);
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0px;
  text-transform: uppercase;
}
.banner-logo {
  display: block;
  vertical-align: middle;
  max-width: 100%;
  height: 32px;
}
.banner-share {
  position: relative;
}
.share-btn {
  color: #a6a6a6;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 25px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  outline-width: 0px;
  cursor: pointer;
  background: none;
  border: none;
}
@media (min-width: 1080px) {
  .share-btn {
    font-size: 1rem;
  }
}
.share-btn svg {
  display: block;
  vertical-align: middle;
}
/* Share dropdown: desktop default */
.share-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 100;
  min-width: 260px;
  border-radius: 0.5rem;
  background: #fff;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: max-content;
}

@media (max-width: 700px) {
  .share-dropdown {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    width: 100vw;
    min-width: unset;
    max-width: 100vw;
    border-radius: 1.2rem 1.2rem 0 0;
    padding: 2.2rem 1.2rem 2.5rem 1.2rem;
    box-shadow: 0 -2px 16px 0 rgba(0,0,0,0.13);
    animation: shareSlideUp 0.38s cubic-bezier(.4,0,.2,1);
    transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    height: auto;
    z-index: 9999;
  }
}

@keyframes shareSlideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.close-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 100%;
  cursor: pointer;
  background: none;
  border: none;
}
.share-title {
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 32px;
  margin-bottom: 1.5rem;
  display: block;
  color: #262626;
}
@media (min-width: 1080px) {
  .share-title {
    font-size: 1rem;
  }
}
.share-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(64px, 1fr));
  gap: 1.5rem 3rem;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.025em;
}
@media (max-width: 393px) {
  .share-actions {
    gap: 1.5rem;
  }
}
.share-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #262626;
  background: none;
  border: none;
  font-size: 100%;
  cursor: pointer;
  text-decoration: none;
}
.icon-bg {
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #f4f4f4;
}
.article-content {
  max-width: 700px;
  margin: 2.5rem auto 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-title {
  font-size: 2.3rem;
  font-weight: 500;
  color: #111;
  margin-bottom: 0.7rem;
  text-align: center;
  line-height: 1.18;
}
.article-date {
  color: #888;
  font-size: 1.01rem;
  margin-bottom: 2.2rem;
  text-align: center;
}
.hero-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.hero-image {
  width: 100%;
  max-width: 520px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
}

/* Add sponsor-name styles as specified */


</style>
