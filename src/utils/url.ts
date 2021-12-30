import { DEFAULT_OBJECT_TITLE } from "../consts";

const PRODUCTION_URL = import.meta.env.VITE_FINAL_URL || import.meta.env.VITE_VERCEL_URL;

const getBaseUrl = () =>
  PRODUCTION_URL ? `https://${PRODUCTION_URL}` : "http://localhost:3000";

export function generateTrackingURL({
  origin,
  isRSS,
  codigo,
  titulo,
  idDeEvento,
}: {
  origin: string;
  codigo: string;
  titulo?: string;
  idDeEvento?: string;
  isRSS?: boolean;
}) {
  let url = `${origin}/rastrear${isRSS ? ".rss" : ""}?codigo=${encodeURIComponent(codigo)}`;

  if (titulo) {
    url += `titulo=${encodeURIComponent(titulo)}`;
  }

  if (idDeEvento) {
    url += `#${encodeURIComponent(idDeEvento)}`;
  }

  return url;
}

export function generateTitle({
  titulo,
  codigo,
}: {
  titulo?: string;
  codigo: string;
}) {
  titulo = titulo?.trim();
  titulo ||= DEFAULT_OBJECT_TITLE;

  return `Rastreamento de "${titulo}" - ${codigo}`;
}
