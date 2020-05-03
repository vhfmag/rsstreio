<script context="module">
  export async function preload(page, session) {
    const { codigo } = page.query;
    const objectTracking = await this.fetch(`/rastrear/${codigo}.json`).then(
      res => res.json()
    );
    objectTracking.tracks.sort(
      (t1, t2) =>
        new Date(t2.trackedAt).valueOf() - new Date(t1.trackedAt).valueOf()
    );
    return { objectTracking };
  }
</script>

<script>
  import DateComp from "../components/Date.svelte";
  import Location from "../components/Location.svelte";

  export let objectTracking;
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
</style>

<svelte:head>
  <title>Rastreamento de Objeto - {objectTracking.code}</title>
</svelte:head>

<h1>Rastreamento de Objeto - {objectTracking.code}</h1>

<ul>
  {#each objectTracking.tracks as status}
    <li>
      <article>
        <h2 id={new Date(status.trackedAt).valueOf()}>
          <Location location={status.locale} />
        </h2>
        <DateComp date={status.trackedAt} />
        <p>{status.status} {status.observation || ''}</p>
      </article>
    </li>
  {/each}
</ul>
