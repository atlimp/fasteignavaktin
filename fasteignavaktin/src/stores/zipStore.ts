import type { ZipData } from '@lib/interfaces';
import { BASE_API_URL } from '@lib/constants';

export const fetchZipCodes = async (fetch) => {
	const requestUrl = `${BASE_API_URL}/zip/all`;

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
