<script>
  export let date;

  const actualDate = new Date(date);

  const machineReadableDate = actualDate.toISOString().split("T")[0];
  const formattedDate =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat("pt-br").format(actualDate)
      : actualDate.toString();
</script>

<style>
  time {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
</style>

<time datetime={machineReadableDate}>{formattedDate}</time>
