<script lang="ts">
	import Icon from '@lib/images/marker.png';
	import Button from './Button.svelte';
	import { hasMoreProperties, pageNo } from '@stores/writeableStore';
	import BurgerMenu from './BurgerMenu.svelte';
	let disabled;

	hasMoreProperties.subscribe((val) => {
		disabled = !val;
	});

	const onButtonClick = () => {
		pageNo.update((x) => x + 1);
	};
</script>

<div class="row-span-1 grid grid-cols-6">
	<div class="flex">
		<BurgerMenu />
		<Button onClick={onButtonClick} buttonText="Sækja fleiri" {disabled} />
	</div>
	<div class="w-full m-auto col-span-4 grid grid-cols-6">
		<h1 class="uppercase text-6xl col-span-3 tracking-widest col-start-3">Fasteignavaktin</h1>
		<img class="mx-8 col-span-1 col-start-6 justify-self-end" src={Icon} alt="Logo" />
	</div>
</div>
