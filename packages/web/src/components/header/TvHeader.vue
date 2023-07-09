<script lang="ts" setup>
import { computed } from 'vue'
import type { HeaderMode, HeaderModifier } from './types'

const props = withDefaults(
	defineProps<{
		mode?: HeaderMode | null
		modifier?: HeaderModifier | null
	}>(),
	{
		mode: null,
		modifier: null
	}
)

const tvShowHeaderModeClasses: Record<HeaderMode, string> = {
	sticky: 'header--sticky',
}

const tvShowHeaderModifierClasses: Record<HeaderModifier, string> = {
	compact: 'header--compact',
	dense: 'header--dense'
}

const headerClasses = computed(() => [
	'header',
	tvShowHeaderModeClasses[props.mode ?? 'sticky'],
	tvShowHeaderModifierClasses[props.modifier ?? 'dense']
])
</script>

<template>
  <header class="sm:py-xs md:py-sm sm:px-xs md:px-sm" :class="headerClasses">
    <div class="header__identity">
	  	<slot name="burger-button" />
      <div class="logo">
				<span class="material-icons logo__icon ml-sm mr-xs">smart_display</span>
				<slot name="logo" />
			</div>
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

