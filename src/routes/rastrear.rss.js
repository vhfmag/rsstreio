import RSS from "rss";

import { getBaseUrl } from "../consts";
export async function get({ origin, host, query, ...rest }) {
    const { codigo } = Object.fromEntries(query);

    const requestURL = `${origin ?? `http://${host}`}/rastrear/${codigo}.json`;
    console.log({ requestURL });
    const res = await fetch(requestURL);
    const rastreio = await res.json();

    const feed = new RSS({
        feed_url: `${getBaseUrl()}/rastrear.rss?codigo=${codigo}`,
        site_url: `${getBaseUrl()}/rastrear?codigo=${codigo}`,
        title: `Rastreamento de Objeto - ${codigo}`,
    });

    for (const track of rastreio) {
        feed.item({
            date: track.data,
            title: track.status,
            description: `${track.origem} ➡️ ${track.destino}<br/>${track.status}`,
            url: `${getBaseUrl()}/rastrear?codigo=${codigo}#${track.trackedAt}`,
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
