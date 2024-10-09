<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// // Router
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

// Type declarations
import type { ComputedRef } from 'vue'

// Components
// import NavMain from '@/components/NavMain.vue'

// Utils

// Definitions

// Props
const props = withDefaults(
	defineProps<{
		foo: number
	}>(),
	{
		foo: 1,
	},
)

/**
 * Computed properties
 */

/**
 * Methods
 */
</script>

<!----------------------------------------------------->

<template>Hello</template>

<!----------------------------------------------------->

<style scoped lang="scss"></style>
