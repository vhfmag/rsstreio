const PRODUCTION_URL = import.meta.env.FINAL_URL || import.meta.env.VERCEL_URL;

const getBaseUrl = () =>
  PRODUCTION_URL ? `https://${PRODUCTION_URL}` : "http://localhost:3000";

export function generateTrackingURL({
  isRSS,
  codigo,
  titulo,
  idDeEvento,
}: {
  codigo: string;
  titulo?: string;
  idDeEvento?: string;
  isRSS?: boolean;
}) {
  const url = new URL(getBaseUrl());

  url.pathname = isRSS ? `/rastrear.rss` : `/rastrear`;
  url.searchParams.set("codigo", codigo);

  if (titulo) {
    url.searchParams.set("titulo", titulo);
  }

  if (idDeEvento) {
    url.hash = idDeEvento;
  }

  return url;
}

export function getTrackingEventId(trackedAt: string) {
  return new Date(trackedAt).toISOString();
}
