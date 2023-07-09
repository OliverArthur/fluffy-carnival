<script lang="ts" setup>
import { TvContainer } from '@components/container'
import { TvHeader } from '@components/header'
import { TvButton } from '@components/button'
</script>
<template>
	<tv-header>
		<template #burger-button>
			<tv-button variant="icon" icon-name="menu" />	
		</template>
		<template #logo>
			SeriesTube
		</template>
	</tv-header>
	<tv-container></tv-container>
</template>
