import type { PropertyData, LatLonBounds } from '@lib/interfaces';
import { BASE_API_URL } from '@lib/constants';

export const fetchProperties = async (fetch, bounds) => {
    const { latMin, latMax, lonMin, lonMax } = bounds;
    const requestUrl = `${BASE_API_URL}/properties/area?latMin=${latMin}&latMax=${latMax}&lonMin=${lonMin}&lonMax=${lonMax}&limit=100`;

    try {
        const data = await (await fetch(requestUrl)).json();
        return data.map(x => {
            return {
                id: x.id,
                address: x.address,
                price: x.price,
                size: x.size,
                image: x.image,
                created: x.created,
                latitude: x.latitude,
                longitude: x.longitude,
                url: x.url,
            } as PropertyData
        });
    } catch (e) {

    }

    return [];
}