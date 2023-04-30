<script lang="ts">
    import type { PropertyData } from "@lib/interfaces";
    import type { Map } from 'leaflet';
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
	import PropertyPopup from "./PropertyPopup.svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
    import { MAP_INITIAL_BOUNDS } from '@lib/constants';
    
    export let properties;
    
    let mapElement;
    let map: Map;
    let leaflet;
    let mounted = false;
	let currentMarkersGroup = null;
    
    let bounds = MAP_INITIAL_BOUNDS;

    if ($page.url.searchParams.has('latMin')
        && $page.url.searchParams.has('latMax')
        && $page.url.searchParams.has('lonMin')
        && $page.url.searchParams.has('lonMax')) {
            bounds = [
                [Number($page.url.searchParams.get('latMax')), Number($page.url.searchParams.get('lonMax'))],
                [Number($page.url.searchParams.get('latMin')), Number($page.url.searchParams.get('lonMin'))],
            ]
        }
    
    
    onMount(async () => {
        if (browser) {
            leaflet = await import('leaflet');
            map = leaflet.map(mapElement).fitBounds(bounds);

            leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.addEventListener('moveend', (event) => {
                const latlon = map.getBounds();
                $page.url.searchParams.set('latMin', `${latlon.getSouth()}`)
                $page.url.searchParams.set('latMax', `${latlon.getNorth()}`)
                $page.url.searchParams.set('lonMin', `${latlon.getWest()}`)
                $page.url.searchParams.set('lonMax', `${latlon.getEast()}`)
                goto(`?${$page.url.searchParams.toString()}`);                
            });
            
            mounted = true;
        }
    });

    const bindPopup = (marker, createFn) => {
        let popupComponent;
        marker.bindPopup(() => {
            let container = leaflet.DomUtil.create('div');
            popupComponent = createFn(container);
            return container;
        });

        marker.on('popupclose', () => {
            if(popupComponent) {
                let old = popupComponent;
                popupComponent = null;
                // Wait to destroy until after the fadeout completes.
                setTimeout(() => {
                    old.$destroy();
                }, 500);

            }
        });
    }

    const createMarker = (loc, property: PropertyData) => {
        let marker = leaflet.marker(loc);
        bindPopup(marker, (m) => {
            let c = new PropertyPopup({
                target: m,
                props: {
                    property
                }
            });
            
            return c;
        });
        
        return marker;
    }

    $: {		
		// This makes sure we have run onMount already and initialized the map
		if(mounted) {
			// If we already have a group, we need to clean it up before creating a new one
			if(currentMarkersGroup) {
				map.removeLayer(currentMarkersGroup); 
			}
			
			// Create a new group
			currentMarkersGroup = leaflet.layerGroup();

			properties.forEach((property: PropertyData) => {
                if (property.latitude && property.longitude)
                    currentMarkersGroup.addLayer(createMarker([property.latitude, property.longitude], property))
            });

			map.addLayer(currentMarkersGroup);
		}
	}

    
    onDestroy(async () => {
        if(map) {
            map.remove();
        }
    });

</script>

<div class="h-screen w-2/3" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
