<script setup lang="ts">
// Vue
import { ref, onMounted, onBeforeUnmount } from 'vue'

// // Router
// import { useRouter, useRoute } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

// Stores
import { useModalStore } from '@/stores/ModalStore'
const modalStore = useModalStore()

// Type declarations
import type { ActionOption } from '@/components/OverflowMenu.vue'
type MultiSelectOption = {
	name: string
	label: string
	value: string
}
type CheckBoxRadioOption = {
	label: string
	value: string
	disabled?: boolean
}

// Components
import ScrollToTop from '@/components/ScrollToTop.vue'
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue'
import TableData from '@/components/TableData.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseFetching from '@/components/BaseFetching.vue'
import BaseLoading from '@/components/BaseLoading.vue'
import BasePagination from '@/components/BasePagination.vue'
import OverflowMenu from '@/components/OverflowMenu.vue'
import ExpandableSection from '@/components/ExpandableSection.vue'
import BaseIconButton from '@/components/BaseIconButton.vue'
import BaseSection___________________________________ from '@/components/BaseSection.vue'

// Utils
import {
	timeAgo,
	prettyDate,
	prettySize,
	prettyNr,
	largeNr,
	capitalize,
	slugify,
	query2UrlQuery,
	isObject,
	debounce,
	throttle,
	lockScroll,
} from '@/utils/helpers'
import domLog from '@/utils/dom-log'

// Definitions
const dropdownOptions = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c', disabled: true },
]
const vmDropdown = ref<string>(dropdownOptions[1].value)
const vmTextInput = ref<string>('')
const multiSelectOptions = [
	{ name: 'option-a', label: 'Option A', value: 'a' },
	{ name: 'option-b', label: 'Option B', value: 'b' },
	{ name: 'option-c', label: 'Option C', value: 'c' },
]
const vmMultiselect = ref<MultiSelectOption[]>([])
const vmPagination = ref<number>(1)
const checkboxRadioOptions: CheckBoxRadioOption[] = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c', disabled: true },
]
const vmCheckbox = ref<string[]>([checkboxRadioOptions[1].value])
const vmRadio = ref<string>(checkboxRadioOptions[1].value)
const someObj = { foo: 'Foo', bar: 'Bar', baz: 123 }
const tableData1 = [
	['foo', 'bar', 'baz'],
	[125, 840, 109],
	[925, 162, 735],
	[534, 231, 610],
]
const tableData2 = [
	{
		foo: 1,
		bar: 2,
		baz: 3,
		qux: 4,
		pox: 5,
		cor: 6,
		gar: 7,
		bor: 8,
		wal: 9,
		fer: 10,
		plu: 11,
		zab: 12,
		wis: 13,
		lor: 14,
		ler: 15,
		blo: 16,
		sid: 17,
		ame: 18,
		kop: 19,
		bru: 20,
	},
	{
		foo: 21,
		bar: 22,
		baz: 23,
		qux: 24,
		pox: 25,
		cor: 26,
		gar: 27,
		bor: 28,
		wal: 29,
		fer: 30,
		plu: 31,
		zab: 32,
		wis: 33,
		lor: 34,
		ler: 35,
		blo: 36,
		sid: 37,
		ame: 38,
		kop: 39,
		bru: 40,
	},
	{
		foo: 41,
		bar: 42,
		baz: 43,
		qux: 44,
		pox: 45,
		cor: 46,
		gar: 47,
		bor: 48,
		wal: 49,
		fer: 50,
		plu: 51,
		zab: 52,
		wis: 53,
		lor: 54,
		ler: 55,
		blo: 56,
		sid: 57,
		ame: 58,
		kop: 59,
		bru: 60,
	},
	{
		foo: 61,
		bar: 62,
		baz: 63,
		qux: 64,
		pox: 65,
		cor: 66,
		gar: 67,
		bor: 68,
		wal: 69,
		fer: 70,
		plu: 71,
		zab: 72,
		wis: 73,
		lor: 74,
		ler: 75,
		blo: 76,
		sid: 77,
		ame: 78,
		kop: 79,
		bru: 80,
	},
	{
		foo: 81,
		bar: 82,
		baz: 83,
		qux: 84,
		pox: 85,
		cor: 86,
		gar: 87,
		bor: 88,
		wal: 89,
		fer: 90,
		plu: 91,
		zab: 92,
		wis: 93,
		lor: 94,
		ler: 95,
		blo: 96,
		sid: 97,
		ame: 98,
		kop: 99,
		bru: 100,
	},
]
const tableData3 = {
	name: 'John Doe',
	age: 30,
	occupation: null,
}
const $demoDebounce = ref<HTMLTextAreaElement | null>(null)
const $demoThrottle = ref<HTMLTextAreaElement | null>(null)
const debouncer = debounce(resizeHandlerDebounce, 300)
const throttler = throttle(resizeHandlerThrottle, 300)
let debounceObserver: ResizeObserver | null = null
let throttleObserver: ResizeObserver | null = null
const scrollLocked = ref<boolean>(false)
const clickToCopyActive = ref<boolean>(false)
const overflowMenuOptions: ActionOption[] = [
	{
		val: 'option-1',
		disp: 'Option 1',
		action: () => {
			alert(1)
		},
	},
	{
		val: 'option-2',
		disp: 'Option 2',
		selected: true,
		action: () => {
			alert(2)
		},
	},
	{
		val: 'option-3',
		disp: 'Option 3',
		action: () => {
			alert(3)
		},
	},
	{
		val: 'option-x',
		disp: 'Option 2',
		hide: true,
	},
]
const paragraph =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia tincidunt vehicula. Vestibulum aliquam in sapien egestas <a href="#">volutpat</a>. Praesent blandit blandit ex, eu ullamcorper mi gravida ut. Praesent a orci libero. Ut et turpis a ipsum ullamcorper convallis ut a leo. Sed malesuada quam ullamcorper nunc <a href="#">venenatis</a>, id sagittis purus malesuada. Pellentesque efficitur rhoncus dolor ut luctus. Ut libero diam, convallis ut neque et, <span class="soft">molestie convallis</span> ligula. Cras feugiat quis odio ut facilisis. Sed non aliquam erat.'
let demoDomLogIndex = 0

