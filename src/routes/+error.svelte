<script lang="ts">
  import { page } from "$app/stores";

  const dev = import.meta.env.DEV;
  const title = `got ${$page.status} for ${$page.url.pathname}`;
  const stack = $page.error && "stack" in $page.error && $page.error.stack;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<p>{$page.error?.message}</p>

{#if dev && stack}
  <pre>{stack}</pre>
{/if}

<style>
  h1,
  p {
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
