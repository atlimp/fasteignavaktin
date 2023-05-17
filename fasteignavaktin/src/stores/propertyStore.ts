import type { PropertyData, SearchParams } from '@lib/interfaces';
import { BASE_API_URL, PAGE_SIZE, MAP_INITIAL_BOUNDS } from '@lib/constants';
import { hasMoreProperties } from './writeableStore';

export const fetchProperties = async (fetch, searchParams: SearchParams) => {
	const {
		latMin = MAP_INITIAL_BOUNDS[1][0],
		latMax = MAP_INITIAL_BOUNDS[0][0],
		lonMin = MAP_INITIAL_BOUNDS[1][1],
		lonMax = MAP_INITIAL_BOUNDS[0][1],
		pageNo = 1,
		orderBy = '',
		asc_desc = ''
	} = searchParams;

	const offset = PAGE_SIZE * (pageNo - 1);

	const requestUrl = new URL('/api/properties/area', BASE_API_URL);
	requestUrl.searchParams.set('latMin', `${latMin}`);
	requestUrl.searchParams.set('latMax', `${latMax}`);
	requestUrl.searchParams.set('lonMin', `${lonMin}`);
	requestUrl.searchParams.set('lonMax', `${lonMax}`);
	requestUrl.searchParams.set('limit', `${PAGE_SIZE}`);
	requestUrl.searchParams.set('offset', `${offset}`);

	if (orderBy) {
		requestUrl.searchParams.set('orderBy', orderBy);
	}

	if (asc_desc) {
		requestUrl.searchParams.set('asc_desc', asc_desc);
	}

	try {
		const data = await (await fetch(requestUrl)).json();

		hasMoreProperties.set(data.length >= PAGE_SIZE);

		return data.map((x) => {
			return {
				id: x.id,
				address: x.address,
				price: x.price,
				pricePerSqMtr: x.pricePerSqMtr,
				size: x.size,
				image: x.image,
				created: x.created,
				latitude: x.latitude,
				longitude: x.longitude,
				url: x.url
			} as PropertyData;
		});
	} catch (e) {
		console.error(e);
	}

	return [];
};

export const fetchProperty = async (fetch, id) => {
	const requestUrl = new URL(`/api/properties/${id}`, BASE_API_URL);

	try {
		const response = await fetch(requestUrl);

		if (response.status === 200) {
			const data = await response.json();

			return {
				id: data.id,
				price: data.price,
				pricePerSqMtr: data.pricePerSqMtr,
				realEstateValue: data.realEstateValue,
				fireInsuranceValue: data.fireInsuranceValue,
				constructionYear: data.constructionYear,
				address: data.address,
				description: data.description,
				zip: data.zip,
				rooms: data.rooms,
				bathrooms: data.bathrooms,
				bedrooms: data.bedrooms,
				type: data.type,
				created: data.created,
				size: data.size,
				latitude: data.latitude,
				longitude: data.longitude,
				image: data.image,
				url: data.url
			} as PropertyData;
		}
	} catch (e) {
		console.error(e);
	}

	return null;
};