/**
 * Hooks
 */

onMounted(() => {
	// Debounce demo
	if ($demoDebounce.value) {
		debounceObserver = new ResizeObserver(debouncer)
		debounceObserver.observe($demoDebounce.value)
	}

	// Throttle demo
	if ($demoThrottle.value) {
		throttleObserver = new ResizeObserver(throttler)
		throttleObserver.observe($demoThrottle.value)
	}
})

onBeforeUnmount(() => {
	// Debounce demo
	if (debounceObserver) {
		debounceObserver.disconnect()
	}

	// Throttle demo
	if (throttleObserver) {
		throttleObserver.disconnect()
	}
})

/**
 * Methods
 */

// Button loading state
function onButtonClick(e: MouseEvent) {
	const btn = e.target as HTMLButtonElement
	btn.classList.add('loading')
	setTimeout(() => {
		btn.classList.remove('loading')
		btn.blur()
	}, 2000)
}

// Dropdown callback
function onDropdownChange() {
	console.log('Dropdown changed:', vmDropdown.value)
}

// Checkbox callback
function onCheckboxChange() {
	console.log('Checkbox checked:', vmCheckbox.value)
}

// Radio callback
function onRadioChange() {
	console.log('Radio changed:', vmRadio.value)
}

// Resize handler for debounce demo
function resizeHandlerDebounce() {
	if ($demoDebounce.value) {
		$demoDebounce.value.value = $demoDebounce.value.offsetWidth + 'px'
		$demoDebounce.value.style.background = _randomRGB()
	}
}

// Resize handler for throttle demo
function resizeHandlerThrottle() {
	if ($demoThrottle.value) {
		$demoThrottle.value.value = $demoThrottle.value.offsetWidth + 'px'
		$demoThrottle.value.style.background = _randomRGB()
	}
}

// Create random RGB color
function _randomRGB() {
	const r = 100 + Math.floor(Math.random() * (256 - 100 - 20))
	const g = 100 + Math.floor(Math.random() * (256 - 100 - 20))
	const b = 100 + Math.floor(Math.random() * (256 - 100 - 20))
	return `rgb(${r}, ${g}, ${b})`
}

