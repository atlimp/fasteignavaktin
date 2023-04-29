<script lang="ts">
	import Property from "./Property.svelte";

    export let properties;
</script>

<div class="overflow-y-auto max-h-full">
    {#each properties as property}
        <Property property={property}/>
    {/each}
</div>