<script lang="ts" setup>
import { ref, computed } from 'vue'
import { TvContainer } from '@components/container'
import { TvHeader } from '@components/header'
import { TvButton } from '@components/button'
import { TvAutocomplete } from '@components/autocomplete'
import { TvNavbar, TvNavbarItem } from '@components/navbar'

import { useShows } from '@store/useShows'
import { useSearchShows } from '@store/useSearchShows'

const shows = useShows()
const searchShow = useSearchShows()

const navbarOpen = ref(true)

const names = computed(() => {
	if (shows.state.kind === 'LoadedShowState') {
		return shows.state.show.map((show) => show.name)
	}
	return []
})

const genres = computed(() => {
	if (shows.state.kind === 'LoadedShowState') {
		const genres: Set<string> = new Set()

		shows.state.show.forEach((show) => {
			show.genres.forEach((genre) => {
				genres.add(genre)
			})
		})

		return Array.from(genres)
	}
	return []
})

const searchState = computed(() => searchShow.state.query)

const toggleNavbar = () => (navbarOpen.value = !navbarOpen.value)

const handleSearch = (query: string) => {
	searchShow.fetchShows(query)
}
</script>
<template>
	<tv-container class="main-page" is-full-width>
		<tv-header class="main-page__header">
			<template #burger-button>
				<tv-button @on-pressed="toggleNavbar" variant="icon" icon-name="menu" />
			</template>
			<template #logo> SeriesTube </template>
			<template #content>
				<tv-autocomplete :items="names" @on:submit="handleSearch" v-model="searchState" live-search />
			</template>
		</tv-header>
		<tv-navbar class="main-page__nav" :is-open="navbarOpen">
			<tv-navbar-item v-for="genre in genres" :key="genre"> {{ genre }} </tv-navbar-item>
		</tv-navbar>
		<div class="main-page__content">
			<slot />
		</div>
	</tv-container>
</template>

<style scoped lang="scss">
@use '@/scss/7-modules/main-page' as *;
</style>
