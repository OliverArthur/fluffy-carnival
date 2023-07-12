<script lang="ts" setup>
import { ref, computed } from 'vue'
import { TvContainer } from '@components/container'
import { TvHeader } from '@components/header'
import { TvAutocomplete } from '@components/autocomplete'
import { TvButton } from '@components/button'

import { useShows } from '@store/useShows'
import { useSearchShows } from '@store/useSearchShows'

const shows = useShows()
const searchShow = useSearchShows()
const isSearchOpen = ref(false)

const names = computed(() => {
	if (shows.state.kind === 'LoadedShowState') {
		return shows.state.show.map((show) => show.name)
	}
	return []
})

const searchState = computed(() => searchShow.state.query)

const toggleSearch = () => {
	console.log('toggle search')
	isSearchOpen.value = !isSearchOpen.value
}

const handleSearch = (query: string) => {
	searchShow.fetchShows(query)
}
</script>
<template>
	<tv-container class="main-page" is-full-width>
		<tv-header class="main-page__header">
			<template #logo> SeriesTube </template>
			<template #content>
				<tv-autocomplete
					:toggle-in-mobile="isSearchOpen"
					class="main-page__search"
					:items="names"
					@on:submit="handleSearch"
					v-model="searchState"
					live-search
				/>
			</template>
			<template #actions>
				<tv-button @on-pressed="toggleSearch" class="only-mobile" variant="icon" icon-name="menu" />
			</template>
		</tv-header>
		<div class="main-page__content">
			<slot />
		</div>
	</tv-container>
</template>

<style scoped lang="scss">
@use '@/scss/7-modules/main-page' as *;
</style>
