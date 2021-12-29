import RSS from "rss";
import { generateTitle, generateTrackingURL } from "../utils/url";

export async function get({ origin, host, query }) {
    const { codigo, titulo } = Object.fromEntries(query);

    const requestURL = `${origin ?? `http://${host}`}/rastrear/${codigo}.json`;
    const res = await fetch(requestURL);
    const rastreio = await res.json();

    const feed = new RSS({
      feed_url: generateTrackingURL({ codigo, titulo, isRSS: true }),
      site_url: generateTrackingURL({ codigo, titulo, isRSS: false }),
      title: generateTitle({ titulo, codigo }),
    });

    for (const track of rastreio) {
        feed.item({
            date: track.data,
            title: track.status,
            description: `${track.origem} ➡️ ${track.destino}<br/>${track.status}`,
            url: generateTrackingURL({ codigo, titulo, idDeEvento: track.data }),
        });
    }

    return {
        headers: {
            "Content-Type": "application/rss+xml",
            "Content-Disposition": "inline",
            "Cache-Control": "public, max-age=3600",
        },
        body: feed.xml(),
    };
}
