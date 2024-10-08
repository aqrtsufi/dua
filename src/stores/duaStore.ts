import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Prayer } from '../types/prayer'
import { fetchDuaContent, parseDuaContent } from '../services/duaService'

export const useDuaStore = defineStore('dua', () => {
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const introduction = ref('')
  const procedure = ref('')
  const link = ref('')
  const recommendation = ref('')
  const prayers = ref<Prayer[]>([])
  const ending = ref('')
  const salawat = ref('')
  const fatiha = ref('')

  async function fetchDua() {
    console.log('fetchDua called')
    isLoading.value = true
    error.value = null
    try {
      console.log('Fetching dua content...')
      const content = await fetchDuaContent()
      console.log('Fetched content:', content.substring(0, 100) + '...') // Log first 100 characters
      const parsedContent = parseDuaContent(content)
      console.log('Parsed content:', parsedContent)
      
      introduction.value = parsedContent.introduction
      procedure.value = parsedContent.procedure
      link.value = parsedContent.link
      recommendation.value = parsedContent.recommendation
      prayers.value = parsedContent.prayers
      ending.value = parsedContent.ending
      salawat.value = parsedContent.salawat
      fatiha.value = parsedContent.fatiha
      console.log('Store updated with parsed content')
    } catch (err) {
      error.value = 'Failed to load dua content'
      console.error('Failed to load dua content:', err)
      throw err // Re-throw the error to be caught in the component
    } finally {
      isLoading.value = false
      console.log('fetchDua completed, isLoading:', isLoading.value)
    }
  }

  return {
    isLoading,
    error,
    introduction,
    procedure,
    link,
    recommendation,
    prayers,
    ending,
    salawat,
    fatiha,
    fetchDua
  }
})