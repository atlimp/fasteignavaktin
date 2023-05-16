import { fetchProperties } from '@stores/propertyStore';
import { selectedPropertyIdStore } from '@stores/writeableStore.js';
import type { PageData } from './$types.js';
import { MAP_INITIAL_BOUNDS } from '@lib/constants.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }): Promise<PageData> => {
	selectedPropertyIdStore.set(-1);

	const bounds = {
		latMin: Number(url.searchParams.get('latMin')),
		latMax: Number(url.searchParams.get('latMax')),
		lonMin: Number(url.searchParams.get('lonMin')),
		lonMax: Number(url.searchParams.get('lonMax'))
	};

	const orderByParams = {
		orderByCol: url.searchParams.get('orderBy'),
		asc_desc: url.searchParams.get('asc_desc')
	}

	if (!(bounds.latMin || bounds.latMax || bounds.lonMin || bounds.lonMax)) {
		bounds.latMin = MAP_INITIAL_BOUNDS[1][0];
		bounds.latMax = MAP_INITIAL_BOUNDS[0][0];
		bounds.lonMin = MAP_INITIAL_BOUNDS[1][1];
		bounds.lonMax = MAP_INITIAL_BOUNDS[0][1];
	}
	const properties = await fetchProperties(fetch, bounds, orderByParams);

	return {
		properties: properties
	};
};
