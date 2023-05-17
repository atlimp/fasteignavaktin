import { fetchProperties } from '@stores/propertyStore';
import { selectedPropertyIdStore } from '@stores/writeableStore.js';
import type { PageData } from './$types.js';
import type { SearchParams } from '@lib/interfaces.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }): Promise<PageData> => {
	selectedPropertyIdStore.set(-1);

	const searchParams: SearchParams = {
		latMin: Number(url.searchParams.get('latMin')),
		latMax: Number(url.searchParams.get('latMax')),
		lonMin: Number(url.searchParams.get('lonMin')),
		lonMax: Number(url.searchParams.get('lonMax')),
		orderBy: url.searchParams.get('orderBy'),
		asc_desc: url.searchParams.get('asc_desc')
	};

	const properties = await fetchProperties(fetch, searchParams);

	return {
		properties: properties
	};
};
