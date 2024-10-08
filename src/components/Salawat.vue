<template>
    <div class="salawat">
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" /> 
        <div class="collapse-title text-xl font-medium">
          Salawat
        </div>
        <div class="collapse-content">
          <p class="text-lg font-semibold mb-2">(Always recited before Sura Al Fatiha)</p>
          <p class="text-2xl">{{ salawat }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDuaStore } from '../stores/duaStore'
  
  export default defineComponent({
    name: 'Salawat',
    setup() {
      const duaStore = useDuaStore()
      const { salawat } = storeToRefs(duaStore)
  
      return {
        salawat
      }
    }
  })
  </script>