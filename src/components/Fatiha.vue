<template>
  <div class="fatiha">
    <h2 class="text-2xl font-semibold mb-4">Fatiha</h2>
    <TranslationToggle v-model="showTranslation" />
    <div class="btn-group mb-4">
      <button @click="display = 'whole'" :class="{'btn-active': display === 'whole'}" class="btn">
        <i class="fas fa-align-justify mr-2"></i> All
      </button>
      <button @click="display = 'line'" :class="{'btn-active': display === 'line'}" class="btn">
        <i class="fas fa-bars mr-2"></i> Line by Line
      </button>
    </div>
    <div v-if="display === 'whole'" class="whole-fatiha">
      <p v-for="(line, index) in fatihaLines" :key="index" class="mb-2">{{ line }}</p>
    </div>
    <div v-else class="line-by-line-fatiha">
      <swiper
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :keyboard="{ enabled: true }"
        :modules="[Keyboard]"
        class="h-64"
      >
        <swiper-slide v-for="(line, index) in fatihaLines" :key="index" class="flex items-center justify-center">
          <p class="text-2xl">{{ line }}</p>
        </swiper-slide>
      </swiper>
      <div class="mt-4 flex justify-center overflow-x-auto">
        <ul class="steps steps-horizontal">
          <li v-for="(_, index) in fatihaLines" :key="index" :class="{'step-primary': index <= currentSlide}" class="step"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TranslationToggle from './TranslationToggle.vue'
import { storeToRefs } from 'pinia'
import { useDuaStore } from '../stores/duaStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/keyboard'

export default defineComponent({
  name: 'Fatiha',
  components: {
    TranslationToggle,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const showTranslation = ref(false)
    const duaStore = useDuaStore()
    const { fatiha } = storeToRefs(duaStore)
    const display = ref('whole')
    const fatihaLines = computed(() => fatiha.value.split('\n').filter(line => line.trim() !== ''))
    const currentSlide = ref(0)

    const onSwiper = (swiper: SwiperType) => {
      console.log(swiper)
    }
    const onSlideChange = (swiper: SwiperType) => {
      currentSlide.value = swiper.activeIndex
    }
    return {
      fatiha,
      display,
      fatihaLines,
      onSwiper,
      onSlideChange,
      currentSlide,
      Keyboard,
      showTranslation,
    }
  }
})
</script>