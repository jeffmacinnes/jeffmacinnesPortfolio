<script>
	import logo from '$lib/assets/DecimalPointLogo.png';
</script>

<div class="main-container">
	<div class="text-container">
		<p>
			Looking for Jeff MacInnes? Head over to
			<a href="decimalpoint.studio">Decimal Point Studio</a>
		</p>
	</div>

	<div class="bg-image">
		<img src={logo} alt="" />
	</div>
</div>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.bg-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;

		img {
			width: 100%;
		}
	}

	h1 {
		width: 100%;
	}
</style>
