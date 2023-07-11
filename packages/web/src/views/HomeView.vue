<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

import { TvContainer } from '@components/container'
import { TvHero } from '@components/hero'
import { TvSection } from '@components/sections'
import { TvCard } from '@components/card'
import { TvHorizontalSlide } from '@components/slide'

import type { Show } from '@showtimetv/core'

import { showsBloc } from '@/blocs'

const { bloc, fetchShows } = showsBloc()

const state = ref(bloc.getState())
let key = {}

const updateState = (newState) => {
	state.value = newState
}

bloc.observable(key, updateState)

// sort shows by genre
const showsByGenre = computed(() => {
	if (state.value.kind === 'LoadedShowState') {
		const shows = state.value.show

		// get all genres from shows and remove duplicates
		const genres: Set<string> = new Set()

		shows.forEach((show: Show) => {
			show.genres.forEach((genre: string) => {
				genres.add(genre)
			})
		})

		return Array.from(genres).map((genre: string) => {
			return {
				genre,
				shows: shows.filter((show: Show) => show.genres.includes(genre))
			}
		})
	}
	return []
})

// sort shows by rating
const showsByRating = computed(() => {
	if (state.value.kind === 'LoadedShowState') {
		const shows = showsByGenre.value

		return shows.map((show: any) => {
			return {
				genre: show.genre,
				shows: show.shows.sort((a: Show, b: Show) => b.rating.average - a.rating.average)
			}
		})
	}
	return []
})

onMounted(() => fetchShows(1))
onUnmounted(() => bloc.unobservable(key))
</script>
<template>
	<div class="view">
		<tv-container class="sm:py-sm md:py-md">
			<tv-hero></tv-hero>
		</tv-container>
		<tv-container class="sm:py-sm md:py-md">
			<tv-section
				v-for="section in showsByRating"
				class="sm:py-sm md:py-md"
				:name="section.genre"
				:key="section.genre"
			>
				<tv-horizontal-slide>
					<template v-for="show in section.shows" :key="show.id">
						<tv-card :img="show.image.medium" :alt="show.name">
							<h2 class="text-2xl">{{ show.name }}</h2>
						</tv-card>
					</template>
				</tv-horizontal-slide>
			</tv-section>
		</tv-container>
	</div>
</template>
