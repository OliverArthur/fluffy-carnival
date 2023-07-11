<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { TvButton } from '@components/button'

const scrollContainerRef = ref<HTMLElement>()
const isAtLeft = ref(true)
const isAtRight = ref(false)
const hasScroll = ref(false)

watchEffect(() => {
	const container = scrollContainerRef.value
	if (container) {
		isAtLeft.value = container.scrollLeft <= 0
		isAtRight.value = container.scrollLeft >= container.scrollWidth - container.offsetWidth
		hasScroll.value = container.scrollWidth > container.offsetWidth
	}
})

const scrollLeft = () => {
	if (scrollContainerRef.value) {
		scrollContainerRef.value.scrollLeft -= 200
	}
}

const scrollRight = () => {
	if (scrollContainerRef.value) {
		scrollContainerRef.value.scrollLeft += 200
	}
}
</script>

<template>
	<div class="slide">
		<div class="slide__content" ref="scrollContainerRef">
			<slot />
		</div>
		<tv-button
			v-show="hasScroll"
			:class="['slide__button', 'left', { disabled: isAtLeft }]"
			@onPressed="scrollLeft"
			variant="icon"
			icon-name="arrow_back_ios"
		/>
		<tv-button
			v-show="hasScroll"
			:class="['slide__button', 'right', { disabled: isAtRight }]"
			@onPressed="scrollRight"
			variant="icon"
			icon-name="arrow_forward_ios"
		/>
	</div>
</template>
<style lang="scss" scoped>
@use '@/scss/7-modules/slide' as *;
</style>
