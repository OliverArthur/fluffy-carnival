<script setup lang="ts">
import { shallowRef, provide } from 'vue'
import router from '@/router'
import layouts from './components/layouts'

const layout = shallowRef(layouts['MainLayout'])

router.afterEach((to) => {
	if (typeof to.meta.layout === 'string' && to.meta.layout in layouts) {
		layout.value = layouts[to.meta.layout]
	} else {
		layout.value = layouts['MainLayout']
	}
})

provide('app:layout', layout)
</script>

<template>
	<component :is="layout || 'div'">
		<router-view v-slot="{ Component, route }">
			<transition name="slide" mode="out-in">
				<component :is="Component" :key="route.name" />
			</transition>
		</router-view>
	</component>
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
	transition: all 0.2s ease-out;
}
.slide-enter-to {
	position: absolute;
	right: 0;
}
.slide-enter-from {
	position: absolute;
	right: -100%;
}
.slide-leave-to {
	position: absolute;
	left: -100%;
}
.slide-leave-from {
	position: absolute;
	left: 0;
}
</style>
