<svelte:head>
  <title>Rastreamento de Objetos - Correios</title>
</svelte:head>

<h1>Rastreamento de Objetos - Correios</h1>

<form action="/rastrear">
  <label>
    <span class="label">O que está sendo rastreado?</span>
    <input name="titulo" required />
  </label>
  <label>
    <span class="label">Código de rastreamento</span>
    <input name="codigo" required />
  </label>
  <button>Rastrear</button>
</form>

<style>
  form {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: auto 1fr;
    gap: 1rem 0.5rem;
  }

  label {
    display: contents;
  }

  button {
    grid-column: 2;
  }

  .label {
    align-self: center;
  }
</style>
