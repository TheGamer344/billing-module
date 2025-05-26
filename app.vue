<template>
  <div class="min-h-screen bg-secondary text-white">
    <NavBar />
    <NuxtPage />
    <Footer />
    <Vue3Toastify position="top-right" />
  </div>
</template>

<script setup>
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
</script>