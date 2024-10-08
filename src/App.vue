<script setup lang="ts">
// Router
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()

// Components
import NavMain from '@/components/NavMain.vue'
</script>

<template>
	<NavMain v-if="!route.meta.hideNav" />
	<div id="main-wrap" :class="{ 'nav-space': !route.meta.hideNav }">
		<!-- Usability shortcut - https://carbondesignsystem.com/components/UI-shell-header/accessibility/ -->
		<a name="main-content"></a>

		<!-- Router view -->
		<RouterView />
	</div>
	<!-- <h1>Hello</h1>
	<h2>World</h2>
	<cv-button>Back</cv-button>
	<cv-text-input helperText="Same helper text" label="Text input label" placeholder="Sample placeholder"> ZZZZ </cv-text-input> -->

	<!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      
    </div>
  </header>

   -->
</template>

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
