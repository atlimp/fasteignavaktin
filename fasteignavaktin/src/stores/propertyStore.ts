import type { PropertyData } from '@lib/interfaces';
import { BASE_API_URL, PAGE_SIZE } from '@lib/constants';
import { hasMoreProperties } from './writeableStore';

export const fetchProperties = async (fetch, bounds, pageNo = 1) => {
    const { latMin, latMax, lonMin, lonMax } = bounds;
    const offset = PAGE_SIZE * (pageNo - 1);

    const requestUrl = `${BASE_API_URL}/properties/area?latMin=${latMin}&latMax=${latMax}&lonMin=${lonMin}&lonMax=${lonMax}&limit=${PAGE_SIZE}&offset=${offset}`;

    try {
        const data = await (await fetch(requestUrl)).json();

        hasMoreProperties.set(data.length >= PAGE_SIZE);

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