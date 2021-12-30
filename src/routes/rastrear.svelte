<script context="module" lang="ts">
  export async function load({
    page,
    fetch,
  }: import("@sveltejs/kit").LoadInput) {
    const { codigo, titulo } = Object.fromEntries(page.query);

    const res = await fetch(`/rastrear/${codigo}.json`);

    const statusCode = res.status;
    const objectTracking = await res.json();

    const protocol = import.meta.env.PROD ? "https" : "http";

    return {
      status: statusCode,
      props: {
        origin: `${protocol}://${page.host}`,
        codigo,
        titulo,
        objectTracking,
        statusCode,
      },
    };
  }
</script>

<script lang="ts">
  import type { TrackingEntry } from "brazuka-correios";

  import DateComp from "../components/Date.svelte";
  import Location from "../components/Location.svelte";
  import { generateTitle, generateTrackingURL } from "../utils/url";

  export let codigo: string,
    titulo: string | undefined,
    statusCode: number,
    objectTracking: Array<TrackingEntry>,
    origin: string;

  const rssHref = generateTrackingURL({ origin, codigo, titulo, isRSS: true });
  const tituloCompleto = generateTitle({ titulo, codigo });
</script>

<svelte:head>
  <title>{tituloCompleto}</title>
  <link rel="alternate" href={rssHref} type="application/rss+xml" />
</svelte:head>

<div class="wrapper">
  {#if statusCode === 200}
    <h1>{tituloCompleto}</h1>

    {#if !titulo}
      <form action="/rastrear">
        <label>
          <span class="label">O que está sendo rastreado?</span>
          <input name="titulo" required />
        </label>
        <input type="hidden" name="codigo" value={codigo} required />
        <button>Rastrear</button>
      </form>
    {/if}

    <nav>
      <a rel="alternate" href={rssHref} type="application/rss+xml"> RSS </a>
    </nav>

    <hr />

    <ul>
      {#each objectTracking ?? [] as status}
        <li>
          <article id={status.data}>
            <h2>
              <Location location={status.origem} />
            </h2>
            <DateComp date={status.data} />
            <p>{status.status}</p>
          </article>
        </li>
      {/each}
    </ul>
  {:else}
    <h1>Código inválido ({statusCode})</h1>
  {/if}
</div>

<style>
  h1 {
    margin: 0;
  }

  .wrapper > * + * {
    margin-top: 1em;
  }

  ul {
    list-style-type: none;
    padding: 0;

    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: row;
    width: max-content;
    max-width: 100%;
  }

  h2::first-letter {
    text-transform: uppercase;
  }

  article {
    padding: 0.75rem;
    border: 2px solid var(--text-color);
    border-radius: 0.3em;
  }

  article > :first-child {
    margin-top: 0;
  }

  article > :last-child {
    margin-bottom: 0;
  }

  article > * {
    margin: 0;
  }

  article:target {
    box-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, 0.75);
  }
</style>
