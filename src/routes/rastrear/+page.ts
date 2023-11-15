import type { TrackingEntry } from "brazuka-correios";

export const load: import("./$types").PageLoad = async ({ url, fetch }) => {
  const { codigo, titulo } = Object.fromEntries(url.searchParams);

  const res = await fetch(`/rastrear/${codigo}.json`);

  const statusCode = res.status;

  const objectTracking: TrackingEntry[] = await res.json();

  const protocol = import.meta.env.PROD ? "https" : "http";

  return {
    origin: `${protocol}://${url.host}`,
    codigo,
    titulo,
    objectTracking,
    statusCode,
  };
};
