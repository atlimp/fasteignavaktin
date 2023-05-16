import { dev } from '$app/environment';

let api_url = 'https://fasteignavaktin.marcher.is';

if (dev) {
	api_url = 'http://localhost:3000';
}

export const BASE_API_URL = api_url;
export const MAP_INITIAL_BOUNDS = [
	[66.96447630005638, -15.029296875000002],
	[62.57816583754086, -21.895751953125]
];
export const PAGE_SIZE = 16;
