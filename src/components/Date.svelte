<script>
  export let date;

  const actualDate = new Date(date);

  const machineReadableDate = actualDate.toISOString();
  const formattedDate =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat(globalThis?.navigator?.language || "pt-BR", { dateStyle: "short", timeStyle: "short" }).format(actualDate)
      : actualDate.toString();
</script>

<style>
  time {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
</style>

<time datetime={machineReadableDate}>{formattedDate}</time>
