<script setup lang="ts">
// Vue
import { computed, useSlots, onMounted } from 'vue'

// Type declarations
import type { ComputedRef } from 'vue'

// Utils
import { slugify, jumpToAnchor } from '@/utils/helpers'

// Slots
const slots = useSlots()

// Props
const props = defineProps<{
	anchor?: boolean | string
}>()

/**
 * Computed properties
 */

// The link to which the # will link to
const anchorLink: ComputedRef<string> = computed(() => {
	if (props.anchor && typeof props.anchor == 'string') return props.anchor
	const text = (slots.title ? slots.title()[0]?.children : '' || '') as string
	return slugify(text)
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
	<details>
		<summary>
			<h4>
				<slot name="title"></slot><a v-if="anchor" :href="`#${anchorLink}`" :id="anchorLink" v-click-to-copy :data-copy="windowHref">#</a>
			</h4>
		</summary>
		<div>
			<slot name="content"></slot>
		</div>
	</details>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
details summary {
	cursor: pointer;
	list-style: none;
	user-select: none;
	display: inline-block;
	line-height: 0;
	margin: 0.5rem 0;
}
// For Safari
details summary::-webkit-details-marker {
	display: none;
}
details summary::before {
	content: '';
	display: inline-block;
	background: url('data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4L11 8L6 12V4Z"/></svg>')
		center center no-repeat;
	width: 1rem;
	height: 1rem;
	margin-left: -1.125rem;
	transition: transform 0.2s ease-in-out;
	float: left;
}
details[open] summary::before {
	transform: rotate(90deg);
}
details summary h4 {
	display: inline-block;
	margin: 0;
	height: 1rem;
	line-height: 1rem;
	position: relative;
	// background: orange;
}
details summary h4 a {
	display: inline-block;
	text-align: center;
	width: 1rem;
	position: absolute;
	left: -2rem;
	// background: yellow;
}
details summary h4 a:hover {
	text-decoration: none;
}
details:not([open]) summary h4 a {
	opacity: 0;
}
details[open] summary h4 {
	margin-bottom: 0;
}
details[open] > div {
	margin-bottom: 2rem;
}
</style>
