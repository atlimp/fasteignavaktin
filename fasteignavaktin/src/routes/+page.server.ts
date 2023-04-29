import type { ZipData } from "@lib/interfaces";
import { fetchZipCodes } from "@stores/zipStore";
import { fetchProperties } from '@stores/propertyStore';
import type { PageServerData } from "./$types.js";

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, url }): Promise<PageServerData> => {
    const bounds = {
        latMin: url.searchParams.get('latMin'),
        latMax: url.searchParams.get('latMax'),
        lonMin: url.searchParams.get('lonMin'),
        lonMax: url.searchParams.get('lonMax'),
    };

    const zipCodes = await fetchZipCodes(fetch);
    const properties = await fetchProperties(fetch, bounds);
    return {
        zipCodes: zipCodes,
        properties: properties,
    }
}