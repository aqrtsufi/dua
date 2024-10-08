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

  async function fetchDua() {
    isLoading.value = true
    error.value = null
    try {
      console.log('Fetching dua content...')
      const content = await fetchDuaContent()
      console.log('Fetched content:', content)
      const parsedContent = parseDuaContent(content)
      console.log('Parsed content:', parsedContent)
      
      introduction.value = parsedContent.introduction
      procedure.value = parsedContent.procedure
      link.value = parsedContent.link
      recommendation.value = parsedContent.recommendation
      prayers.value = parsedContent.prayers
      ending.value = parsedContent.ending
    } catch (err) {
      error.value = 'Failed to load dua content'
      console.error('Failed to load dua content:', err)
    } finally {
      isLoading.value = false
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
    fetchDua
  }
})