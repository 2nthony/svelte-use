<template>
  <div class="demo wide">
    <div ref="target"></div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref, onMounted } from 'vue'
const target = ref(null)
const props =
  defineProps<{
    svelteComponent: any
  }>()

onMounted(() => {
  if (props.svelteComponent) {
    new props.svelteComponent({
      target: target.value,
    })
  }
})

const error = ref(null)

onErrorCaptured((err) => {
  error.value = err
})
</script>
