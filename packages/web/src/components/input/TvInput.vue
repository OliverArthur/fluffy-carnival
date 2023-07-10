<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

import type { InputType, InputSize, InputValue } from './types'

const props = withDefaults(
	defineProps<{
		id: string
		type?: InputType
		size?: InputSize
		placeholder?: string
		disabled?: boolean
		readOnly?: boolean
		required?: boolean
		pattern?: string
		maxLength?: number
		minLength?: number
		modelValue: InputValue
	}>(),
	{
		type: 'text',
		size: 'md',
		placeholder: 'Placeholder',
		disabled: false,
		readOnly: false,
		required: false
	}
)

const model = ref(props.modelValue)

const inputClasses: Record<InputSize, string> = {
	sm: 'px-xs py-xs text-sm',
	md: 'px-sm py-sm text-base',
	lg: 'px-lg py-lg text-lg'
}

const inputSize = computed(() => inputClasses[props.size])

const emit = defineEmits<{
	(event: 'update:modelValue', value: InputValue): void
	(event: 'on:focus', value: InputValue): void
	(event: 'on:blur', value: InputValue): void
	(event: 'on:input', value: InputValue): void
}>()

watch(model, (value) => {
	emit('update:modelValue', value)
})
</script>
<template>
	<input
		class="input"
		:id="id"
		v-model="model"
		:type="type"
		:class="inputSize"
		:placeholder="placeholder"
		:disabled="disabled"
		:readonly="readOnly"
		:required="required"
		@focus="emit('on:focus', $event)"
		@blur="emit('on:blur', $event)"
		@input="emit('on:input', $event)"
	/>
</template>

<style lang="scss" scoped>
@use '@/scss/6-components/input' as *;
</style>
