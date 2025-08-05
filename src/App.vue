<script setup>
import Navbar from './components/Navbar.vue';
import LivePrices from './components/LivePrices.vue';
import Sponsored from './components/Sponsored.vue';
import ArticleContent from './components/ArticleContent.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div>
    <Navbar/>
    <LivePrices/>
    <Sponsored/>
    <ArticleContent/>
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
