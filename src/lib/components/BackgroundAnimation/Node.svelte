<script>
	import { browser } from '$app/environment';
	import { color } from '$lib/data/variables.json';
	import { useFrame } from '@threlte/core';
	import { degToRad, polarToCart, randBw, remap } from '$lib/utils/utils';
	import { createNoise3D } from 'simplex-noise';

	import alea from 'alea';

	import { onMount } from 'svelte';

	export let theta;
	export let rad;
	export let highlightColor;
	export let highlightNodes;

	let emissiveColor;
	let emissiveIntensity;
	let nodeColor;
	$: if (highlightNodes) {
		if (highlightColor) {
			emissiveColor = highlightColor;
			emissiveIntensity = 0;
			nodeColor = highlightColor;
		} else {
			emissiveColor = color.c1;
			emissiveIntensity = 1;
			nodeColor = color.c1;
		}
	} else {
		emissiveColor = color.c1;
		emissiveIntensity = 0;
		nodeColor = color.c1;
	}

	let coords = { x: 0, y: 0 };

	// sample noise space https://github.com/jwagner/simplex-noise.js
	const prng = alea('seed'); // create same seed for each node to keep it all in sync
	const noise3D = createNoise3D(prng);

	const useNoise = true;
	let frameCount = 0;

	useFrame(({ clock }) => {
		let rOffset;
		if (useNoise) {
			// offset based on simplex noise, sampled in 3D to get continuos loop around circle
			let noiseR = 0.5;
			let noiseCoords = polarToCart(noiseR, theta); // define x,y to sample noise space from
			let timeStep = clock.getElapsedTime() * 0.11; // z-dimension of noise space;
			timeStep = timeStep + -0.001 * rad; // timestep as function of radius
			let amp = 7 * rad * 0.05; // amplitude as function of radius
			rOffset = noise3D(noiseCoords.x * 1.2, noiseCoords.y * 1.2, timeStep) * amp;
		} else {
			// Offset based on sin function
			let time = clock.getElapsedTime() * 0.2; // speed of waves
			let amp = 7;
			let period = Math.PI;
			let phaseShift = theta + 0.1;
			rOffset = amp * Math.sin(period * (time + phaseShift));
		}

		// compute the x,y coordinates of this node
		coords = polarToCart(rad + rOffset, theta);
		frameCount++;
	});

	const y = 0;
</script>

<T.Mesh position={[coords.x, 0, coords.y]} castShadow let:ref>
	<T.CylinderGeometry args={[0.25, 0.25, 6, 16]} />
	<T.MeshStandardMaterial color={nodeColor} />
</T.Mesh>
