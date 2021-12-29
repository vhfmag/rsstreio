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
    grid-auto-flow: column;
    grid-gap: 1rem;
  }

  label {
    display: contents;
  }

  .label {
    align-self: center;
  }
</style>
