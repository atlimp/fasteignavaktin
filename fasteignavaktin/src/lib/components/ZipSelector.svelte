<script lang="ts">
	import type { ZipData } from '@lib/interfaces';

	export let zipCodes: ZipData[];
</script>

<select>
	{#each zipCodes as zipCode}
		<option value={zipCode.zipCode}
			>{`${zipCode.zipCode} ${zipCode.city} ${zipCode.neighborhood}`}</option
		>
	{/each}
</select>
