<script lang="ts">
	import type { PropertyData } from '@lib/interfaces';
	import type { Map } from 'leaflet';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { MAP_INITIAL_BOUNDS } from '@lib/constants';
	import { selectedPropertyIdStore } from '@stores/writeableStore';
	import MarkerIcon from '@lib/images/marker.png';

	export let properties;
	let selectedPropertyId: number;

	let mapElement;
	let map: Map;
	let leaflet;
	let mounted = false;
	let currentMarkersGroup = null;

	let bounds = MAP_INITIAL_BOUNDS;

	if (
		$page.url.searchParams.has('latMin') &&
		$page.url.searchParams.has('latMax') &&
		$page.url.searchParams.has('lonMin') &&
		$page.url.searchParams.has('lonMax')
	) {
		bounds = [
			[Number($page.url.searchParams.get('latMax')), Number($page.url.searchParams.get('lonMax'))],
			[Number($page.url.searchParams.get('latMin')), Number($page.url.searchParams.get('lonMin'))]
		];
	}

	onMount(async () => {
		if (browser) {
			leaflet = await import('leaflet');
			map = leaflet.map(mapElement).fitBounds(bounds);

			leaflet
				.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			map.addEventListener('moveend', () => {
				const latlon = map.getBounds();
				$page.url.searchParams.set('latMin', `${latlon.getSouth()}`);
				$page.url.searchParams.set('latMax', `${latlon.getNorth()}`);
				$page.url.searchParams.set('lonMin', `${latlon.getWest()}`);
				$page.url.searchParams.set('lonMax', `${latlon.getEast()}`);
				goto(`?${$page.url.searchParams.toString()}`);
			});

			mounted = true;
		}
	});

	const markerIcon = (scaleFactor) => {
		return leaflet.icon({
			iconUrl: MarkerIcon,
			iconSize: [30 * scaleFactor, 30 * scaleFactor]
		});
	};

	const createMarker = (loc, property: PropertyData) => {
		let icon = markerIcon(1);
		if (selectedPropertyId == property.id) {
			icon = markerIcon(2);
		}

		let marker = leaflet.marker(loc, { icon });

		marker.on('click', () => {
			if (selectedPropertyId === property.id) {
				selectedPropertyIdStore.set(-1);
			} else {
				selectedPropertyIdStore.set(property.id);
			}
		});

		return marker;
	};

	const redoMarkers = () => {
		if (mounted) {
			// If we already have a group, we need to clean it up before creating a new one
			if (currentMarkersGroup) {
				map.removeLayer(currentMarkersGroup);
			}

			// Create a new group
			currentMarkersGroup = leaflet.layerGroup();

			properties.forEach((property: PropertyData) => {
				if (property.latitude && property.longitude)
					currentMarkersGroup.addLayer(
						createMarker([property.latitude, property.longitude], property)
					);
			});

			map.addLayer(currentMarkersGroup);
		}
	};

	$: properties, redoMarkers();

	selectedPropertyIdStore.subscribe((val) => {
		selectedPropertyId = val;
		redoMarkers();
	});

	onDestroy(async () => {
		if (map) {
			map.remove();
		}
	});

	const resizeMap = () => {
		if (map) {
			map.invalidateSize();
		}
	};
</script>

<svelte:window on:resize={resizeMap} />
<div class="h-full w-4/5" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
