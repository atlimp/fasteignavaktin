<script lang="ts">
    export let property;

    const numberFormat = new Intl.NumberFormat();
</script>

<div class="flex flex-row py-4 px-2 border-2 m-4">
    <img class="w-1/3" src={property.image} alt="property"/>
    <div class="mx-4">
        <h3 class="font-bold">{ property.address }</h3>
        <div>{ numberFormat.format(property.price) } kr.</div>
        <div>{ property.size.toFixed(2) } fm</div>
    </div>
</div>