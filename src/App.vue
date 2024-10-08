<template>
      <div class="app bg-base-100 text-base-content">
      <h1>Dua Book App by Ansari Publications</h1>
      <p>Development Phase</p>
        <router-view></router-view>
        <p>© Dua Book App 2024. Ansari Publications. All rights reserved.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
  }
)
</script>