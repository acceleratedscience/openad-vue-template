<script setup lang="ts">
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

// Components
import BaseIcon from '@/components/BaseIcon.vue'

// Props
const props = defineProps<{
	tree: NavMainTree
}>()
const { homeLink, items, sidePanels } = props.tree

/**
 * Methods
 */

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

// Side panel links
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
