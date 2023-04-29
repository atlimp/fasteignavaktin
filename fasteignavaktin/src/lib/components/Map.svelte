<script>
    import { onMount, onDestroy } from 'svelte';
		import leaflet from 'leaflet';
		import 'leaflet.markercluster';

    let mapElement;
    let map;
		let mounted = false;
		let currentMarkersGroup = null;
	
		let addressPoints = [
			[-37.8210922667, 175.2209316333, "2"],
			[-37.8210819833, 175.2213903167, "3"],
			[-37.8210881833, 175.2215004833, "3A"],
			[-37.8211946833, 175.2213655333, "1"],
			[-37.8209458667, 175.2214051333, "5"],
			[-37.8208292333, 175.2214374833, "7"],
			[-37.8325816, 175.2238798667, "537"],
			[-37.8315855167, 175.2279767, "454"],
			[-37.8096336833, 175.2223743833, "176"],
			[-37.80970685, 175.2221815833, "178"],
			[-37.8102146667, 175.2211562833, "190"],
			[-37.8088037167, 175.2242227, "156"],
			[-37.8112330167, 175.2193425667, "210"],
			[-37.8116368667, 175.2193005167, "212"],
			[-37.80812645, 175.2255449333, "146"],
			[-37.8080231333, 175.2286383167, "125"],
			[-37.8089538667, 175.2222222333, "174"],
			[-37.8080905833, 175.2275400667, "129"]
	];

	const removePoint = () => {
		addressPoints = addressPoints.slice(0, -1);
	}

	$: {
		console.log(addressPoints);
		
		// This makes sure we have run onMount already and initialized the map
		if(mounted) {
			// If we already have a group, we need to clean it up before creating a new one
			if(currentMarkersGroup) {
				map.removeLayer(currentMarkersGroup); 
			}
			
			// Create a new group
			currentMarkersGroup = leaflet.markerClusterGroup();

			for (let i = 0; i < addressPoints.length; i++) {
				const a = addressPoints[i];
				const title = a[2];
				const marker = leaflet.marker(new L.LatLng(a[0], a[1]), {
					title: title
				});
				currentMarkersGroup.bindPopup(title);
				currentMarkersGroup.addLayer(marker);
			}

			map.addLayer(currentMarkersGroup);
		}
	}

	onMount(async () => {
		map = leaflet.map(mapElement).setView([-37.82, 175.23], 13);

		leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		
		mounted = true;
	});

	onDestroy(async () => {
		if(map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main>
		<input type="button" value="Remove point" on:click={removePoint} />
    <div bind:this={mapElement}></div>
</main>

<style>
    @import 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
		@import 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
		@import 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
    main div {
        height: 800px;
    }
</style>

