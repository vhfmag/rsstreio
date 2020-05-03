import RSS from "rss";
import { rastro } from "rastrojs";

import { BASE_URL } from "../consts";
export async function get(req, res, next) {
  const { codigo } = req.query;
  const [objectTracking] = await rastro.track(codigo);

  const feed = new RSS({
    feed_url: `${BASE_URL}/rastrear.rss?codigo=${objectTracking.code}`,
    site_url: `${BASE_URL}/rastrear?codigo=${objectTracking.code}`,
    title: `Rastreamento de Objeto - ${objectTracking.code}`,
  });

  for (const track of objectTracking.tracks) {
    const title = `${track.status} ${track.observation || ""}`.trim();
    feed.item({
      date: track.trackedAt,
      title,
      description: title,
      url: `${BASE_URL}/rastrear?codigo=${
        objectTracking.code
      }#${track.trackedAt.valueOf()}`,
    });
  }

  res.setHeader("Content-Type", "application/rss+xml");
  res.setHeader("Content-Disposition", "inline");
  res.end(feed.xml());
}
