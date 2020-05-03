<script context="module">
  import { rastro } from "rastrojs";
  // const rastro = { track: () => ({ eita: 1 }) };

  export async function preload(page, session) {
    const { codigo } = page.query;
    const [objectTracking] = await rastro.track(codigo);
    return { objectTracking };
  }
</script>

<script>
  import Date from "../components/Date.svelte";
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
  {#each objectTracking.tracks.reverse() as status}
    <li>
      <article>
        <h2 id={status.trackedAt.valueOf()}>
          <Location location={status.locale} />
        </h2>
        <Date date={status.trackedAt} />
        <p>{status.status} {status.observation || ''}</p>
      </article>
    </li>
  {/each}
</ul>
