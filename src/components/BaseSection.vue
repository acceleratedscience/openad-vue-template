<script setup lang="ts">
// Vue
import { computed, onMounted } from 'vue'

// Type declarations
import type { ComputedRef } from 'vue'

// Utils
import { slugify, jumpToAnchor } from '@/utils/helpers'

// Props
const props = withDefaults(
	defineProps<{
		title: string
		anchor?: boolean | string
	}>(),
	{
		title: 'Untitled',
	},
)

/**
 * Computed properties
 */

// The link to which the # will link to
const anchorLink: ComputedRef<string> = computed(() => {
	if (props.anchor && typeof props.anchor == 'string') return props.anchor
	return slugify(props.title)
})

// Page link to be copied
const windowHref: ComputedRef<string> = computed(() => {
	return `${window.location.origin}${window.location.pathname}#${anchorLink.value}`
})

/**
 * Hooks
 */

// Scroll to anchor on page load, if it matches the URL hash
onMounted(() => jumpToAnchor(anchorLink.value))
</script>

<!----------------------------------------------------->

<template>
	<hr />
	<a :id="anchorLink" style="position: relative; display: block; top: -7rem"></a>
	<h5>
		<a :href="`#${anchorLink}`" class="anchor" v-click-to-copy :data-copy="windowHref">{{ title }}</a>
	</h5>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
h5 {
	text-transform: uppercase;
	font-size: $font-size-xsmall;
	margin-top: -2.75rem;
	margin-bottom: 2.75rem;
}
</style>
