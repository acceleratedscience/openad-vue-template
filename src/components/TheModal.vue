<template>
	<component v-if="modalStore.modalName" :is="dynamicModule" @after-modal-hidden="modalStore.clear" @mounted="showModal" />
</template>

<script setup lang="ts">
// Vue
import { defineAsyncComponent, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'

// Stores
import { useModalStore } from '@/stores/ModalStore'
const modalStore = useModalStore()

// Definitions
const loadError = ref<boolean>(false)
const dynamicModule = shallowRef<Component | null>(null)

/**
 * Logic
 */

if (modalStore.modalName) {
	loadDynamicComponent(modalStore.modalName)
}

/**
 * Hooks
 */

watch(
	() => modalStore.modalName,
	(newModalName) => {
		if (newModalName) loadDynamicComponent(newModalName)
	},
)

/**
 * Methods
 */

// Load the correct modal component.
function loadDynamicComponent(modalName: string) {
	dynamicModule.value = defineAsyncComponent(() => {
		return import(`../modals/${modalName}.vue`).catch(() => {
			loadError.value = true
		})
	})
}
// We need the timeout to ensure the component is
// fully mounted or won't get the intro animation.
function showModal() {
	console.log('showModal')
	setTimeout(modalStore.show, 10)
}
</script>

<style lang="scss" scoped></style>
