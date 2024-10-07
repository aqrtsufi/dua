<template>
    <div class="positivity-prayers container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">POSITIVITY PRAYERS</h1>
      
      <div class="introduction mb-6">
        <p>{{ introduction }}</p>
      </div>
      
      <div class="procedure mb-6">
        <h2 class="text-2xl font-semibold mb-2">Procedure of reciting the Positivity Prayers</h2>
        <p>{{ procedure }}</p>
      </div>
      
      <div class="link mb-6">
        <a :href="link" target="_blank" class="text-blue-500 hover:underline">
          More explanation
        </a>
      </div>
      
      <div class="recommendation mb-6">
        <p>{{ recommendation }}</p>
      </div>
      
      <div class="prayers">
        <h2 class="text-2xl font-semibold mb-4">Prayers</h2>
        <div v-for="(prayer, index) in prayers" :key="index" class="prayer-item mb-4">
          <div class="lg:flex">
            <div class="arabic lg:w-1/2 mb-2 lg:mb-0">
              <h3 class="font-bold">{{ prayer.title }}</h3>
              <p>{{ prayer.arabic }}</p>
            </div>
            <div class="meaning lg:w-1/2">
              <h3 class="font-bold">Meaning</h3>
              <p>{{ prayer.meaning }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ending mt-6">
        <p>At the end, recite:</p>
        <p>{{ ending }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { fetchDuaContent, parseDuaContent } from '../services/duaService'

  export default defineComponent({
    name: 'PositivityPrayers',
    setup() {
        const duaContent = ref('')

        onMounted(async () => {
      try {
        const content = await fetchDuaContent()
        duaContent.value = parseDuaContent(content)
      } catch (error) {
        console.error('Failed to load dua content:', error)
      }
    })

    return {
      duaContent
    }
  }
})
</script>