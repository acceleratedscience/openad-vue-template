<script setup lang="ts">
// Vue
// import { ref, computed } from 'vue'

// // Router
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

// Type declarations
// import type { ComputedRef } from 'vue'

// Components
import BaseIcon from '@/components/BaseIcon.vue'

// Utils

// Definitions

// Props
// const props = withDefaults(
// 	defineProps<{
// 		foo: number
// 	}>(),
// 	{
// 		foo: 1,
// 	},
// )

/**
 * Computed properties
 */

/**
 * Methods
 */

function onPanelResize() {
	console.log('Panel resized')
}
function onFunc1() {
	console.log('Function 1')
}
function onFunc2() {
	console.log('Function 1')
}
function onFunc3() {
	console.log('Function 1')
}
</script>

<!----------------------------------------------------->

<template>
	<!-- https://vue.carbondesignsystem.com/?path=/docs/component-ui-select-cvheader--default-story -->
	<cv-header aria-label="Main navigation">
		<cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>
		<cv-header-name prefix="OpenAD" :to="{ name: 'Home' }">Vue Template</cv-header-name>

		<!-- Menu items -->
		<cv-header-nav aria-label="Carbon nav">
			<cv-header-menu-item :to="{ name: 'Home' }">Link 1</cv-header-menu-item>
			<cv-header-menu-item :to="{ name: 'Home' }">Link 2</cv-header-menu-item>
			<cv-header-menu aria-label="Link 3" title="Link 3">
				<cv-header-menu-item :to="{ name: 'Home' }">Submenu Link 1</cv-header-menu-item>
				<cv-header-menu-item :to="{ name: 'Home' }">Submenu Link 2</cv-header-menu-item>
				<cv-header-menu-item :to="{ name: 'Home' }">Submenu Link 3</cv-header-menu-item>
			</cv-header-menu>
		</cv-header-nav>

		<!-- Global function icons -->
		<template v-slot:header-global>
			<cv-header-global-action
				aria-label="Notifications"
				aria-controls="panel-1"
				@click="onFunc1"
				label="Function 1"
				tipPosition="bottom"
				tipAlignment="start"
			>
				<BaseIcon icon="icn-bookmark" />
			</cv-header-global-action>
			<cv-header-global-action
				aria-label="User avatar"
				@click="onFunc2"
				aria-controls="panel-2"
				label="Function 2"
				tipPosition="bottom"
				tipAlignment="center"
			>
				<BaseIcon icon="icn-terminal" />
			</cv-header-global-action>
			<cv-header-global-action
				aria-label="Account section"
				aria-controls="account-panel"
				@click="onFunc3"
				label="Account"
				tipPosition="bottom"
				tipAlignment="end"
			>
				<BaseIcon icon="icn-user" />
			</cv-header-global-action>
		</template>

		<!-- Right user panel -->
		<template v-slot:right-panels>
			<cv-header-panel id="panel-2" @panel-resize="onPanelResize">
				<div class="title large">Title</div>
				<hr />
			</cv-header-panel>

			<cv-header-panel id="panel-1" @panel-resize="onPanelResize">
				<div class="title large">Title</div>
				<hr />
			</cv-header-panel>

			<cv-header-panel id="account-panel" @panel-resize="onPanelResize">
				<div class="title large">Account</div>
				<hr />
				<cv-switcher>
					<cv-switcher-item>
						<cv-switcher-item-link :to="{ name: 'Home' }" selected>Account settings</cv-switcher-item-link>
					</cv-switcher-item>
					<cv-switcher-item>
						<cv-switcher-item-link :to="{ name: 'Home' }">Billing</cv-switcher-item-link>
					</cv-switcher-item>

					<hr />

					<cv-switcher-item>
						<cv-switcher-item-link :to="{ name: 'Home' }">Logout</cv-switcher-item-link>
					</cv-switcher-item>
				</cv-switcher>
			</cv-header-panel>
		</template>
	</cv-header>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
/// Remove superfluous borders that interfere with focus state
.bx--header,
.cv-header-name,
:deep() a.bx--header__menu-item {
	border: none;
}

/// Make top links fit full height
li.cv-header-menu,
li.cv-header-menu-item {
	margin: 0;
}

/// Stylize focus states
.bx--skip-to-content:focus {
	border: none;
	background: $blue;
}
.cv-header-name:focus {
	border: none;
	background: $black;
}
.cv-button.bx--btn {
	// Prevent ugly focus state flash on blur
	transition: none;
}
.cv-button.bx--btn:focus {
	box-shadow: none;
	border: none;
	background: $black;
}
:deep() a.bx--header__menu-item:focus {
	border: none;
	background: $black;
}

/// Side panel
.cv-header-panel {
	background: $black;
}
.bx--header-panel {
	transition: none;
}
.cv-header-panel div.title {
	color: $white;
	margin: 0;
	padding: 1rem;
	font-style: italic;
}
.cv-header-panel hr {
	border-color: $white-10;
	margin: 0.5rem 0;
}

/// Side panel links
.cv-switcher {
	margin: 0;
	padding: 0;
}
li.cv-switcher-item {
	height: 3rem;
	line-height: 3rem;
	margin-top: 0;
}
a.cv-switcher-item-link {
	height: 100%;
	line-height: inherit;
	padding-top: 0;
	padding-bottom: 0;
	font-weight: 400;
}
// Selected state
a.cv-switcher-item-link.bx--switcher__item-link--selected {
	color: $white;
	font-weight: 600;
	background: $black-30;
}

/**
 * Responsive
 */

@media (hover: hover) {
	// Project hover state
	a.cv-header-name:hover {
		background: $black;
	}
	a.cv-header-name:hover + nav::before {
		display: none;
	}

	// Hide underline on hover
	a.cv-header-name:hover,
	:deep() a.bx--header__menu-item:hover,
	:deep() a.cv-switcher-item-link:hover {
		text-decoration: none;
	}

	// Side panel hover state
	a.cv-switcher-item-link:not(.bx--switcher__item-link--selected):hover {
		color: $white;
		background: $black-10;
	}
}
</style>
