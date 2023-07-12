<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'


import { TvContainer } from '@components/container'
import { TvSection } from '@components/sections'
import { TvCard } from '@components/card'
import { TvHorizontalSlide } from '@components/slide'

const router = useRouter()

import { useShows } from '@store/useShows'
import { useSearchShows } from '@store/useSearchShows'


const shows = useShows()
const searchShow = useSearchShows()

const showState = reactive(shows.state)
const showsByRating = computed(() => {
	if (showState.kind === 'LoadedShowState') {
		let payload = showState.show

		if (searchShow.state.query !== '' && searchShow.state.query !== null) {
			payload = payload.filter((show) =>
				show.name.toLowerCase().includes(searchShow.state.query.toLowerCase())
			)
		}

		// get all genres from shows and remove duplicates
		const genres: Set<string> = new Set()

		payload.forEach((show) => {
			show.genres.forEach((genre) => {
				genres.add(genre)
			})
		})

		const showsByGenre = Array.from(genres).map((genre) => {
			return {
				genre,
				shows: payload.filter((show) => show.genres.includes(genre))
			}
		})

		const sortingByRating = showsByGenre.map((show) => {
			return {
				genre: show.genre,
				shows: show.shows.sort((a, b) => b.rating.average - a.rating.average)
			}
		})

		return sortingByRating
	} else {
		return []
	}
})

//TODO: This can be improved some kind of pagination
// to fetch more shows when user scrolls to bottom of page or something else.
shows.fetchShows(1)

const navigateToShowDetails = (name) => {
  const embed = 'episodes'
  router.push(`/details/${name}/${embed}`)
}
</script>
<template>
	<div class="view">
		<tv-container class="sm:py-sm md:py-md" is-full-width>
			<tv-section
				v-for="section in showsByRating"
				class="sm:py-sm md:py-md"
				:name="section.genre"
				:key="section.genre"
			>
				<tv-horizontal-slide>
					<template v-for="show in section.shows" :key="show.id">
						<tv-card :img="show.image.medium" :alt="show.name" @click="navigateToShowDetails(show.name)">
							<h2 class="text-2xl xs:py-md">{{ show.name }}</h2>
						</tv-card>
					</template>
				</tv-horizontal-slide>
			</tv-section>
		</tv-container>
	</div>
</template>
