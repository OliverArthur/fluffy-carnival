<script lang="ts" setup>
import { ref } from 'vue'
import { TvContainer } from '@components/container'
import { TvHeader } from '@components/header'
import { TvButton } from '@components/button'
import { TvAutocomplete } from '@components/autocomplete'
import { TvNavbar, TvNavbarItem } from '@components/navbar'

// TODO: call the API to get the series.
const setGenre = (genre: string) => {
	console.log(genre)
}

const navbarOpen = ref(true)

const toggleNavbar = () => {
	navbarOpen.value = !navbarOpen.value
}

</script>
<template>
	<tv-header>
		<template #burger-button>
			<tv-button @on-pressed="toggleNavbar " variant="icon" icon-name="menu" />
		</template>
		<template #logo> SeriesTube </template>
		<template #content>
			<tv-autocomplete
				:items="[
					'banana',
					'orange',
					'pineapple',
					'grape',
					'strawberry',
					'watermelon',
					'melon',
					'papaya'
				]"
			/>
		</template>
	</tv-header>
	<tv-navbar :is-open="navbarOpen">
		<tv-navbar-item @on:action="setGenre('action')"> Action </tv-navbar-item>
		<tv-navbar-item @on:action="setGenre('adventure')"> Adventure </tv-navbar-item>
		<tv-navbar-item @on:action="setGenre('drama')"> Drama </tv-navbar-item>
		<tv-navbar-item @on:action="setGenre('horror')"> Horror </tv-navbar-item>
		<tv-navbar-item @on:action="setGenre('mystery')"> Mystery </tv-navbar-item>
		<tv-navbar-item @on:action="setGenre('romance')"> Romance </tv-navbar-item>
	</tv-navbar>
	<tv-container></tv-container>
</template>
