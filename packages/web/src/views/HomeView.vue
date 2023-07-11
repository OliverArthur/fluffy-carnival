<script lang="ts" setup>
import { TvContainer } from '@components/container'
import { TvHero } from '@components/hero'
import { TvSection } from '@components/sections'
import { TvCard } from '@components/card'
</script>
<template>
  <div class="view">
		<tv-container class="sm:py-sm md:py-md">
			<tv-hero></tv-hero>
		</tv-container>
		<tv-container class="sm:py-sm md:py-md">
			<tv-section class="sm:py-sm md:py-md" name="Adventure">
				<tv-card></tv-card>
				<tv-card></tv-card>
				<tv-card></tv-card>
				<tv-card></tv-card>
			</tv-section>
			<tv-section class="sm:py-sm md:py-md" name="Action"></tv-section>
			<tv-section class="sm:py-sm md:py-md" name="Mystery"></tv-section>
			<tv-section class="sm:py-sm md:py-md" name="Romance"></tv-section>
		</tv-container>
	</div>
</template>
