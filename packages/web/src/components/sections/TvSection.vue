<script lang="ts" setup>
const props = withDefaults(defineProps<{
	name: string,
}>(), {
	name: 'World',
})
</script>
<template>
	<div class="section-list">
		<div class="section-list__header">
			{{ props.name }}
		</div>
		<div class="section-list__content mt-md">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/scss/7-modules/section-list' as *;
</style>
