import type { ZipData } from '@lib/interfaces';
import { BASE_API_URL } from '@lib/constants';

export const fetchZipCodes = async (fetch) => {
	const requestUrl = new URL('/api/zip/all', BASE_API_URL);

	try {
		const data = await (await fetch(requestUrl)).json();

		return data.map((x) => {
			return {
				zipCode: x.zipCode,
				city: x.city,
				neighborhood: x.neighborhood
			} as ZipData;
		});
	} catch (e) {
		console.error(e);
	}

	return [];
};