// Demo lock scroll
function demoLockScroll(state: boolean) {
	lockScroll(state)
	scrollLocked.value = state
}

// Demo conditional click to copy
function isClickToCopyActive() {
	return clickToCopyActive.value
}
function toggleClickToCopyActive() {
	clickToCopyActive.value = !clickToCopyActive.value
	return false
}

// DOM logging
function demoDomLog() {
	const err = new Error('This is an error message')
	const data = [
		"This is a logger for mobile and Jupyter iframe debugging, when we don't have easy access to the console. Keep on clicking the button to see different DOM logs.",
		{ foo: 'Foo', bar: 'Bar', baz: 123 },
		[1, 2, 3, 4, 5],
		null,
		err,
	]
	domLog(data[demoDomLogIndex])
	demoDomLogIndex++
}

/**
 * Modal functions
 */

async function alertPromise() {
	console.log(22, modalStore)
	const result = await modalStore.alert('Hello world', {
		title: 'I block the thread',
		secondaryBtn: true,
		onSubmit,
		onCancel,
	})

	if (result) {
		console.log('Continue after SUBMIT')
	} else {
		console.log('Continue after CANCEL')
	}
}

async function confirmPromise() {
	const result = await modalStore.confirm('Are you sure?', { onSubmit, onCancel })

	if (result) {
		console.log('Continue after SUBMIT')
	} else {
		console.log('Continue after CANCEL')
	}
}

function onSubmit() {
	alert('yes')
	modalStore.hide()
}
function onCancel() {
	alert('no')
	modalStore.hide()
}
function onOther() {
	alert('Other button')
	modalStore.hide()
}
</script>

<!----------------------------------------------------->

