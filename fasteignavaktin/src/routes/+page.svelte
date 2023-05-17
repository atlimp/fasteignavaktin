<script lang="ts">
	import type { PageData } from './$types';
	import PropertyMap from '@lib/components/PropertyMap.svelte';
	import PropertyList from '@lib/components/PropertyList.svelte';
	import { fetchProperties } from '@stores/propertyStore';
	import { page } from '$app/stores';
	import { pageNo } from '@stores/writeableStore';
	import { onMount } from 'svelte';
	import Header from '@lib/components/Header.svelte';

	export let data: PageData;

	const fetchMore = async (pageNo: number) => {
		const searchParams = {
			latMin: $page.url.searchParams.get('latMin') ?? undefined,
			latMax: $page.url.searchParams.get('latMax') ?? undefined,
			lonMin: $page.url.searchParams.get('lonMin') ?? undefined,
			lonMax: $page.url.searchParams.get('lonMax') ?? undefined,
			pageNo,
			orderBy: $page.url.searchParams.get('orderBy') ?? undefined,
			asc_desc: $page.url.searchParams.get('asc_desc') ?? undefined,
		};

		const newProperties = await fetchProperties(fetch, searchParams);

		data.properties = data.properties.concat(newProperties);
	};

	onMount(() => {
		pageNo.subscribe((val) => {
			fetchMore(val);
		});
	});
</script>

<main class="h-screen grid grid-rows-16">
	<Header />
	<div class="h-full flex flex-row row-span-15">
		<div class="w-1/5 m-0 h-full">
			<PropertyList properties={data.properties} />
		</div>
		<PropertyMap properties={data.properties} />
	</div>
</main>
