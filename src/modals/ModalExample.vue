<script setup lang="ts">
// Vue
import { onMounted } from 'vue'

// Stores
import { useModalStore } from '@/stores/ModalStore'
const modalStore = useModalStore()

// Emits
const emit = defineEmits(['mounted']) // <--

/*
 * Hooks
 */

onMounted(() => emit('mounted')) // <--

async function onSubmit() {
	alert('submit')
	modalStore.hide() // <--
}
</script>

<!----------------------------------------------------->

<template>
	<cv-modal :visible="modalStore.visible" size="xs" @primary-click="onSubmit">
		<template v-slot:title>This is a custom modal example</template>
		<template v-slot:content>Here's some custom content</template>
		<template v-slot:secondary-button>No thx</template>
		<template v-slot:primary-button>Yes plz</template>
	</cv-modal>
</template>

<!----------------------------------------------------->

<style lang="css" scoped></style>
