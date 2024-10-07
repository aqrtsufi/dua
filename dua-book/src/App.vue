<template>
  <div class="app">
    <PositivityPrayers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PositivityPrayers from './components/PositivityPrayers.vue'

export default defineComponent({
  name: 'App',
  components: {
    PositivityPrayers
  }
})
</script>