<script setup lang="ts">
// Vue
import { onMounted } from 'vue'

// Stores
import { useModalStore } from '@/stores/ModalStore'
const modalStore = useModalStore()

// Emits
const emit = defineEmits(['mounted']) // <--

/*
 * Computed
 */

/*
 * Hooks
 */

onMounted(() => emit('mounted')) // <--

/*
 * Methods
 */

async function onSubmit() {
	alert('submit')
	modalStore.hide() // <--
}
</script>

<!----------------------------------------------------->

<template>
	<cv-modal :visible="modalStore.visible" size="xs" @primary-click="onSubmit">
		<template v-slot:title>Title</template>
		<template v-slot:content>
			<p>Content</p>
		</template>
		<template v-slot:secondary-button>Cancel</template>
		<template v-slot:primary-button>Submit</template>
	</cv-modal>
</template>

<!----------------------------------------------------->

<style lang="css" scoped></style>
