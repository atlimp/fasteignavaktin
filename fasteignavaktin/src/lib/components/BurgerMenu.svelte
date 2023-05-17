<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BurgerIcon from '@lib/images/burger.svg';
	let open = false;
	let selected, asc_desc;

	const toggleOpen = () => {
		open = !open;
	};

	const setOrderBy = () => {
		if (selected) {
			$page.url.searchParams.set('orderBy', selected);
			goto(`?${$page.url.searchParams.toString()}`);
		}
	};

	const setAsc_Desc = () => {
		if (asc_desc) {
			$page.url.searchParams.set('asc_desc', asc_desc);
			goto(`?${$page.url.searchParams.toString()}`);
		}
	};
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img src={BurgerIcon} alt="Menu" on:click={toggleOpen} />
	{#if open}
		<div class="text-3xl fixed top-0 left-10 z-40 bg-blue-100">
			Raða eftir
			<select bind:value={asc_desc} on:change={setAsc_Desc}>
				<option value="asc">Hækkandi</option>
				<option value="desc">Lækkandi</option>
			</select>
			<select bind:value={selected} on:change={setOrderBy}>
				<option value="price">Verð</option>
				<option value="realEstateValue">Fasteignamat</option>
				<option value="fireInsValue">Brunabótamat</option>
				<option value="constructionYear">Byggingarár</option>
				<option value="rooms">Herbergi</option>
				<option value="bathrooms">Baðherbergi</option>
				<option value="bedrooms">Svefnherbergi</option>
				<option value="size">Stærð</option>
				<option value="pricePerSqMtr">Fermetraverð</option>
				<option value="created">Sett inn</option>
			</select>
		</div>
	{/if}
</div>
