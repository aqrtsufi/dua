<template>
      <div class="app bg-base-100 text-base-content">
      <h1>Test dua app</h1>
      <p>Before router-view</p>
        <router-view></router-view>
        <p>After router-view</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
  }
)
</script>