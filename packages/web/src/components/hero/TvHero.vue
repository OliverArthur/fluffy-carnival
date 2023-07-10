<script lang="ts" setup>
const props = withDefaults(defineProps<{
	bgCover?: string
}>(), {
	bgCover: 'https://s24526.pcdn.co/wp-content/uploads/woocommerce-placeholder-400x400.png'
})
</script>
<template>
	<section class="hero">
		<div class="hero__bg" :style="{ backgroundImage: `url(${props.bgCover})` }"></div>
		<div class="hero__content">
			<div class="hero__content__inner">
				<slot />
			</div>
		</div>
	</section>
</template>
<style lang="scss" scoped>
@use '@/scss/6-components/hero' as *;
</style>
