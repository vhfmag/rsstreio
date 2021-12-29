<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ page, fetch }) {
        const { codigo } = Object.fromEntries(page.query);

        const res = await fetch(`/rastrear/${codigo}.json`);

        const statusCode = res.status;
        const objectTracking = await res.json();

        return {
            status: statusCode,
            props: { codigo, objectTracking, statusCode },
        };
    }
</script>

<script>
    import DateComp from "../components/Date.svelte";
    import Location from "../components/Location.svelte";

    export let codigo, statusCode, objectTracking;
</script>

<svelte:head>
    <title>Rastreamento de Objeto - {codigo}</title>
    <link
        rel="alternate"
        href={`/rastrear.rss?codigo=${codigo}`}
        type="application/rss+xml"
    />
</svelte:head>

{#if statusCode === 200}
    <h1>Rastreamento de Objeto - {codigo}</h1>

    <nav>
        <a
            rel="alternate"
            href={`/rastrear.rss?codigo=${codigo}`}
            type="application/rss+xml"
        >
            RSS
        </a>
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
