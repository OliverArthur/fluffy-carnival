<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
	img: string | null
	alt: string | null
}>()

const getImgAndAlt = computed(() => {
	return {
		img:
			props.img ?? 'https://s24526.pcdn.co/wp-content/uploads/woocommerce-placeholder-400x400.png',
		alt: props.alt ?? 'Not image found'
	}
})
</script>

<template>
	<article class="card">
		<div class="card__header">
			<div class="header-image img-frame-4by3">
				<img :src="getImgAndAlt.img" :alt="getImgAndAlt.alt" />
			</div>
		</div>
		<div class="card__body">
			<slot />
		</div>
	</article>
</template>
<style lang="scss" scoped>
@use '@/scss/7-modules/card' as *;
</style>
