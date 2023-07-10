<script lang="ts" setup>
import { TvButton } from '@components/button'

const emits = defineEmits<{
  (e: 'on:action', ...args): void
}>()
</script>
<template>
	<li class="navbar-item">
		<tv-button @onPressed="emits('on:action')" class="navbar-item__button" variant="plain" in-dark-mode is-full-width>
			<slot />
		</tv-button>
	</li>
</template>

<style lang="scss" scoped>
@use '@/scss/6-components/navbar-item' as *;
</style>
