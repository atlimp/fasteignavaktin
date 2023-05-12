<script lang="ts">
	import { hasMoreProperties } from '@stores/writeableStore';

	export let onClick;
	export let buttonText;
	let disabled;

	hasMoreProperties.subscribe((val) => {
		disabled = !val;
	});
</script>

<button
	type="button"
	on:click={onClick}
	{disabled}
	class="h-3/5 m-4 px-5 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100 disabled:bg-slate-200 disabled:border-slate-500 disabled:text-slate-500"
>
	{buttonText}
</button>
