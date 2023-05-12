// See https://kit.svelte.dev/docs/types#app

import type { Zip } from '@lib/interfaces';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface PageServerData {
			zipCodes: Zip[];
		}
	}
}

export {};
