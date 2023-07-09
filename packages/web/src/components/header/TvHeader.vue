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
	default: 'tv-header--default',
	sticky: 'tv-header--sticky',
}

const tvShowHeaderModifierClasses: Record<HeaderModifier, string> = {
	default: 'tv-header--default',
	compact: 'tv-header--compact',
	dense: 'tv-header--dense'
}

const headerClasses = computed(() => [
	'tv-header',
	tvShowHeaderModeClasses[props.mode],
	tvShowHeaderModifierClasses[props.modifier]
])
</script>

<template>
  <header :class="headerClasses">
    <div class="tv-header__identity">
      <slot name="identity" />
    </div>
    <div class="tv-header__content">
      <slot name="content" />
    </div>
    <div class="tv-header__actions">
      <slot name="actions" />
    </div>  
  </header>
</template>
