<script setup lang="ts">
// Vue
import { computed, onBeforeMount, onMounted, ref } from 'vue'

// Router
import { useRoute } from 'vue-router'
const route = useRoute()

// Stores
import { useMainStore } from '@/stores/MainStore'
const mainStore = useMainStore()

// Components
import NavMain from '@/components/NavMain.vue'
import TheModal from '@/components/TheModal.vue'

// Utils
import { debounce } from '@/utils/helpers'

// Definitions
const $mainWrap = ref<HTMLElement | null>(null)

/**
 * Hooks
 */

onMounted(() => {
	storeScreenWidth()

	// Add blur handler
	document.body.removeEventListener('click', mainStore.onClickAnywhere)
	document.body.addEventListener('click', (e) => {
		console.log('click', mainStore.onClickAnywhere)
		mainStore.onClickAnywhere(e)
	})
})

onBeforeMount(() => {
	// Remove blur handler
	document.body.removeEventListener('click', mainStore.onClickAnywhere)
})

/**
 * Methods
 */

// Update screen width in the store on resize.
function storeScreenWidth() {
	const debouncer = debounce(_resizeHandler, 500)
	window.addEventListener('resize', debouncer)
	_resizeHandler()

	function _resizeHandler() {
		if (!$mainWrap.value) return
		const padding = parseInt(window.getComputedStyle($mainWrap.value).paddingLeft)
		const width = $mainWrap.value.clientWidth
		const contentWidth = width - padding * 2
		mainStore.setContentWidth(contentWidth)
		mainStore.setScreenWidth(window.innerWidth)
	}
}
</script>

<!----------------------------------------------------->

<template>
	<NavMain v-if="!route.meta.hideNav" />
	<div id="main-wrap" ref="$mainWrap" :class="{ 'nav-space': !route.meta.hideNav }">
		<!--
		Usability shortcut
		See: NavMain.vue -> <cv-skip-to-content>
		See: https://carbondesignsystem.com/components/UI-shell-header/accessibility/
		-->
		<a name="main-content"></a>

		<!-- Modal overlay -->
		<TheModal />

		<!-- Router view -->
		<RouterView />
	</div>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
// This is the content wrap that owns the page margin
// and is centered and limited in width.
#main-wrap {
	// display: flex;
	// flex-direction: column;
	padding-bottom: 0;
	box-sizing: border-box;
	height: min-content; // Required for bottom padding to show
	min-height: 100vh; // To avoid bottom shadow when content is short.

	// Centered layout
	padding: var(--page-margin);
	padding-top: 2.5rem;
	max-width: 1360px;
	background: #fff;
	margin: 0 auto;
	box-shadow: 0 0 300px rgba(0, 0, 0, 0.05);
}

// Push content down to fit nav
#main-wrap.nav-space {
	margin-top: 3rem;
}
</style>
