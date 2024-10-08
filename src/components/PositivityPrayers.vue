<template>
    <div class="positivity-prayers container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6 text-primary">POSITIVITY PRAYERS</h1>
      
      <div v-if="isLoading" class="loading loading-lg loading-spinner text-primary"></div>
      
      <div v-else-if="error" class="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Failed to load content.</span>
        </div>
      </div>
      
      <template v-else>
        <div class="space-y-6">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Introduction</h2>
              <p>{{ introduction }}</p>
            </div>
          </div>
          
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Procedure of reciting the Positivity Prayers</h2>
              <p>{{ procedure }}</p>
            </div>
          </div>
          
          <div class="text-center">
            <a :href="link" target="_blank" class="btn btn-primary">More explanation</a>
          </div>
          
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Recommendation</h2>
              <p>{{ recommendation }}</p>
            </div>
          </div>
          
          <div class="prayers">
            <h2 class="text-2xl font-semibold mb-4">Prayers</h2>
            <div v-for="(prayer, index) in prayers" :key="index" class="mb-4">
              <div class="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" :checked="index === 0" /> 
                <div class="collapse-title text-xl font-medium">
                  {{ prayer.title }}
                </div>
                <div class="collapse-content">
                  <div class="lg:flex lg:space-x-4">
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
          </div>
          
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Ending</h2>
              <p>At the end, recite:</p>
              <p>{{ ending }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDuaStore } from '../stores/duaStore'

  export default defineComponent({
    name: 'PositivityPrayers',
    setup() {
      console.log('PositivityPrayers setup called')
  const duaStore = useDuaStore()
  console.log('duaStore initialized:', duaStore)
  const { isLoading, error, introduction, procedure, link, recommendation, prayers, ending } = storeToRefs(duaStore)

  onMounted(() => {
    console.log('PositivityPrayers mounted, calling fetchDua')
    duaStore.fetchDua()
      })

      return {
        isLoading,
        error,
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