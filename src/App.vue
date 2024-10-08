<template>
      <div class="app bg-base-100 text-base-content">
      <h1>Dua Book App by Ansari Publications</h1>
      <p>In construction</p>
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