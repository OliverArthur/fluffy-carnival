const debounce = (func: Function, delay: number) => {
	let timeout: ReturnType<typeof setTimeout>
	return (...args: any[]) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => func.apply(null, args), delay)
	}
}

export default debounce
