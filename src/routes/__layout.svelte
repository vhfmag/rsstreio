<main>
  <slot />
</main>

<style>
  :root {
    --text-color: rgba(0, 0, 0, 1);
    --secondary-text-color: rgba(0, 0, 0, 0.5);
  }

  :global(*, *::after, *::before) {
    box-sizing: border-box;
  }

  main {
    position: relative;
    max-width: 100vw;
    max-width: min(100vw, 56em);
    width: max-content;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  main :global(h1) {
    margin-bottom: 2rem;
  }
</style>
