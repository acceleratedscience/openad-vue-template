<script setup lang="ts">
// Vue
import { computed, onMounted } from 'vue'

// Type declarations
import type { ComputedRef } from 'vue'
export type CheckboxItem = {
	label: string
	value: string
	checked?: boolean
	disabled?: boolean
}

// Emits
const emit = defineEmits(['update:modelValue']) // v-model

// Props
const props = withDefaults(
	defineProps<{
		modelValue: string[] // v-model
		label?: string
		items: CheckboxItem[]
		horizontal?: boolean
		invalidMessage?: string | null
		warningMessage?: string | null
	}>(),
	{
		horizontal: false,
	},
)

/**
 * Computed properties
 */

// v-model
const theModelValue: ComputedRef<string[]> = computed({
	get() {
		return props.modelValue
	},
	set(val) {
		console.log(22, val)
		emit('update:modelValue', val)
	},
})

/**
 * Hooks
 */

onMounted(() => {
	// Add checked items to the model value
	props.items.forEach((item) => {
		if (item.checked) theModelValue.value.push(item.value)
	})
})

/**
 * Methods
 */
function updateModelValue(i: number, value: string, add: boolean) {
	console.log(29, updateModelValue)
	if (add) {
		theModelValue.value.push(value)
	} else {
		theModelValue.value.splice(theModelValue.value.indexOf(value), 1)
	}
}
</script>

<!----------------------------------------------------->

<template>
	<div class="checkbox-group">
		<label v-if="label">{{ label }}</label>
		<div class="checkbox-wrap" :class="{ 'cbw-h': horizontal, 'cbw-v': !horizontal }">
			<cv-checkbox
				v-for="(item, i) in items"
				:key="i"
				:label="item.label"
				:value="item.value"
				:disabled="item.disabled || false"
				:checked="item.checked || (theModelValue && theModelValue.includes(item.value)) || false"
				:class="{ error: !!invalidMessage }"
				@change="(state: boolean) => updateModelValue(i, item.value, state)"
			></cv-checkbox>
		</div>
		<div v-if="invalidMessage" class="error-msg xsmall">{{ invalidMessage }}</div>
		<div v-else-if="warningMessage" class="warning-msg xsmall">{{ warningMessage }}</div>
	</div>
</template>

<!----------------------------------------------------->

<style scoped lang="scss"></style>
