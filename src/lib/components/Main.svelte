<script>
	import BackgroundAnimation from '$lib/components/BackgroundAnimation/BackgroundAnimation.svelte';
</script>

<div class="main-container">
	<div class="text-box">
		<p>Came here expecting to find data visualizations by Jeff MacInnes?</p>
		<p>They've moved to his studio's site.</p>
		<p>Visit, won't you?</p>
		<p><a href="https://www.decimalpoint.studio" target="_self">www.decimalpoint.studio</a></p>
	</div>
	<div class="bg-container">
		<BackgroundAnimation />
	</div>
</div>

<style lang="scss">
	.main-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		width: 100vw;
		height: 100vh;
	}

	.text-box {
		margin-top: 10%;
		width: 60%;
		max-width: 1000px;
		background-color: rgba(255, 255, 255, 0.18);
		backdrop-filter: blur(4px);
		font-family: 'Inter', sans-serif;
		font-size: 5.4rem;
		font-weight: 100;
		line-height: 1.25;
		color: #737373;
		padding: 1rem 5rem;
		border: solid 1px var(--color-c2);
		border-radius: 5px;
	}

	a {
		font-weight: 700;
		letter-spacing: -0.06em;
		color: var(--color-c1);
		text-decoration: none;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 0;
			height: 3px; /* Adjust the thickness of the underline */
			background-color: currentColor; /* Uses the color of the text */
			transition: width 0.3s ease;
		}

		&:hover:after {
			width: 100%;
		}
	}

	.bg-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	@media screen and (max-width: 1000px) {
		.text-box {
			width: 90%;
			font-size: 3.4rem;
		}
	}

	@media screen and (max-width: 500px) {
		.text-box {
			padding: 1rem;
			font-size: 2rem;
		}
	}
</style>
