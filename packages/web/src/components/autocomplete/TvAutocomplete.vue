<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

import { TvInput } from '@components/input'
import { TvButton } from '@components/button'

import { debounce, sanitizeInput } from '@/utils'

const props = withDefaults(
	defineProps<{
		items?: string[]
		isAsync?: boolean
	}>(),
	{
		isAsync: false,
		items: () => []
	}
)

const searchTerm = ref('')
const results = ref([])
const isOpen = ref(false)
const isLoading = ref(false)
const arrowCounter = ref(0)
const activedescendant = ref('')

const onChange = () => {
	isOpen.value = true
	if (props.isAsync) {
		isLoading.value = true
		setTimeout(() => {
			filterResults()
			isLoading.value = false
		}, 1000)
	} else {
		filterResults()
	}
}

const handleClickOutside = (event: MouseEvent) => {
	if (!(event.target as HTMLElement).closest('#autocomplete')) {
		isOpen.value = false
		searchTerm.value = ''
	}
}

const filterResults = () => {
	results.value = props.items.filter((item) =>
		item.toLowerCase().includes(searchTerm.value.toLowerCase())
	)
}

const handleKeyDown = (event: KeyboardEvent) => {
	event.preventDefault()
	if (arrowCounter.value < results.value.length - 1) {
		arrowCounter.value++
	} else {
		arrowCounter.value = 0
	}
	setDescendant(arrowCounter.value)
}

const setResult = (result: string) => {
	searchTerm.value = result
	isOpen.value = false
	emits('on:submit', result)
}

const handleKeyUp = (event: KeyboardEvent) => {
	event.preventDefault()
	if (arrowCounter.value > 0) {
		arrowCounter.value--
	} else {
		arrowCounter.value = results.value.length - 1
	}
	setDescendant(arrowCounter.value)
}

const onEnter = (event: KeyboardEvent) => {
	event.preventDefault()
	searchTerm.value = results.value[arrowCounter.value]
	arrowCounter.value = -1
	isOpen.value = false
}

const highlightMatch = (text: string, match: string) => {
	const sanitizedMatch = sanitizeInput(match)
	const re = new RegExp(`(${sanitizedMatch})`, 'gi')
	return text.replace(re, '<strong>$1</strong>')
}

const getId = (index: number) => `result-${index}`
const isSelected = (index: number) => index === arrowCounter.value
const setDescendant = (index: number) => (activedescendant.value = getId(index))

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const debouncedOnChange = debounce(onChange, 300)

const emits = defineEmits<{
  (e: 'on:submit', ...args): void
}>()
</script>

<template>
	<div
		id="autocomplete"
		role="combobox"
		aria-haspopup="listbox"
		aria-owns="results-list"
		:aria-expanded="isOpen"
		class="autocomplete"
	>
		<tv-input
			id="search-input"
			class="autocomplete__input"
			type="search"
			@input="debouncedOnChange"
			@keydown.down="handleKeyDown"
			@keydown.up="handleKeyUp"
			@keydown.enter="onEnter"
			v-model="searchTerm"
			placeholder="Search"
		/>
		<tv-button variant="icon" theme="primary" icon-name="search" />
		<ul v-show="isOpen" id="results-list" role="listbox" class="autocomplete__list">
			<li v-if="isLoading" class="list-item list-item--loading">Looking in our library...</li>
			<li v-if="!isLoading && results.length === 0" class="list-item list-item--empty">
				No results found
			</li>
			<li
				v-for="(result, i) in results"
				:key="i"
				:id="getId(i)"
				:aria-selected="isSelected(i)"
				class="list-item"
				:class="{ 'is-active': isSelected(i) }"
				role="option"
			>
				<tv-button
					class="list-item__button"
					size="sm"
					variant="plain"
					@onPressed="setResult(result)"
					@keydown.enter="setResult(result)"
				>
					<span v-html="highlightMatch(result, searchTerm)"></span>
				</tv-button>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@use '@/scss/7-modules/autocomplete' as *;
</style>
