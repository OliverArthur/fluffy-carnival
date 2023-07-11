<script lang="ts" setup>
import { TvButton } from '@components/button'

const props = withDefaults(defineProps<{
	name: string
}>(), {
	name: 'World'
})
</script>
<template>
	<div class="section-list">
		<div class="section-list__header">
			{{ props.name }}
			<tv-button variant="outline" theme="primary">Watch more</tv-button>
		</div>
		<div class="section-list__content mt-md">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/scss/7-modules/section-list' as *;
</style>
