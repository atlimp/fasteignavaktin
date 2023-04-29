<script lang="ts">
    export let property;
</script>

<div>
    <a target="_blank" rel="noopener noreferrer" href={ property.url }>{ property.address }</a>
    <img src={property.image} alt="Property"/>
</div>