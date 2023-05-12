<script lang="ts">
	import Property from './Property.svelte';
	import { selectedPropertyIdStore } from '@stores/writeableStore';

	export let properties;
	export let selectedProperty;

	let selectedPropertyId;

	selectedPropertyIdStore.subscribe((val) => {
		selectedPropertyId = val;
	});
</script>

<div class="overflow-y-scroll h-full">
	{#if selectedProperty}
		<Property selected={true} property={selectedProperty} />
	{/if}
	{#each properties.filter((el) => selectedPropertyId !== el.id) as property}
		<Property selected={false} {property} />
	{/each}
</div>
