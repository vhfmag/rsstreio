import RSS from "rss";
import { generateTitle, generateTrackingURL } from "$lib/utils/url";
import type { TrackingEntry } from "brazuka-correios";
import { cleanUpString } from "$lib/utils/parse";

export async function GET({ url }) {
  const { codigo, titulo } = Object.fromEntries(url.searchParams);

  const protocol = import.meta.env.PROD ? "https" : "http";
  const origin = `${protocol}://${url.host}`;

  const requestURL = `${origin}/rastrear/${codigo}.json`;
  const res = await fetch(requestURL);
  const rastreio: TrackingEntry[] = await res.json();

  const feed = new RSS({
    feed_url: generateTrackingURL({ origin, codigo, titulo, isRSS: true }),
    site_url: generateTrackingURL({ origin, codigo, titulo, isRSS: false }),
    title: generateTitle({ titulo, codigo }),
  });

  for (const track of rastreio) {
    feed.item({
      date: track.data,
      title: track.status,
      description:
        "local" in track
          ? `${cleanUpString(track.local)}<br/>${cleanUpString(track.status)}`
          : `${cleanUpString(track.origem)} ➡️ ${cleanUpString(track.destino)}<br/>${cleanUpString(
              track.status,
            )}`,
      url: generateTrackingURL({ origin, codigo, titulo, idDeEvento: track.data }),
    });
  }

  return new Response(feed.xml(), {
    status: 200,
    headers: new Headers({
      "Content-Type": "application/rss+xml",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=3600",
    }),
  });
}
