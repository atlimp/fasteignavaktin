<script lang="ts">
	import type { PropertyData } from '@lib/interfaces';
	import { selectedPropertyIdStore } from '@stores/writeableStore';

	export let property: PropertyData;
	export let selected;
	let selectedPropertyId: number;

	const numberFormat = new Intl.NumberFormat();

	selectedPropertyIdStore.subscribe((val) => (selectedPropertyId = val));

	const selectProperty = () => {
		if (selectedPropertyId === property.id) {
			selectedPropertyIdStore.set(-1);
		} else {
			selectedPropertyIdStore.set(property.id);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="py-4 px-2 border-2 m-4 {selected ? 'bg-red-50' : 'bg-blue-50'}"
	on:click={selectProperty}
>
	<div class="flex flex-row">
		<img class="w-1/3" src={property.image} alt="property" />
		<div class="mx-4">
			<a target="_blank" rel="noopener noreferrer" href={property.url} class="font-bold"
				>{property.address}</a
			>
			<div>{numberFormat.format(property.price)} kr.</div>
			<div>{property.size.toFixed(2)} fm</div>
			<div>{numberFormat.format(property.pricePerSqMtr)} kr/m²</div>
		</div>
	</div>
	{#if selected}
		<div class="h-64 overflow-y-scroll py-4">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html property.description}
		</div>
	{/if}
</div>
