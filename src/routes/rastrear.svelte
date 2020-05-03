<script context="module">
  export async function preload(page, session) {
    const { codigo } = page.query;
    const [statusCode, objectTracking] = await this.fetch(
      `/rastrear/${codigo}.json`
    ).then(res => Promise.all([res.status, res.json()]));

    objectTracking.tracks.sort(
      (t1, t2) =>
        new Date(t2.trackedAt).valueOf() - new Date(t1.trackedAt).valueOf()
    );
    return { codigo, objectTracking, statusCode };
  }
</script>

<script>
  import DateComp from "../components/Date.svelte";
  import Location from "../components/Location.svelte";

  export let codigo, statusCode, objectTracking;
</script>

<style>
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

<svelte:head>
  <title>Rastreamento de Objeto - {objectTracking.code}</title>
  <link
    rel="alternate"
    href={`/rastrear.rss?codigo=${codigo}`}
    type="application/rss+xml" />
</svelte:head>

{#if statusCode === 200}
  <h1>Rastreamento de Objeto - {objectTracking.code}</h1>

  <nav>
    <a
      rel="alternate"
      href={`/rastrear.rss?codigo=${codigo}`}
      type="application/rss+xml">
      RSS
    </a>
  </nav>

  <hr />

  <ul>
    {#each objectTracking.tracks as status}
      <li>
        <article id={new Date(status.trackedAt).valueOf()}>
          <h2>
            <Location location={status.locale} />
          </h2>
          <DateComp date={status.trackedAt} />
          <p>{status.status} {status.observation || ''}</p>
        </article>
      </li>
    {/each}
  </ul>
{:else}
  <h1>Código inválido ({statusCode})</h1>
{/if}
