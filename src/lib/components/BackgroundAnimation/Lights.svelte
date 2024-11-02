<script>
	import { T } from '@threlte/core';
	import { color } from '$lib/data/variables.json';

	export let lightIntensity = 1;
	import { tweened } from 'svelte/motion';
	import * as easings from 'svelte/easing';

	const lightIntensityTween = tweened(lightIntensity, {
		duration: 1000,
		easing: easings.cubicInOut
	});

	$: if (lightIntensity) {
		lightIntensityTween.set(lightIntensity);
	}

	let frameCount = 0;
	// useFrame(() => {
	// 	frameCount++;
	// 	console.log(frameCount);
	// });
</script>

<T.DirectionalLight
	position={[30, 50, 0]}
	intensity={0.6}
	castShadow
	shadow.camera.near={0.1}
	shadow.camera.far={1000}
	shadow.camera.left={-100}
	shadow.camera.right={100}
	shadow.camera.top={100}
	shadow.camera.bottom={-100}
	shadow.mapSize.width={1500}
	shadow.mapSize.height={1500}
	shadow.bias={-0.0001}
	shadow.radius={100}
/>

<T.DirectionalLight position={[20, 100, 50]} intensity={0.3} castShadow={true} />
<!-- <T.HemisphereLight skyColor={'#0000ff'} groundColor={color.c1} intensity={0.5} /> -->

<T.AmbientLight color={color.white} intensity={0.5} />
<T.PointLight position={[-0, 84, -51]} intensity={0.9} color={color.c1} />
