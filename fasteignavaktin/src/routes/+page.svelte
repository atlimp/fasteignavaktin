<script lang="ts">
	import type { PageData } from './$types';
	import PropertyMap from '@lib/components/PropertyMap.svelte';
	import PropertyList from '@lib/components/PropertyList.svelte';
	import { fetchProperties, fetchProperty } from '@stores/propertyStore';
	import { page } from '$app/stores';
	import { MAP_INITIAL_BOUNDS } from '@lib/constants';
	import { pageNo } from '@stores/writeableStore';
	import { onMount } from 'svelte';
	import { selectedPropertyIdStore } from '@stores/writeableStore';
	import Header from '@lib/components/Header.svelte';

	export let data: PageData;
	let selectedProperty;

	const fetchMore = async (pageNo: number) => {
		const bounds = {
			latMin: Number($page.url.searchParams.get('latMin')),
			latMax: Number($page.url.searchParams.get('latMax')),
			lonMin: Number($page.url.searchParams.get('lonMin')),
			lonMax: Number($page.url.searchParams.get('lonMax'))
		};

		if (!(bounds.latMin || bounds.latMax || bounds.lonMin || bounds.lonMax)) {
			bounds.latMin = MAP_INITIAL_BOUNDS[1][0];
			bounds.latMax = MAP_INITIAL_BOUNDS[0][0];
			bounds.lonMin = MAP_INITIAL_BOUNDS[1][1];
			bounds.lonMax = MAP_INITIAL_BOUNDS[0][1];
		}

		const newProperties = await fetchProperties(fetch, bounds, pageNo);

		data.properties = data.properties.concat(newProperties);
	};

	selectedPropertyIdStore.subscribe(async (val) => {
		selectedProperty = await fetchProperty(fetch, val);
	});

	const incrementPageNo = () => {
		pageNo.update((n) => n + 1);
	};

	onMount(() => {
		pageNo.subscribe((val) => {
			fetchMore(val);
		});
	});
</script>

<main class="h-screen grid grid-rows-16">
	<Header onButtonClick={incrementPageNo} />
	<div class="h-full flex flex-row row-span-15">
		<div class="w-1/5 m-0 h-full">
			<PropertyList properties={data.properties} {selectedProperty} />
		</div>
		<PropertyMap properties={data.properties} />
	</div>
</main>
