<script lang="ts">
	import { fetchProperty } from '@stores/propertyStore';
	import Property from './Property.svelte';
	import { selectedPropertyIdStore } from '@stores/writeableStore';

	export let properties;

	let selectedPropertyId;
	let selectedProperty;

	selectedPropertyIdStore.subscribe(async (val) => {
		selectedPropertyId = val;

		selectedProperty = await fetchProperty(fetch, val);
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
