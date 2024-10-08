<template>
    <button @click="toggleTranslation" class="btn btn-primary mb-4">
      <font-awesome-icon :icon="modelValue ? 'language' : 'book'" />
      {{ modelValue ? 'Hide Translation' : 'Show Translation' }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'TranslationToggle',
    props: {
      modelValue: {
        type: Boolean,
        required: true
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const toggleTranslation = () => {
        emit('update:modelValue', !props.modelValue)
      }
  
      return {
        toggleTranslation
      }
    }
  })
  </script>