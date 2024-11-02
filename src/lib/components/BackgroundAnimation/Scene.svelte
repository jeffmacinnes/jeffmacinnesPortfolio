<script>
	import { degToRad } from '$lib/utils/utils';
	import * as d3 from 'd3';
	import { onMount, onDestroy } from 'svelte';
	import { color } from '$lib/data/variables.json';

	import {
		T,
		PerspectiveCamera,
		OrbitControls,
		FogExp2,
		useFrame,
		useThrelte,
		Group,
		Object3DInstance
	} from '@threlte/core';
	import { AxesHelper } from 'three';
	import Node from './Node.svelte';
	import Lights from './Lights.svelte';

	export let highlightNodes = true;
	export let lightIntensity = 1;

	const axesHelper = new AxesHelper();
	let read;

	// Scales to position rods around origin
	const floorR = 150;
	const thetaSteps = 90; // # of spokes
	const thetaScale = d3
		.scaleLinear()
		.domain([0, thetaSteps])
		.range([0, degToRad(360)]);

	const rSteps = 15; // number of nodes along the radius (i.e. a spoke)
	const rScale = d3.scaleLinear().domain([0, rSteps]).range([20, floorR]);

	// Color probability for nodes
	const assignColor = () => {
		const chance = Math.random();
		if (chance <= 0.1) {
			return color.c1;
		} else if (chance > 0.1 && chance <= 0.2) {
			return color.c2;
		} else if (chance > 0.2 && chance <= 0.3) {
			return color.g4;
		} else {
			return color.g3;
		}
	};

	// Construct nodes
	let nodes = [];
	$: {
		nodes = [];
		for (let tIdx = 0; tIdx <= thetaSteps; tIdx++) {
			for (let rIdx = 0; rIdx <= rSteps; rIdx++) {
				//  compute the theta, radius for this node from the given theta and radius
				let theta = thetaScale(tIdx);
				const radius = rScale(rIdx);
				nodes.push({
					theta: theta,
					rad: radius,
					highlightColor: assignColor()
				});
			}
		}
	}

	// animate group
	let groupRotation = 0;
	useFrame(({ clock }) => {
		let time = clock.getElapsedTime();
		groupRotation = -time * 2;
	});

	let glCtx;
	let { renderer } = useThrelte();
	onMount(() => {
		// get the ctx so we can destroy it later
		let canvas = renderer.domElement;
		glCtx = canvas.getContext('webgl2');
	});

	onDestroy(() => {
		// console.log('losing context');
		// if (glCtx.getExtension('WEBGL_lose_context')) {
		// 	glCtx.getExtension('WEBGL_lose_context').loseContext();
		// }
	});
</script>

<!-- position={{ x: 6.8, y: 43.714, z: -135.229 }} -->

<PerspectiveCamera
	position={{ x: 6.8, y: 43.714, z: -135.229 }}
	fov={29}
	rotation={{ x: degToRad(-163), y: degToRad(28), z: degToRad(172) }}
/>

<!-- <Object3DInstance object={axesHelper} /> -->
<!-- <FogExp2 color={color.c1} density={0.001} /> -->

<!-- Lights -->
<Lights {lightIntensity} />

<!-- GROUND -->
<T.Mesh rotation.x={-Math.PI / 2} position.y={-3} position.z={0} receiveShadow>
	<T.PlaneGeometry args={[1000, 1000]} />
	<T.MeshStandardMaterial color={'#ffffff'} roughness={0} transparent={true} opacity={1} />
</T.Mesh>

<!-- Nodes -->
<Group rotation={{ y: degToRad(groupRotation) }}>
	{#each nodes as nodeProps}
		<Node {highlightNodes} {...nodeProps} />
	{/each}
</Group>
