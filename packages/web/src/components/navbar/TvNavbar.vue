<script lang="ts" setup>
const props = withDefaults(defineProps<{
	isOpen?: boolean
}>(), {
	isOpen: true
})
</script>
<template>
	<nav :class="{ 'is-active': props.isOpen }" class="navbar">
		<ul class="navbar__list">
			<slot />
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
@use '@/scss/7-modules/navbar' as *;
</style>
