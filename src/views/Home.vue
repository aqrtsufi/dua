<template>
    <div class="home-view container mx-auto px-4 py-8 max-w-3xl">
      <h1 class="text-4xl font-bold mb-6 text-primary">Dua Book App</h1>
      <nav>
        <ul class="space-y-4">
          <li><router-link to="/positivity-prayers" class="btn btn-primary w-full">Positivity Prayers</router-link></li>
          <li><router-link to="/salawat" class="btn btn-primary w-full">Salawat</router-link></li>
          <li><router-link to="/fatiha" class="btn btn-primary w-full">Fatiha</router-link></li>
          <li><router-link to="/protection-prayers" class="btn btn-primary w-full">Protection Prayers</router-link></li>
          <li><router-link to="/traveling-prayers" class="btn btn-primary w-full">Traveling Prayers</router-link></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'HomeView'
  })
  </script>