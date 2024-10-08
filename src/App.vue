<template>
      <div class="app bg-base-100 text-base-content">
      <h1>Test dua app</h1>
        <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
  }
)
</script>