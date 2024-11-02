<script>
	import { browser } from '$app/environment';
	import { T, InteractiveObject } from '@threlte/core';
	import { color } from '$data/variables.json';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let data;
	export let state = '';
	let coords = tweened({ x: 0, y: 0, z: 0 }, { duration: 2500, easing: cubicOut });

	$: if (state !== '') {
		let currentState;
		if (state === 'default') {
			currentState = data['default'];
		} else {
			currentState = data[state];
		}
		coords.set({ x: currentState.x, y: currentState.y, z: currentState.z });
	}
	let yOffset = 0;

	onMount(() => {
		let frame;
		let start = Math.random() * 10;

		const update = () => {
			let timeInSecs = Date.now() / 1000;
			yOffset = Math.sin(timeInSecs + start);
			frame = requestAnimationFrame(update);
		};

		update();

		return () => cancelAnimationFrame(frame);
	});
</script>

<T.Mesh position={[$coords.x, $coords.y + yOffset, $coords.z]} castShadow let:ref>
	<!-- Add interaction -->
	<InteractiveObject object={ref} interactive />

	<T.CylinderGeometry args={[0.2, 0.2, 3, 32]} />
	<T.MeshStandardMaterial color={color.c2} transparent={true} opacity={0.7} />
</T.Mesh>
