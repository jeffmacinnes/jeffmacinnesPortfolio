<script>
	import { Canvas } from '@threlte/core';
	import { dev } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';

	import Scene from './Scene.svelte';

	export let highlightNodes = true;
	export let lightIntensity = 10;
</script>

<div class="scene-container">
	<div class="mask" />
	<Canvas>
		<Scene {highlightNodes} {lightIntensity} />
	</Canvas>
</div>

<style lang="scss">
	.scene-container {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	.mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to top,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0) 50%,
			rgba(255, 255, 255, 1) 70%
		);
	}
</style>
