
<script setup>

import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  coins: {
    type: Array,
    required: false,
    default: undefined
  }
})

const liveCoins = ref([])
const isLoading = ref(false)
const error = ref(null)

async function fetchLiveCoins() {
  isLoading.value = true
  error.value = null
  try {
    // Get top 10 coins by market cap from CoinGecko
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h')
    const data = await res.json()
    liveCoins.value = data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      icon: coin.image,
      link: `https://www.coingecko.com/en/coins/${coin.id}`,
      price: coin.current_price?.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      profit_loss: coin.price_change_percentage_1h_in_currency ?? 0
    }))
  } catch (e) {
    error.value = 'Failed to load prices.'
    liveCoins.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (!props.coins) fetchLiveCoins()
})

const displayCoins = computed(() => props.coins && props.coins.length ? props.coins : liveCoins.value)
</script>

<template>
  <div class="live-prices-carousel">
    <div v-if="isLoading" class="carousel-loading">Loading prices...</div>
    <div v-else-if="error" class="carousel-error">{{ error }}</div>
    <div v-else class="carousel-track-wrapper">
      <div class="carousel-track">
        <template v-for="coin in displayCoins.concat(displayCoins)" :key="coin.symbol + Math.random()">
          <a :href="coin.link" class="carousel-coin" target="_blank" rel="noopener">
            <img :src="coin.icon" :alt="coin.name" class="coin-icon" />
            <span class="coin-name">{{ coin.symbol.toUpperCase() }}</span>
            <span class="coin-price">${{ coin.price }}</span>
            <span class="coin-change" :class="{ positive: coin.profit_loss > 0, negative: coin.profit_loss < 0 }">
              {{ coin.profit_loss > 0 ? '+' : '' }}{{ coin.profit_loss.toFixed(2) }}%
            </span>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-prices-carousel {
  width: 100vw;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  overflow-x: hidden;
  white-space: nowrap;
  padding: 0.2rem 0;
  position: relative;
  z-index: 70;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.live-prices-carousel::before,
.live-prices-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  width: 36px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.live-prices-carousel::before {
  left: 0;
  background: linear-gradient(to right, #fff 80%, rgba(255,255,255,0));
}
.live-prices-carousel::after {
  right: 0;
  background: linear-gradient(to left, #fff 80%, rgba(255,255,255,0));
}
.carousel-loading, .carousel-error {
  padding: 0.7rem 1.2rem;
  color: #888;
  font-size: 1.05rem;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
}
.carousel-track-wrapper {
  overflow: hidden;
  width: 100vw;
}
.carousel-track {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 900px;
  padding-left: 1.2rem;
  animation: ticker-scroll 40s linear infinite;
}
.carousel-track-wrapper:hover .carousel-track {
  animation-play-state: paused;
}
.carousel-coin {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-size: 0.92rem;
  color: #222;
  font-weight: 400;
  padding: 0.18rem 0.6rem;
  border-radius: 16px;
  transition: background 0.15s;
}
.carousel-coin:hover {
  background: #f5f5f5;
}
.coin-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #f5f5f5;
  object-fit: contain;
  margin-right: 0.2rem;
}
.coin-name {
  font-family: neueHaas, "neueHaas Fallback", sans-serif;
  font-style: normal;
  font-weight: 600;
  color: rgb(82, 82, 82);
  font-size: 11px;
  line-height: 18px;
  margin-right: 0.18rem;
}
.coin-price {
  font-weight: 400;
  color: #222;
  font-size: 0.72rem;
  margin-right: 0.18rem;
}
.coin-change {
  font-weight: 500;
  font-size: 0.72rem;
  min-width: 48px;
  text-align: right;
/* Hide scrollbar for all browsers */
.live-prices-carousel {
  scrollbar-width: none; /* Firefox */
}
.live-prices-carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
}
.coin-change.positive {
  color: #1ca75d;
}
.coin-change.negative {
  color: #e03a1c;
}
@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>