<script lang="ts">
  export let location: string;

  const [city, state] = location
    .trim()
    .split("/")
    .map((p) => p.trim());

  const formattedCity = city
    .split(/\s/)
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");

  const formattedState = state.toLocaleUpperCase();
</script>

<span>{formattedCity} / {formattedState}</span>
