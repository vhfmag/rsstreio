<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error?.name}`,
				message: error?.message,
				stack: error?.stack,
			}
		};
	}
</script>

<script>
	export let title, message, stack;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<p>{message}</p>

{#if dev && stack}
	<pre>{stack}</pre>
{/if}
