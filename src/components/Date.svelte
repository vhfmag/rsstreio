<script lang="ts">
  export let date: string | Date;

  const actualDate = new Date(date);

  const machineReadableDate = actualDate.toISOString();
  const formattedShortDate =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat(globalThis?.navigator?.language || "pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(actualDate)
      : actualDate.toString();

  const formattedFullDate =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat(globalThis?.navigator?.language || "pt-BR", {
          dateStyle: "long",
          timeStyle: "long",
        }).format(actualDate)
      : actualDate.toString();
</script>

<time datetime={machineReadableDate} title={formattedFullDate}>{formattedShortDate}</time>

<style>
  time {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
</style>
