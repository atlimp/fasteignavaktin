import { fetchProperties } from '@stores/propertyStore';
import { selectedPropertyIdStore } from '@stores/writeableStore.js';
import type { PageData } from './$types.js';
import type { SearchParams } from '@lib/interfaces.js';

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch, url }): Promise<PageData> => {
	selectedPropertyIdStore.set(-1);

	const searchParams: SearchParams = {
		latMin: url.searchParams.get('latMin') ?? undefined,
		latMax: url.searchParams.get('latMax') ?? undefined,
		lonMin: url.searchParams.get('lonMin') ?? undefined,
		lonMax: url.searchParams.get('lonMax') ?? undefined,
		orderBy: url.searchParams.get('orderBy') ?? undefined,
		asc_desc: url.searchParams.get('asc_desc') ?? undefined
	};

	const properties = await fetchProperties(fetch, searchParams);

	return {
		properties: properties
	};
};
