<script>
  export let date;

  const machineReadableDate = date.toISOString().split("T")[0];
  const formattedDate =
    typeof Intl !== "undefined" && Intl.DateTimeFormat
      ? new Intl.DateTimeFormat("pt-br").format(date)
      : date.toString();
</script>

<style>
  time {
    color: var(--secondary-text-color);
    font-size: 0.9em;
  }
</style>

<time datetime={machineReadableDate}>{formattedDate}</time>