<template>
	<ScrollToTop />

	<BaseBreadcrumbs :pathArray="['Home', 'Template showcase']" />

	<h1>Template Showcase</h1>
	<i class="sub-header">Overview of styles, components, utility functions and more.</i>

	<br /><br /><br />
	<h3>Table of contents</h3>
	<ol>
		<li><a href="#text-styles" class="incog">Text styles</a><br /></li>
		<li><a href="#table-data" class="incog">Table data</a><br /></li>
		<li><a href="#collapsable-sections" class="incog">Collapsable sections</a><br /></li>
		<li><a href="#form-elements" class="incog">Form elements</a><br /></li>
		<li><a href="#modals" class="incog">Modals</a><br /></li>
		<li><a href="#various-ui-elements" class="incog">Various UI elements</a><br /></li>
		<li><a href="#icons" class="incog">Icons</a><br /></li>
		<li><a href="#icon-buttons" class="incog">Icon buttons</a><br /></li>
		<li><a href="#animations" class="incog">Animations</a><br /></li>
		<li><a href="#loaders" class="incog">Loaders</a><br /></li>
		<li><a href="#number-display" class="incog">Number display</a><br /></li>
		<li><a href="#string-manipulations" class="incog">String manipulations</a><br /></li>
		<li><a href="#utility-functions" class="incog">Utility functions</a><br /></li>
		<li><a href="#custom-directives" class="incog">Custom directives</a><br /></li>
	</ol>

	<br />
	<br />

	<!-- #region #title-styles -->
	<BaseSection___________________________________ title="Text styles" />

	<h1>Header 1</h1>
	<h2>Header 2</h2>
	<h3>Header 3</h3>
	<h4>Header 4</h4>
	<h5>Header 5</h5>

	<h4 class="title">Link types</h4>
	<ul>
		<li>This is an <a href="http://vuejs.org">regular link</a></li>
		<li>This is an <a href="http://vuejs.org" class="incog">incognito link</a></li>
		<li>This is an <a href="http://vuejs.org" class="lookup">lookup link</a></li>
		<li>This is an <a href="http://vuejs.org" class="anchor">anchor link</a></li>
		<li>This is an <a href="http://vuejs.org" class="anchor incog">incognito anchor link</a></li>
	</ul>

	<br />

	<p class="xlarge"><b>This is an extra-large paragraph:</b> <span v-html="paragraph"></span></p>
	<p class="large"><b>This is a large paragraph:</b> <span v-html="paragraph"></span></p>
	<p><b>This is a regular paragraph:</b> <span v-html="paragraph"></span></p>
	<p class="small"><b>This is a small paragraph:</b> <span v-html="paragraph"></span></p>
	<p class="xsmall"><b>This is a extra-small paragraph:</b> <span v-html="paragraph"></span></p>

	<h4 class="title">Header + paragraph</h4>
	<p v-html="paragraph"></p>

	<!-- #endregion -->
	<!-- #region #table-data -->
	<BaseSection___________________________________ title="Table data" />

	<TableData :data="tableData1" :allowCopy="true" :inline="true" :header="false" />
	<br /><br />
	<TableData :data="tableData1" :allowCopy="true" />
	<br />
	<TableData :data="tableData2" :allowCopy="false" />
	<br />
	<TableData :data="tableData3" />

	<!-- #endregion -->
	<!-- #region #collapsible-sections -->
	<BaseSection___________________________________ title="Collapsable sections" />

	<ExpandableSection>
		<template #title>Expandable section</template>
		<template #content><span v-html="paragraph"></span></template>
	</ExpandableSection>

	<ExpandableSection :anchor="true">
		<template #title>Expandable section with anchor</template>
		<template #content><span v-html="paragraph"></span></template>
	</ExpandableSection>

	<ExpandableSection anchor="custom-anchor-link">
		<template #title>Expandable section with anchor and custom anchor link</template>
		<template #content><span v-html="paragraph"></span></template>
	</ExpandableSection>

	<!-- #endregion -->
	<!-- #region #form-elements -->
	<BaseSection___________________________________ title="Form elements" />

	<!-- https://vue.carbondesignsystem.com -->

	<cv-form>
		<!-- Group 1 -->
		<cv-form-group>
			<template #label>Form Group: Dropdowns</template>
			<template #content>
				<div>
					<cv-dropdown
						v-model="vmDropdown"
						label="Inline state:"
						placeholder="- Select -"
						:light="false"
						:up="false"
						:inline="true"
						:helper-text="null"
						:warning-message="null"
						:invalid-message="null"
						:disabled="false"
						size="sm"
						@change="onDropdownChange"
						style="display: inline-block"
					>
						<cv-dropdown-item v-for="({ value, label }, i) in dropdownOptions" :key="i" :value="value">
							{{ label }}
						</cv-dropdown-item>
					</cv-dropdown>
				</div>

				<cv-dropdown
					v-model="vmDropdown"
					label="Light state"
					placeholder="- Select -"
					:light="true"
					:up="false"
					:inline="false"
					:helper-text="null"
					:warning-message="null"
					:invalid-message="null"
					:disabled="false"
					size="lg"
					@change="onDropdownChange"
				>
					<cv-dropdown-item v-for="({ value, label }, i) in dropdownOptions" :key="i" :value="value">
						{{ label }}
					</cv-dropdown-item>
				</cv-dropdown>

				<cv-dropdown
					v-model="vmDropdown"
					label="Regular state"
					placeholder="- Select -"
					:light="false"
					:up="false"
					:inline="false"
					:helper-text="null"
					:warning-message="null"
					:invalid-message="null"
					:disabled="false"
					size="lg"
					@change="onDropdownChange"
				>
					<cv-dropdown-item v-for="({ value, label }, i) in dropdownOptions" :key="i" :value="value">
						{{ label }}
					</cv-dropdown-item>
				</cv-dropdown>

				<cv-dropdown
					v-model="vmDropdown"
					label="Warning state"
					placeholder="- Select -"
					:light="false"
					:up="false"
					:inline="false"
					:helper-text="null"
					warning-message="Warning message"
					:invalid-message="null"
					:disabled="false"
					size="lg"
					@change="onDropdownChange"
				>
					<cv-dropdown-item v-for="({ value, label }, i) in dropdownOptions" :key="i" :value="value">
						{{ label }}
					</cv-dropdown-item>
				</cv-dropdown>

				<cv-dropdown
					v-model="vmDropdown"
					label="Error state"
					placeholder="- Select -"
					:light="false"
					:up="false"
					:inline="false"
					:helper-text="null"
					:warning-message="null"
					invalid-message="Error message"
					:disabled="false"
					size="lg"
					@change="onDropdownChange"
				>
					<cv-dropdown-item value="stylized"><i style="color: #d00">Stylized</i></cv-dropdown-item>
					<cv-dropdown-item v-for="({ value, label }, i) in dropdownOptions" :key="i" :value="value">
						{{ label }}
					</cv-dropdown-item>
				</cv-dropdown>
			</template>
		</cv-form-group>
		<cv-form-group>
			<template #label>Form Group: Text input</template>
			<template #content>
				<cv-text-input label="Text input" placeholder="placeholder" v-model="vmTextInput"></cv-text-input>
				<cv-text-area label="Textarea input" placeholder="placeholder" v-model="vmTextInput"></cv-text-area>
			</template>
		</cv-form-group>

		<!-- Group 2 -->
		<cv-form-group>
			<template #label>Form Group: Checkboxes & radio buttons</template>
			<template #content>
				<div class="checkbox-wrap cbw-h">
					<cv-checkbox
						v-for="(option, i) in checkboxRadioOptions"
						:key="i"
						@change="onCheckboxChange"
						v-model="vmCheckbox"
						:label="option.label"
						:value="option.value"
						:disabled="option.disabled"
					></cv-checkbox>
				</div>

				<div class="checkbox-wrap cbw-v">
					<cv-checkbox
						v-for="({ value, label, disabled }, i) in checkboxRadioOptions"
						:key="i"
						@change="onCheckboxChange"
						v-model="vmCheckbox"
						:label="label"
						:value="value"
						:disabled="disabled"
					></cv-checkbox>
				</div>

				<small style="margin-top: -1.5rem" class="soft">Checked: {{ vmCheckbox }}</small>

				<cv-radio-group @change="onRadioChange" legendText="Choose your option" :hideLegend="false" :vertical="true">
					<cv-radio-button
						v-for="({ value, label, disabled }, i) in checkboxRadioOptions"
						v-model="vmRadio"
						:key="i"
						name="radio-group-1"
						:label="label"
						:value="value"
						:disabled="disabled"
						:hide-label="false"
						:label-left="true"
					/>
				</cv-radio-group>

				<cv-radio-group @change="onRadioChange" legendText="Choose your option" :hideLegend="false" :vertical="false">
					<cv-radio-button
						v-for="({ value, label, disabled }, i) in checkboxRadioOptions"
						v-model="vmRadio"
						:key="i"
						name="radio-group-1"
						:label="label"
						:value="value"
						:disabled="disabled"
						:hide-label="false"
						:label-left="true"
					/>
				</cv-radio-group>

				<small style="margin-top: -1.5rem" class="soft">Selected: {{ vmRadio }}</small>
			</template>
		</cv-form-group>

		<!-- Loose elements -->
		<cv-multi-select label="Multiselect" placeholder="placeholder" v-model="vmMultiselect" :options="multiSelectOptions"></cv-multi-select>
		<cv-button-set>
			<cv-button @click="onButtonClick">Primary</cv-button>
			<cv-button @click="onButtonClick" kind="secondary">Secondary</cv-button>
			<cv-button @click="onButtonClick" kind="tertiary">Tertiary</cv-button>
		</cv-button-set>
	</cv-form>

	<!-- #endregion -->
	<!-- #region #modals -->
	<BaseSection___________________________________ title="Modals" />

	<cv-button-set :stacked="true">
		<cv-button-set>
			<cv-button kind="secondary" @click="modalStore.alert('Hello world')">Simple alert</cv-button>
			<cv-button
				kind="secondary"
				@click="
					modalStore.alert('Hello <span style=\'color: red\'>world</span>', {
						html: true,
						size: 'md',
						primaryBtn: 'One',
						secondaryBtn: 'Two',
						otherBtn: 'Three',
						title: 'Here\'s a title',
						onSubmit,
						onCancel,
						onOther,
					})
				"
			>
				Advanced alert
			</cv-button>
			<cv-button kind="secondary" @click="alertPromise">Alert promise</cv-button>
		</cv-button-set>
		<cv-button-set>
			<cv-button kind="secondary" @click="confirmPromise">Confirm promise</cv-button>
			<cv-button kind="secondary" @click="modalStore.confirm('Are you sure?', { onSubmit, onCancel })">Confirm modal</cv-button>
			<cv-button kind="secondary" @click="modalStore.display('ModalExample')">Custom template</cv-button>
		</cv-button-set>
	</cv-button-set>

	<!-- #endregion -->
	<!-- #region #various-ui-elements -->
	<BaseSection___________________________________ title="Various UI elements" />

	<BaseBreadcrumbs :pathArray="['These', 'Are', 'Some', 'Breadcrumbs']" />

	<div style="display: flex">
		<BasePagination v-model="vmPagination" :total="1000" />
		<OverflowMenu :options="overflowMenuOptions" />
	</div>

	<!-- #endregion -->
	<!-- #region #icons -->
	<BaseSection___________________________________ title="Icons" />

	<p>Large icons</p>
	<BaseIcon icon="icn-terminal" size="large" />
	<BaseIcon icon="icn-arrow-right" size="large" />
	<BaseIcon icon="icn-caret-right" size="large" />
	<BaseIcon icon="icn-bookmark" size="large" />

	<br /><br />

	<p>Small icons</p>
	<BaseIcon icon="icn-terminal" />
	<BaseIcon icon="icn-arrow-right" />
	<BaseIcon icon="icn-caret-right" />
	<BaseIcon icon="icn-bookmark" />

	<br /><br />

	<p>Adding new icons:</p>
	<ol>
		<li>
			In Figma, open the <a target="_blank" href="https://www.figma.com/community/file/969662281543923052">IBM Carbon Icons template</a> (or
			import it as a library) or install the
			<a target="_blank" href="https://www.figma.com/community/plugin/1387090307867322006/carbon-icons">Carbon Icons plugin</a>
		</li>
		<li>Place an icon onto an artboard (or design your own)</li>
		<li>ctrl-click the icon in the layers panel</li>
		<li>Select <code>Copy/Paste as</code> &#8250; <code>Copy as SVG</code></li>
		<li>Paste the SVG code into a new file and save it as <code>icn-&lt;iconname&gt;</code> in <i>/src/assets/icons</i></li>
		<li>Remove any <code>stroke</code> or <code>fill</code> parameters from the <i>&lt;path&gt;</i> element</li>
		<li>Add <code>fill="currentColor"</code> as a parameter to the <i>&lt;svg&gt;</i> element</li>
	</ol>

	<!-- #endregion -->
	<!-- #region #icon-buttons -->
	<BaseSection___________________________________ title="Icon buttons" />

	<div class="icons-wrap">
		<div>
			<small>Default</small>
			<BaseIconButton icon="icn-star" />
		</div>
		<div>
			<small>Soft</small>
			<BaseIconButton icon="icn-star" btnStyle="soft" />
		</div>
		<div>
			<small>Carbon</small>
			<BaseIconButton icon="icn-star" btnStyle="carbon" />
		</div>
		<div>
			<small>Custom colors</small>
			<BaseIconButton icon="icn-star" color="green" colorHover="red" />
		</div>
		<div>
			<small>Toggle</small>
			<BaseIconButton icon="icn-star" :toggle="true" />
		</div>
		<div>
			<small>Toggle with custom color</small>
			<BaseIconButton icon="icn-star" :toggle="true" colorToggle="#d3bf0b" />
		</div>
		<div>
			<small>Mini</small>
			<div class="mini-icon-wrap">
				<BaseIconButton icon="icn-star" :mini="true" />
			</div>
		</div>
	</div>

	<!-- #endregion -->
	<!-- #region #animations -->
	<BaseSection___________________________________ title="Animations" />

	<BaseIcon icon="icn-star" style="animation: rotate 10s linear infinite" />
	&nbsp;&nbsp;
	<BaseIcon icon="icn-doc-full" style="animation: shake-small 500ms linear infinite" />
	&nbsp;&nbsp;
	<BaseIcon icon="icn-folder-full" size="large" style="animation: shake-large 500ms linear infinite" />

	<!-- #endregion -->
	<!-- #region #loaders -->
	<BaseSection___________________________________ title="Loaders" />

	<BaseFetching text="Inline element loading" />
	<br /><br />
	<div style="width: 100%; height: 300px; border: dashed 1px rgba(0, 0, 0, 0.1)">
		<BaseLoading text="Full page loading" style="height: 100%" />
	</div>

	<!-- #endregion -->
	<!-- #region #number-display -->
	<BaseSection___________________________________ title="Number display" />

	<h4 class="title">Time ago</h4>
	<ul>
		<li>{{ timeAgo(Date.now() - 10000) }}</li>
		<li>{{ timeAgo(Date.now() - 100000) }}</li>
		<li>{{ timeAgo(Date.now() - 3550000) }}</li>
		<li>{{ timeAgo(Date.now() - 4000000) }}</li>
		<li>{{ timeAgo(Date.now() - 90000000) }}</li>
		<li>{{ timeAgo(Date.now() - 200000000) }}</li>
		<li>{{ timeAgo(Date.now() - 2000000000) }}</li>
	</ul>
	<h4 class="title">Pretty dates</h4>
	<ul>
		<li>{{ prettyDate(new Date()) }}</li>
		<li>{{ prettyDate(new Date(), true) }}</li>
	</ul>
	<h4 class="title">Pretty size</h4>
	<ul>
		<li>{{ prettySize(1) }}</li>
		<li>{{ prettySize(10) }}</li>
		<li>{{ prettySize(100) }}</li>
		<li>{{ prettySize(1000) }}</li>
		<li>{{ prettySize(10000) }}</li>
		<li>{{ prettySize(100000) }}</li>
		<li>{{ prettySize(1000000) }}</li>
		<li>{{ prettySize(10000000) }}</li>
		<li>{{ prettySize(100000000) }}</li>
		<li>{{ prettySize(1000000000) }}</li>
		<li>{{ prettySize(10000000000) }}</li>
		<li>{{ prettySize(100000000000) }}</li>
		<li>{{ prettySize(1000000000000) }}</li>
		<li>{{ prettySize(10000000000000) }}</li>
		<li>{{ prettySize(100000000000000) }}</li>
		<li>{{ prettySize(1000000000000000) }}</li>
		<li>{{ prettySize(10000000000000000) }}</li>
		<li>{{ prettySize(100000000000000000) }}</li>
		<li>{{ prettySize(1000000000000000000) }}</li>
	</ul>
	<h4 class="title">Pretty number</h4>
	<ul>
		<li>{{ prettyNr(100) }}</li>
		<li>{{ prettyNr(1000) }}</li>
		<li>{{ prettyNr(100000) }}</li>
		<li>{{ prettyNr(1000000) }}</li>
		<li>{{ prettyNr(12345678901234567890) }}</li>
	</ul>
	<h4 class="title">Large number</h4>
	<ol class="compact">
		<!-- 1 -->
		<li>{{ largeNr(10) }}</li>
		<!-- 2 -->
		<li>{{ largeNr(999) }}</li>
		<!-- 3 -->
		<li>{{ largeNr(999.99) }}</li>
		<!-- 4 -->
		<li>{{ largeNr(1000) }}</li>
		<!-- 5 -->
		<li>{{ largeNr(99900) }}</li>
		<!-- 6 -->
		<li>{{ largeNr(99949) }}</li>
		<!-- 7 -->
		<li>{{ largeNr(100000) }}</li>
		<!-- 8 -->
		<li>{{ largeNr(999000) }}</li>
		<!-- 9 -->
		<li>{{ largeNr(999949) }}</li>
		<!-- 10 -->
		<li>{{ largeNr(1000000) }}</li>
		<!-- 11 -->
		<li>{{ largeNr(9900000) }}</li>
		<!-- 12 -->
		<li>{{ largeNr(9949999) }}</li>
		<!-- 13 -->
		<li>{{ largeNr(10000000) }}</li>
		<!-- 14 -->
		<li>{{ largeNr(99000000) }}</li>
		<!-- 15 -->
		<li>{{ largeNr(99949999) }}</li>
		<!-- 16 -->
		<li>{{ largeNr(100000000) }}</li>
		<!-- 17 -->
		<li>{{ largeNr(999900000) }}</li>
		<!-- 18 -->
		<li>{{ largeNr(999949999) }}</li>
		<!-- 19 -->
		<li>{{ largeNr(1000000000) }}</li>
		<!-- 20 -->
		<li>{{ largeNr(99900000000) }}</li>
		<!-- 21 -->
		<li>{{ largeNr(99949999999) }}</li>
		<!-- 22 -->
		<li>{{ largeNr(100000000000) }}</li>
		<!-- 23 -->
		<li>{{ largeNr(999000000000) }}</li>
		<!-- 24 -->
		<li>{{ largeNr(999949999999) }}</li>
		<!-- 25 -->
		<li>{{ largeNr(1000000000000) }}</li>
	</ol>

	<!-- #endregion -->
	<!-- #region #string-manipulations -->
	<BaseSection___________________________________ title="String manipulations" />

	<h4 class="title">Capitalize</h4>
	Input: 'hello world'<br />
	Output: <i>'{{ capitalize('hello world') }}'</i>

	<h4 class="title">Slugify</h4>
	Input: 'Hello world'<br />
	Output: <i>'{{ slugify('hello world') }}'</i>

	<!-- #endregion -->
	<!-- #region #utility-functions -->
	<BaseSection___________________________________ title="Utility functions" />

	<h4 class="title">Query to URL query</h4>
	<p>
		Input: <code>{{ someObj }}</code>
		<br />
		Output: <i>{{ query2UrlQuery(someObj) }}</i>
	</p>

	<h4 class="title">Object detection</h4>
	<p>
		Input A: <code>{{ someObj }}</code>
		<br />
		Input B: <code>[1,2,3,4,5]</code>
		<br />
		Output A: <i>{{ isObject(someObj) }}</i>
		<br />
		Output B: <i>{{ isObject([1, 2, 3, 4, 5]) }}</i>
	</p>

	<h4 class="title">Debounce</h4>
	<textarea ref="$demoDebounce" style="width: 100%; height: 60px; max-height: 60px; min-height: 60px"></textarea>

	<h4 class="title">Throttle</h4>
	<textarea ref="$demoThrottle" style="width: 100%; height: 60px; max-height: 60px; min-height: 60px"></textarea>

	<h4 class="title">Lock scroll</h4>
	<p>
		<cv-button-set>
			<cv-button v-if="scrollLocked" size="small" @click="demoLockScroll(false)">Unlock scroll</cv-button>
			<cv-button v-else size="small" kind="danger" @click="demoLockScroll(true)">Lock scroll</cv-button>
		</cv-button-set>
	</p>

	<h4 class="title">DOM logger</h4>
	<cv-button @click="demoDomLog">Log data</cv-button>

	<!-- #endregion -->
	<!-- #region #custom-directives -->
	<BaseSection___________________________________ title="Custom directives" />

	<h4 class="title">v-click-to-copy</h4>
	<span v-click-to-copy>Copy content</span> (span)<br />
	<a v-click-to-copy data-copy="I'm custom content">Copy custom content</a> (a)<br />
	<a href="#" @click.prevent v-click-to-copy="isClickToCopyActive" data-copy="Conditional click to copy was successful"
		>Conditionally copy content</a
	>
	(a) [<a href="#" @click.prevent="toggleClickToCopyActive">{{ clickToCopyActive ? 'deactivate' : 'activate' }}</a
	>]

	<!-- #endregion -->
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
h4.title {
	margin-top: 1.5rem;
	margin-bottom: 0.25rem;
}
h4.title + p {
	margin-top: 0;
}
.icons-wrap {
	display: flex;
	font-size: $font-size-small;
}
.icons-wrap > div {
	border-right: solid 1px $black-10;
	padding-right: 2rem;
	margin-right: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}
.icons-wrap > div:last-child {
	border: none;
}
.icons-wrap > div > small {
	width: 100%;
	text-align: center;
}
.icons-wrap .mini-icon-wrap {
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
