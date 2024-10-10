<script setup lang="ts">
// Router
import { useRoute } from 'vue-router'
const route = useRoute()

// Components
import NavMain from '@/components/NavMain.vue'
import TheModal from '@/components/TheModal.vue'
</script>

<!----------------------------------------------------->

<template>
	<NavMain v-if="!route.meta.hideNav" />
	<div id="main-wrap" :class="{ 'nav-space': !route.meta.hideNav }">
		<!-- Usability shortcut - https://carbondesignsystem.com/components/UI-shell-header/accessibility/ -->
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
