<script lang="ts">
	import type { PageData } from "./$types";
	import PropertyMap from "@lib/components/PropertyMap.svelte";
	import PropertyList from "@lib/components/PropertyList.svelte";
	import { fetchProperties } from "@stores/propertyStore";
    import { page } from '$app/stores';
    import { MAP_INITIAL_BOUNDS, PAGE_SIZE } from "@lib/constants";
	import { pageNo } from "@stores/writeableStore";
	import { onMount } from "svelte";
	import Button from "@lib/components/Button.svelte";
    
    export let data: PageData;
 
    const fetchMore = async (pageNo: number) => {
        const bounds = {
            latMin: Number($page.url.searchParams.get('latMin')),
            latMax: Number($page.url.searchParams.get('latMax')),
            lonMin: Number($page.url.searchParams.get('lonMin')),
            lonMax: Number($page.url.searchParams.get('lonMax')),
        };

        if (!(bounds.latMin || bounds.latMax || bounds.lonMin || bounds.lonMax)) {
            bounds.latMin = MAP_INITIAL_BOUNDS[1][0];
            bounds.latMax = MAP_INITIAL_BOUNDS[0][0];
            bounds.lonMin = MAP_INITIAL_BOUNDS[1][1];
            bounds.lonMax = MAP_INITIAL_BOUNDS[0][1];
        }
        
        const newProperties = await fetchProperties(fetch, bounds, pageNo);
        
        data.properties = data.properties.concat(newProperties);
    }
    
    const incrementPageNo = () => {
        pageNo.update(n => n + 1);
    }

    onMount(() => {
        pageNo.subscribe((val) => {
            fetchMore(val);
        });
    });

</script>

<main class="h-screen grid grid-rows-16">
    <header class="row-span-1 grid grid-cols-5">
        <Button onClick={incrementPageNo} buttonText="Sækja fleiri"></Button>
        <h1 class="text-center h-4/5 col-span-4">Fasteignavaktin</h1>
    </header>
    <div class="h-full flex flex-row row-span-15">
        <div class="w-1/5 m-0 h-full">
            <PropertyList properties={data.properties}/>
        </div>
        <PropertyMap properties={data.properties}></PropertyMap>
    </div>
</main>