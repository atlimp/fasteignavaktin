import type { ZipData } from "@lib/interfaces";
import { fetchZipCodes } from "@stores/zipStore";
import { fetchProperties } from '@stores/propertyStore';
import type { PageServerData } from "./$types.js";
import { MAP_INITIAL_BOUNDS } from "@lib/constants.js";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, url }): Promise<PageServerData> => {
    const bounds = {
        latMin: Number(url.searchParams.get('latMin')),
        latMax: Number(url.searchParams.get('latMax')),
        lonMin: Number(url.searchParams.get('lonMin')),
        lonMax: Number(url.searchParams.get('lonMax')),
    };

    if (!(bounds.latMin || bounds.latMax || bounds.lonMin || bounds.lonMax)) {
        bounds.latMin = MAP_INITIAL_BOUNDS[1][0];
        bounds.latMax = MAP_INITIAL_BOUNDS[0][0];
        bounds.lonMin = MAP_INITIAL_BOUNDS[1][1];
        bounds.lonMax = MAP_INITIAL_BOUNDS[0][1];
    }

    const zipCodes = await fetchZipCodes(fetch);
    const properties = await fetchProperties(fetch, bounds);
    return {
        zipCodes: zipCodes,
        properties: properties,
    }
}