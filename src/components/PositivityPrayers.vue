<template>
    <div class="positivity-prayers container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6 text-primary">POSITIVITY PRAYERS</h1>
      
      <div v-if="isLoading" class="loading loading-lg loading-spinner text-primary"></div>
      
      <template v-else>
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Introduction</h2>
            <p>{{ introduction }}</p>
          </div>
        </div>
        
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Procedure of reciting the Positivity Prayers</h2>
            <p>{{ procedure }}</p>
          </div>
        </div>
        
        <div class="mb-6">
          <a :href="link" target="_blank" class="btn btn-primary">More explanation</a>
        </div>
        
        <div class="card bg-base-200 shadow-xl mb-6">
          <div class="card-body">
            <h2 class="card-title">Recommendation</h2>
            <p>{{ recommendation }}</p>
          </div>
        </div>
        
        <div class="prayers">
          <h2 class="text-2xl font-semibold mb-4">Prayers</h2>
          <div v-for="(prayer, index) in prayers" :key="index" class="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="my-accordion-2" :checked="index === 0" /> 
            <div class="collapse-title text-xl font-medium">
              {{ prayer.title }}
            </div>
            <div class="collapse-content">
              <div class="lg:flex">
                <div class="arabic lg:w-1/2 mb-2 lg:mb-0">
                  <h3 class="font-bold">Arabic</h3>
                  <p>{{ prayer.arabic }}</p>
                </div>
                <div class="meaning lg:w-1/2">
                  <h3 class="font-bold">Meaning</h3>
                  <p>{{ prayer.meaning }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card bg-base-200 shadow-xl mt-6">
          <div class="card-body">
            <h2 class="card-title">Ending</h2>
            <p>At the end, recite:</p>
            <p>{{ ending }}</p>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { fetchDuaContent, parseDuaContent } from '../services/duaService'
  import { Prayer } from '@/types/prayer'

  export default defineComponent({
    name: 'PositivityPrayers',
    setup() {
        const isLoading = ref(true)
        const introduction = ref('')
        const procedure = ref('')
        const link = ref('')
        const recommendation = ref('')
        const prayers = ref<Prayer[]>([])
        const ending = ref('')

        onMounted(async () => {
          try {
            const content = await fetchDuaContent()
            const parsedContent = parseDuaContent(content)
            
            introduction.value = parsedContent.introduction
            procedure.value = parsedContent.procedure
            link.value = parsedContent.link
            recommendation.value = parsedContent.recommendation
            prayers.value = parsedContent.prayers
            ending.value = parsedContent.ending
      
          } catch (error) {
            console.error('Failed to load dua content:', error)
          } finally {
            isLoading.value = false
          }
        })

        return {
            isLoading,
            introduction,
            procedure,
            link,
            recommendation,
            prayers,
            ending
        }
    }
  })
</script>