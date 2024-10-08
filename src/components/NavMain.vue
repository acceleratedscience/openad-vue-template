<script setup lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
// Router
import { useRoute } from 'vue-router'
const route = useRoute()

// Type declarations
type _HomeLink = {
	prefix: string
	name: string
	routeName: string
}
type _NavItem = {
	name: string
	routeName: string
}
type _NavItemList = {
	name: string
	items: _NavItem[]
}
type _SidePanel = {
	icon: string
	title: string
	name: string
	items: (_NavItem | { sep: boolean })[]
	tipPosition?: 'left' | 'right' | 'top' | 'bottom'
	tipAlignment?: 'start' | 'center' | 'end'
	fn?: () => void
}
export type NavMainTree = {
	homeLink: _HomeLink
	items: (_NavItem | _NavItemList)[]
	sidePanels: _SidePanel[]
}
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
// Vue
// import { ref, computed } from 'vue'

// // Router
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

// Type declarations
// import type { ComputedRef } from 'vue'
<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)

// Components
import BaseIcon from '@/components/BaseIcon.vue'

<<<<<<< HEAD
<<<<<<< HEAD
// Props
const props = defineProps<{
	tree: NavMainTree
}>()
const { homeLink, items, sidePanels } = props.tree
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
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
<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)

/**
 * Methods
 */
<<<<<<< HEAD
<<<<<<< HEAD

function blurFocus() {
	;(document.activeElement as HTMLAnchorElement)?.blur()
}
</script>

<!----------------------------------------------------->

<template>
	<!-- https://vue.carbondesignsystem.com/?path=/docs/component-ui-select-cvheader--default-story -->
	<cv-header aria-label="Main navigation">
		<!-- Accessibility skip link (first tab) -->
		<cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>

		<!-- Project title -->
		<cv-header-name :prefix="homeLink.prefix" :to="{ name: homeLink.routeName }">{{ homeLink.name }}</cv-header-name>

		<!-- Menu items -->
		<cv-header-nav v-if="items.length" aria-label="Main navigation links">
			<template v-for="(item, i) in items" :key="i">
				<cv-header-menu v-if="'items' in item" :title="item.name">
					<cv-header-menu-item v-for="(subItem, j) in item.items" :key="j" :to="{ name: subItem.routeName }">{{
						subItem.name
					}}</cv-header-menu-item>
				</cv-header-menu>
				<cv-header-menu-item v-else :to="{ name: item.routeName }">{{ item.name }}</cv-header-menu-item>
			</template>
		</cv-header-nav>

		<!-- Side panel icons -->
		<template v-slot:header-global>
			<cv-header-global-action
				v-for="(panel, i) in sidePanels"
				:key="i"
				:label="panel.title"
				:aria-label="'Panel: ' + panel.title"
				:aria-controls="'panel-' + panel.name"
				:tipPosition="panel.tipPosition || 'bottom'"
				:tipAlignment="panel.tipAlignment || 'end'"
				@click="panel.fn?.()"
			>
				<BaseIcon :icon="panel.icon" />
			</cv-header-global-action>
		</template>

		<!-- Side panels -->
		<template v-if="sidePanels.length" v-slot:right-panels>
			<cv-header-panel v-for="(panel, i) in sidePanels" :key="i" :id="`panel-${panel.name}`">
				<!-- Panel title -->
				<div class="title large">{{ panel.title }}</div>
				<hr />
				<cv-switcher>
					<template v-for="(item, j) in panel.items" :key="j">
						<!-- Separator -->
						<hr v-if="'sep' in item" />

						<!-- Link -->
						<cv-switcher-item v-else>
							<cv-switcher-item-link :to="{ name: item.routeName }" :selected="route.name == item.name" @click="blurFocus">{{
								item.name
							}}</cv-switcher-item-link>
						</cv-switcher-item>
					</template>
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
</script>

<template>
	<cv-header aria-label="Main navigation">
		<cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>
		<cv-header-name href="javascript:void(0)" prefix="OpenAD">Portal</cv-header-name>

		<!-- Menu items -->
		<cv-header-nav aria-label="Carbon nav">
			<cv-header-menu-item href="javascript:void(0)">Link 1</cv-header-menu-item>
			<cv-header-menu-item href="javascript:void(0)">Link 2</cv-header-menu-item>
			<cv-header-menu aria-label="Link 3" title="Link 3">
				<cv-header-menu-item href="javascript:void(0)">Submenu Link 1</cv-header-menu-item>
				<cv-header-menu-item href="javascript:void(0)">Submenu Link 2</cv-header-menu-item>
				<cv-header-menu-item href="javascript:void(0)">Submenu Link 3</cv-header-menu-item>
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
						<cv-switcher-item-link href="javascript:void(0)" selected>Account settings</cv-switcher-item-link>
					</cv-switcher-item>
					<cv-switcher-item>
						<cv-switcher-item-link href="javascript:void(0)">Billing</cv-switcher-item-link>
					</cv-switcher-item>

					<hr />

					<cv-switcher-item>
						<cv-switcher-item-link href="javascript:void(0)">Logout</cv-switcher-item-link>
					</cv-switcher-item>
<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
				</cv-switcher>
			</cv-header-panel>
		</template>
	</cv-header>
</template>

<<<<<<< HEAD
<<<<<<< HEAD
<!----------------------------------------------------->

=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
<style scoped lang="scss">
/// Remove superfluous borders that interfere with focus state
.bx--header,
.cv-header-name,
:deep() a.bx--header__menu-item {
	border: none;
}

<<<<<<< HEAD
<<<<<<< HEAD
/// Make top links fit full height
li.cv-header-menu,
li.cv-header-menu-item {
	margin: 0;
}

// Make side panel links fit full width
.cv-header-panel.bx--header-panel--expanded {
	border: none;
}

/// Ignore visited link styling
// Project title
a.cv-header-name.router-link-exact-active {
	text-decoration: none;
	color: white;
}

// Main links
:deep() .cv-header-menu-item > a.router-link-exact-active {
	text-decoration: none;
	color: $white;
	position: relative;
	font-weight: 600;
}
:deep() .cv-header-menu-item > a.router-link-exact-active::after {
	content: '';
	display: block;
	width: 100%;
	height: 0.25rem;
	position: absolute;
	bottom: 0;
	left: 0;
	background: $blue-light;
}
:deep() ul ul .cv-header-menu-item > a.router-link-exact-active::after {
	// background: red;
	width: 0.25rem;
	height: 100%;
}

/// Icon links (for side panels)
.bx--btn.bx--btn--icon-only svg {
	// Carbon fix that avoids white flash on load
	fill: revert-layer;
}

=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
/// Stylize focus states
.bx--skip-to-content:focus {
	border: none;
	background: $blue;
}
.cv-header-name:focus {
	border: none;
	background: $black;
}
<<<<<<< HEAD
<<<<<<< HEAD
.cv-button.bx--btn {
	// Prevent ugly focus state flash on blur
	transition: none;
}
=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
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
<<<<<<< HEAD
<<<<<<< HEAD
// Current-page state
a.cv-switcher-item-link.router-link-exact-active {
	text-decoration: none;
	position: relative;
}
a.cv-switcher-item-link.router-link-exact-active::after {
	content: '';
	display: block;
	height: 100%;
	width: 0.25rem;
	position: absolute;
	bottom: 0;
	left: 0;
	background: $blue-light;
}
=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)

/**
 * Responsive
 */

@media (hover: hover) {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
	a.cv-switcher-item-link:not(.bx--switcher__item-link--selected):hover {
		color: $white;
		background: $black-10;
	}
}
</style>
