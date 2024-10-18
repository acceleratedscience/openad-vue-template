<script setup lang="ts">
// Vue
import { ref, computed } from 'vue'

// Router
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// // Stores
// import { useModalStore } from '@/stores/ModalStore'
// const modalStore = useModalStore()

// Type declarations
import type { ComputedRef } from 'vue'

// Components
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs.vue'

// Utils

// Definitions
const $options = ref<HTMLElement | null>(null) // Use $ to indicate an HTML element ref
const flavorOptions = [
	'vanilla',
	'chocolate',
	'strawberry',
	'pistachio',
	'banana',
	'raspberry',
	'cherry',
	'mango',
	'lemon',
	'lime',
	'passion fruit',
	'caramel',
	'bueno',
]
const vmFlavor = ref<string>('')
const flavor = ref<string | null>(null)
const screenWidth = ref<number>(window.innerWidth)

// Props
// Notes:
// - withDefaults is optional
// - if you wish to access props in your JS, you need to define them:
//	 const props = defineProps...
//   --> props.foobar
withDefaults(
	defineProps<{
		showScreenWidth?: boolean
	}>(),
	{
		showScreenWidth: true,
	},
)

/**
 * Computed properties
 */

const flavorDisplay: ComputedRef<string> = computed(() => {
	if (!flavor.value) return 'None chosen yet...'
	return flavor.value[0].toUpperCase() + flavor.value.slice(1) + ' :)'
})

/**
 * Methods
 */

function randomFlavor() {
	let flav = flavor.value
	while (flav == flavor.value) {
		flav = flavorOptions[Math.floor(Math.random() * flavorOptions.length)]
	}
	flavor.value = flav
}

function submitFlavor() {
	if (!vmFlavor.value) {
		alert("You didn't enter any flavor...")
		return
	}
	updateFlavor(vmFlavor.value)
}

function updateFlavor(customFlavor: string) {
	flavor.value = customFlavor ? customFlavor : flavorOptions[Math.floor(Math.random() * flavorOptions.length)]
}
</script>

<!----------------------------------------------------->

<template>
	<BaseBreadcrumbs />
	<h1>Flavor Picker</h1>

	<div id="options" ref="$options">
		<cv-form @submit.prevent="submitFlavor">
			<cv-text-input label="Choose your flavor" placeholder="custom flavor" v-model="vmFlavor"></cv-text-input>
			<div>
				<cv-button>Submit</cv-button>
			</div>
		</cv-form>
		<cv-button @click="randomFlavor" kind="secondary">Random</cv-button>
	</div>
	<div id="display">
		Your flavor:
		<div :class="{ soft: !flavor }">{{ flavorDisplay }}</div>
	</div>
	<div v-if="showScreenWidth" id="screen-width">Screen width: {{ screenWidth }} / Options height: {{ $options?.offsetHeight }}</div>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
#options {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	gap: 1rem;
}
#options form {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	flex: 1;
	gap: 0;
}
#display {
	margin-top: 3rem;
}
#display > div {
	font-size: 1.5rem;
	margin-top: 0.5rem;
}
#screen-width {
	position: fixed;
	bottom: 0;
	right: 0;
	padding: 0.5rem;
	opacity: 0.3;
	font-size: $font-size-small;
}

/**
 * Responsive
 */

@media (max-width: $bp-small) {
	#options {
		flex-direction: column;
		align-items: flex-start;
	}
	#options form {
		width: 100%;
	}
}
@media (max-width: $bp-xsmall) {
	#options form {
		flex-direction: column;
	}
	#options form > * {
		width: 100%;
	}
	button {
		width: 100%;
		max-width: none;
	}
}
</style>
