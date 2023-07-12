<script lang="ts" setup>
import { TvHeader } from '@components/header'
import { TvContainer } from '@components/container'
</script>
<template>
	<tv-container class="details-page" is-full-width>
		<tv-header>
			<template #logo> SeriesTube </template>
		</tv-header>
		<div class="details-page__content">
			<slot />
		</div>
	</tv-container>
</template>

<style scoped lang="scss">
@use '@/scss/7-modules/details-page' as *;
</style>
