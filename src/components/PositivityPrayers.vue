<template>
  <div class="positivity-prayers container mx-auto px-4 py-8 max-w-3xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-primary">POSITIVITY PRAYERS</h1>
      <button @click="refreshContent" class="btn btn-circle btn-outline">
        <font-awesome-icon icon="refresh" />
      </button>
    </div>

    <div v-if="isLoading" class="loading loading-lg loading-spinner text-primary"></div>
    
    <div v-else-if="error" class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Failed to load content.</span>
      </div>
    </div>
    
    <template v-else>
      <div v-if="currentView === 'main'" class="space-y-6" :class="fontSize">
        
        <div class="mb-4">
          <label for="font-size" class="mr-2">Font Size:</label>
          <select id="font-size" v-model="fontSize" class="select select-bordered w-full max-w-xs">
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
        </div>

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
            <div class="text-center mt-4">
              <a :href="link" target="_blank" class="btn btn-primary">More explanation</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Recommendation</h2>
            <p>{{ recommendation }}</p>
          </div>
        </div>
        
        <div class="card bg-base-200 shadow-xl cursor-pointer" @click="currentView = 'zikr'">
          <div class="card-body">
            <div class="text-center">
              <button @click.stop="currentView = 'zikr'" class="btn btn-primary">ZIKR</button>
              <p>Click to view the set of Positivity Prayers</p>
            </div>            
          </div>
        </div>

        <button @click="goToHome" class="btn btn-primary">
          <i class="fas fa-home mr-2"></i> Go to Home
        </button>
      </div>

      <div v-else-if="currentView === 'zikr'" class="fixed inset-0 bg-base-100 z-50 overflow-auto">
        <div class="p-4">
          <div class="flex justify-between mb-4">
            <button @click="currentView = 'main'" class="btn btn-primary">
              <i class="fas fa-arrow-left mr-2"></i> Back to Main
            </button>
            <button @click="goToHome" class="btn btn-primary">
              <i class="fas fa-home mr-2"></i> Go to Home
            </button>
          </div>
          <h2 class="text-2xl font-semibold mb-4">Zikr</h2>
          <div v-for="(prayer, index) in prayers" :key="index" class="mb-4">
            <div class="collapse collapse-arrow bg-base-200">
              <input type="radio" name="my-accordion-2" :checked="index === 0" @keydown.enter="toggleAccordion(index)" @keydown.space="toggleAccordion(index)" /> 
              <div class="collapse-title text-xl font-medium" tabindex="0" @keydown.enter="toggleAccordion(index)" @keydown.space="toggleAccordion(index)">
                {{ prayer.arabic }}
              </div>
              <div class="collapse-content">
                <div class="meaning mt-2">
                  <h3 class="font-bold">Meaning</h3>
                  <p class="text-xl">{{ prayer.meaning }}</p>
                </div>
                <div class="mt-4">
                  <button @click="incrementCounter(index)" class="btn btn-primary" :aria-label="`Recite ${prayer.arabic}`">
                    Recite ({{ prayerCounters[index] || 0 }})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <button @click="currentView = 'ending'" class="btn btn-primary">
              <i class="fas fa-book-open mr-2"></i> Ending
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="currentView === 'ending'" class="fixed inset-0 bg-base-100 z-50 overflow-auto">
        <div class="p-4">
          <button @click="currentView = 'zikr'" class="btn btn-primary mb-4">
            <i class="fas fa-arrow-left mr-2"></i> Back to Zikr
          </button>
          <h2 class="text-2xl font-semibold mb-4">Ending</h2>
          <div class="card bg-base-200 shadow-xl mb-4">
            <div class="card-body">
              <Salawat />
            </div>
          </div>
          <p class="text-xl mb-4">{{ ending }}</p>
          <button @click="currentView = 'fatiha'" class="btn btn-primary">
            <i class="fas fa-book-open mr-2"></i> View Fatiha
          </button>
        </div>
      </div>

      <div v-else-if="currentView === 'fatiha'" class="fixed inset-0 bg-base-100 z-50 overflow-auto">
        <div class="p-4">
          <button @click="currentView = 'ending'" class="btn btn-primary mb-4">
            <i class="fas fa-arrow-left mr-2"></i> Back to Ending
          </button>
          <Fatiha />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDuaStore } from '../stores/duaStore'
import Salawat from './Salawat.vue'
import Fatiha from './Fatiha.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PositivityPrayers',
  components: {
    Salawat,
    Fatiha
  },
  setup() {
    const duaStore = useDuaStore()
    const router = useRouter()
    const { isLoading, error, introduction, procedure, link, recommendation, prayers, ending } = storeToRefs(duaStore)

    const prayerCounters = ref<number[]>([])
    const fontSize = ref('text-base')
    const currentView = ref('main')

    const incrementCounter = (index: number) => {
      if (!prayerCounters.value[index]) {
        prayerCounters.value[index] = 0
      }
      prayerCounters.value[index]++
    }

    const toggleAccordion = (index: number) => {
      const accordions = document.getElementsByName('my-accordion-2') as NodeListOf<HTMLInputElement>
      accordions[index].checked = !accordions[index].checked
    }

    const goToHome = () => {
      router.push({ name: 'Home' })
    }

    const refreshContent = async () => {
      try {
        await duaStore.fetchDua()
      } catch (err) {
        console.error('Error fetching dua:', err)
      }
    }

    onMounted(refreshContent)

    return {
      isLoading,
      error,
      introduction,
      procedure,
      link,
      recommendation,
      prayers,
      ending,
      prayerCounters,
      incrementCounter,
      fontSize,
      toggleAccordion,
      currentView,
      goToHome,
      refreshContent
    }
  }
})
</script>