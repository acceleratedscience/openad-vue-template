<!-- 
	The word "Fetching..." with animated dots.
 -->

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		text?: string
		failText?: string
		error?: boolean
	}>(),
	{
		text: 'Fetching',
		failText: 'Failed to fetch',
		error: false,
	},
)
</script>

<!----------------------------------------------------->

<template>
	<span v-if="props.error" class="fetching-err">{{ failText }}</span>
	<span v-else class="fetching">{{ text }}</span>
</template>

<!----------------------------------------------------->

<style scoped lang="scss">
.fetching {
	color: #999;
	font-style: italic;
	position: relative;
	line-height: $line-height;
}
.fetching-err {
	color: #d00;
}
.fetching::after {
	content: '';
	animation: ellipsis 800ms infinite;
	width: 20px;
	position: absolute;
	top: 0;
	right: -20px;
}
</style>
