<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
<template>
	<SvgComponent v-if="SvgComponent" class="svg" :style="{ '--svg-dims': widthHeightPx }" />
	<svg
		v-else
		:width="widthHeight"
		:height="widthHeight"
		:viewBox="`0 0 ${widthHeight} ${widthHeight}`"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect :width="widthHeight" :height="widthHeight" />
	</svg>
</template>

<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
<script lang="ts" setup>
import { shallowRef, computed, onMounted } from 'vue'
import type { ComputedRef } from 'vue'

// Props
const props = withDefaults(
	defineProps<{
		icon: string
		size?: 'small' | 'large'
	}>(),
	{
		size: 'small',
	},
)

// Definitions
const SvgComponent = shallowRef<{ template?: string } | null>(null)

// Calculate dimensions
const widthHeight: ComputedRef<number> = computed(() => {
	if (props.size === 'large') {
		return 24
	} else {
		return 16
	}
})
const widthHeightPx: ComputedRef<string> = computed(() => {
	return `${widthHeight.value}px`
})

<<<<<<< HEAD
<<<<<<< HEAD
const filename: ComputedRef<string> = computed(() => props.icon.replace(/\.svg$/, ''))

// Load component
onMounted(async () => {
	const { default: svgComp } = await import(`@/assets/icons/${filename.value}.svg?component`) // Possible thanks to vite-svg-loader
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
// Load component
onMounted(async () => {
	const filename = props.icon.replace(/\.svg$/, '')
	const { default: svgComp } = await import(`@/assets/icons/${filename}.svg?component`) // Possible thanks to vite-svg-loader
<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
	SvgComponent.value = svgComp
})
</script>

<<<<<<< HEAD
<<<<<<< HEAD
<!----------------------------------------------------->

<template>
	<SvgComponent v-if="SvgComponent" :class="`svg-icn svg-${filename}`" :style="{ '--svg-dims': widthHeightPx }" />
	<svg
		v-else
		:width="widthHeight"
		:height="widthHeight"
		:viewBox="`0 0 ${widthHeight} ${widthHeight}`"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect :width="widthHeight" :height="widthHeight" />
	</svg>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
.svg-icn {
=======
<style scoped lang="scss">
.svg {
>>>>>>> 0861eb5 (Free Palestine)
=======
<style scoped lang="scss">
.svg {
>>>>>>> 0861eb5 (Free Palestine)
	width: var(--svg-dims);
	height: var(--svg-dims);
}
</style>
