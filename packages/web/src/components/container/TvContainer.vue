<script lang="ts" setup>
const props = withDefaults(
	defineProps<{
		isFullWidth: boolean
	}>(),
	{
		isFullWidth: false
	}
)
</script>
<template>
	<div :class="['container', { 'is-full-width': props.isFullWidth }]" class="container">
		<slot />
	</div>
</template>
