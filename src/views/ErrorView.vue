<script setup lang="ts">
// Vue
import { onMounted, ref } from 'vue'

// Props
withDefaults(
	defineProps<{
		httpError: number
		errorMsg: string
	}>(),
	{
		httpError: 400,
		errorMsg: 'Page not found',
	},
)

// Definitions
// const errorWrap = ref<HTMLElement | null>(null)
const opacity = ref<number>(1)

// Methods
function flicker() {
	_apply()
	function _apply() {
		opacity.value = 0.2 + Math.random() * 0.8
		const interval = 10 + Math.random() * 100
		setTimeout(_apply, interval)
	}
}

/**
 * Hooks
 */
onMounted(flicker)
</script>

<!----------------------------------------------------->

<template>
	<div ref="errorWrap" :style="{ opacity }">
		<h1>Error {{ httpError }}</h1>
		<p>{{ errorMsg }}</p>
	</div>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
#error-wrap {
	animation: flicker 1s steps(1, end) infinite;
}
</style>
