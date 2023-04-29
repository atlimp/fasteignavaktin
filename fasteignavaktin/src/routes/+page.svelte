<script lang="ts">
    import type { ZipData, PropertyData } from "@lib/interfaces";
	import type { PageServerData } from "./$types";
    import ZipSelector from "@lib/components/ZipSelector.svelte";
	import PropertyMap from "@lib/components/PropertyMap.svelte";
	import PropertyList from "@lib/components/PropertyList.svelte";

    export let data: PageServerData;
</script>

<div class="flex flex-row m-0">
    <div class="w-1/3 h-screen">
        <ZipSelector zipCodes={data.zipCodes}/>
        <PropertyList properties={data.properties}/>
    </div>
    <PropertyMap properties={data.properties}></PropertyMap>
</div>