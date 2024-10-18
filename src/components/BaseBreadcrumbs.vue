<script setup lang="ts">
// Vue
import { ref, onMounted, computed } from 'vue'

// Router
import { useRoute } from 'vue-router'
const route = useRoute()

// Type declarations
import type { ComputedRef } from 'vue'
type Crumb = {
	name: string
	path: string
}

// Props
const props = defineProps<{
	crumbs?: Crumb[]
	omitHome?: boolean
}>()

// Definitions
const $breadcrumbs = ref<HTMLElement | null>(null)
const truncate = ref<boolean>(true) // Lets us toggle truncation
const needsTruncation = ref<boolean>(false) // Lets us check if the breadcrumbs are truncated

/**
 * Computed
 */

// The path to be displayed
const theCrumbs: ComputedRef<Crumb[]> = computed(() => {
	const homeCrumb = {
		name: 'Home',
		path: '/',
	}
	if (props.crumbs) {
		// Custom crumbs from the props
		if (props.omitHome) {
			return props.crumbs
		} else {
			return [homeCrumb, ...props.crumbs]
		}
	} else {
		// Automatic crumbs from the route
		const crumbs = route.matched.map((item) => {
			return {
				name: item.name,
				path: item.path,
			} as Crumb
		})
		if (props.omitHome) {
			return crumbs
		} else {
			return [homeCrumb, ...crumbs]
		}
	}
})

/**
 * Hooks
 */

onMounted(() => {
	if ($breadcrumbs.value && $breadcrumbs.value.offsetWidth < $breadcrumbs.value.scrollWidth) {
		needsTruncation.value = true
	}
})

/**
 * Methods
 */

function toggleTruncate() {
	truncate.value = !truncate.value
}
</script>

<!----------------------------------------------------->

<template>
	<div id="breadcrumbs-wrap" :class="{ truncate }">
		<div id="breadcrumbs" ref="$breadcrumbs" :class="{ truncate, 'needs-truncated': needsTruncation }">
			<template v-for="(crumb, i) in theCrumbs" :key="i">
				<span v-if="i == theCrumbs.length - 1">{{ crumb.name }}</span>
				<router-link v-else :to="crumb.path" class="dumb">{{ crumb.name }}</router-link>
				<span v-if="i < theCrumbs.length - 1">&nbsp;&nbsp;&rsaquo;&nbsp;&nbsp;</span>
			</template>
			<a v-if="needsTruncation && !truncate" href="#" class="toggle-hide" @click.prevent="toggleTruncate">hide</a>
		</div>
		<a v-if="needsTruncation && truncate" href="#" class="toggle-show" @click.prevent="toggleTruncate">show</a>
		<div class="bc-right">
			<slot></slot>
		</div>
	</div>
</template>

<!----------------------------------------------------->

<style lang="scss" scoped>
$br-height: 20px;

#breadcrumbs-wrap {
	display: flex;
	font-size: $font-size-small;
	line-height: $br-height;
	color: $black-30;
}
#breadcrumbs {
	flex: 1;
	margin-bottom: 16px;
	display: flex;
	// background: pink;
}
#breadcrumbs a {
	color: $black-30;
	display: inline-block;
	height: $br-height;
	line-height: $br-height;
	// background: brown;
}

// Truncation at end
#breadcrumbs.truncate {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
#breadcrumbs-wrap:not(.truncate),
#breadcrumbs:not(.truncate) {
	display: block;
}

// Show-more link for truncated breadcrumbs
#breadcrumbs-wrap a.toggle-show,
#breadcrumbs-wrap a.toggle-hide {
	color: $black;
}
#breadcrumbs-wrap .toggle-show::before,
#breadcrumbs-wrap .toggle-hide::before {
	content: '\a0\a0';
}

// Right side
#breadcrumbs ~ .bc-right {
	display: flex;
	height: $br-height;
	line-height: $br-height;
}
#breadcrumbs:deep() ~ .bc-right .icn-btn {
	margin: -2px 0;
	// background: pink;
}
#breadcrumbs:deep() ~ .bc-right .icn-btn:first-of-type {
	margin-left: 4px;
}

// File type button
#file-type {
	color: $black;
	background: $black-10;
	border: none;
	padding: 2px 4px;
	box-sizing: content-box;
	height: 16px;
	line-height: 16px;
	border-radius: 2px;
	text-transform: uppercase;
	font-size: $font-size-small;
	font-weight: 600;
	margin-right: 7px;
	cursor: pointer;
}

/**
 * Hover
 */

@media (hover: hover) {
	#file-type:hover {
		color: #fff;
		background: $black;
	}
	#breadcrumbs a:hover {
		color: $black-60;
	}
}
</style>
