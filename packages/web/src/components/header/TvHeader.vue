<script lang="ts" setup>
import { computed } from 'vue'
import type { HeaderMode, HeaderModifier } from './types'

const props = withDefaults(
	defineProps<{
		mode?: HeaderMode
		modifier?: HeaderModifier
	}>(),
	{
		mode: 'default',
		modifier: 'default'
	}
)

const tvShowHeaderModeClasses: Record<HeaderMode, string> = {
	default: 'header--default',
	sticky: 'header--sticky',
}

const tvShowHeaderModifierClasses: Record<HeaderModifier, string> = {
	default: 'header--default',
	compact: 'header--compact',
	dense: 'header--dense'
}

const headerClasses = computed(() => [
	'header',
	tvShowHeaderModeClasses[props.mode],
	tvShowHeaderModifierClasses[props.modifier]
])
</script>

<template>
  <header :class="headerClasses">
    <div class="header__identity">
	  <slot name="toggle-menu" />
      <slot name="identity" />
    </div>
    <div class="header__content">
      <slot name="content" />
    </div>
    <div class="header__actions">
      <slot name="actions" />
    </div>  
  </header>
</template>

<style lang="scss" scoped>
@use '@/scss/6-components/header' as *;
</style>

