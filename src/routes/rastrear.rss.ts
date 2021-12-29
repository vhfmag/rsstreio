import RSS from "rss";
import { generateTitle, generateTrackingURL } from "../utils/url";
import type { Request, Response } from "@sveltejs/kit";
import type { TrackingEntry } from "brazuka-correios";

export async function get({
  origin,
  host,
  query,
}: Request & { origin?: string }): Promise<Response> {
  const { codigo, titulo } = Object.fromEntries(query);

  const requestURL = `${origin ?? `http://${host}`}/rastrear/${codigo}.json`;
  const res = await fetch(requestURL);
  const rastreio: TrackingEntry[] = await res.json();

  const feed = new RSS({
    feed_url: generateTrackingURL({ codigo, titulo, isRSS: true }).href,
    site_url: generateTrackingURL({ codigo, titulo, isRSS: false }).href,
    title: generateTitle({ titulo, codigo }),
  });

  for (const track of rastreio) {
    feed.item({
      date: track.data,
      title: track.status,
      description: `${track.origem} ➡️ ${track.destino}<br/>${track.status}`,
      url: generateTrackingURL({ codigo, titulo, idDeEvento: track.data }).href,
    });
  }

  return {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml",
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=3600",
    },
    body: feed.xml(),
  };
}
