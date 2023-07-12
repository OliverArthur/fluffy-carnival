<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { TvContainer } from '@components/container'
import { TvHero } from '@components/hero'

import { useSingleSearchShows } from '@/store/useSingleShow'

const route = useRoute()

const singleShow = useSingleSearchShows()

const query = route.params.name as string
const showEpisode = route.params.embed as string

singleShow.fetchShow(query, showEpisode)

</script>
<template>
	<div class="details-view">
		<tv-hero class="details-view__hero mt-xlg" :bg-cover="singleShow.getShows?.image.original">
				<div class="hero-content">
					<h2>{{ singleShow.getShows?.name }}</h2>
					<p v-html="singleShow?.getShows?.summary"></p>
					Genres:
					<template v-for="genre in singleShow?.getShows?.genres" :key="genre">
						<span class="genres">{{ genre }}</span>
					</template>
					<p>rating: {{ singleShow.getShows?.rating.average  }} of 10</p>
					<p>status: {{ singleShow.getShows?.status }}</p>
					<p>language: {{ singleShow.getShows?.language }}</p>
					<p>network: {{ singleShow.getShows?.network.name }}</p>
					<p>premiered: {{ singleShow.getShows?.premiered }}</p>
				</div>	
		</tv-hero>
		<tv-container class="details-view__content sm:py-sm md:py-md" is-full-width>
		</tv-container>
	</div>
</template>

<style scoped lang="scss">
@use '@/scss/7-modules/details-view' as *;
</style>
