<script lang="ts">
	import '../app.css';
	import MarkerIcon from '@lib/images/marker.png';
</script>

<slot />

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
		integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
		crossorigin=""
	/>
	<link rel="icon" type="image/png" href={MarkerIcon} />
</svelte:head>
