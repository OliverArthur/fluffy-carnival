<script lang="ts" setup>
import { computed } from 'vue'
import type { ButtonSize, ButtonTheme, ButtonType, ButtonVariant } from './types'

import { buttonThemeClasses, buttonSizeClasses, buttonVariantClasses } from './classes'

const props = withDefaults(
	defineProps<{
		size?: ButtonSize
		theme?: ButtonTheme
		type?: ButtonType
		variant?: ButtonVariant
		iconName?: string | null
		disabled?: boolean
		loading?: boolean
		isOutline?: boolean
		inDarkMode?: boolean
		isFullWidth?: boolean
	}>(),
	{
		size: 'md',
		theme: 'primary',
		type: 'button',
		variant: 'solid',
		iconName: null,
		disabled: false,
		loading: false,
		isOutline: false,
		inDarkMode: false
	}
)

const buttonClasses = computed(() => [
	buttonSizeClasses[props.size],
	buttonThemeClasses[props.theme],
	buttonVariantClasses[props.variant],
	{
		button: true,
		'is-disabled': props.disabled,
		'is-loading': props.loading,
		'is-outline': props.isOutline,
		'is-dark-mode': props.inDarkMode,
		'is-full-width': props.isFullWidth
	}
])

const emits = defineEmits<{
  (e: 'onPressed', ...args): void
}>()
</script>
<template>
	<button :class="buttonClasses" :type="props.type" @click="emits('onPressed')" :disabled="props.disabled">
		<span v-if="!$slots.default && props.variant === 'icon'" class="material-icons icon" aria-hidden="true">{{ props.iconName }}</span>
		<slot />
	</button>
</template>
<style lang="scss" scoped>
@use '@/scss/6-components/button' as *;
</style>
