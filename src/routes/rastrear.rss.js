import RSS from "rss";
import { rastro } from "rastrojs";

import { getBaseUrl } from "../consts";
export async function get(req, res, next) {
  const { codigo } = req.query;
  const [objectTracking] = await rastro.track(codigo);

  if (!objectTracking) {
    res.statusCode = 404;
    res.end(JSON.stringify(""));
  }

  const feed = new RSS({
    feed_url: `${getBaseUrl()}/rastrear.rss?codigo=${objectTracking.code}`,
    site_url: `${getBaseUrl()}/rastrear?codigo=${objectTracking.code}`,
    title: `Rastreamento de Objeto - ${objectTracking.code}`,
  });

  objectTracking.tracks.sort(
    (t1, t2) =>
      new Date(t2.trackedAt).valueOf() - new Date(t1.trackedAt).valueOf()
  );

  for (const track of objectTracking.tracks) {
    const title = `${track.status} ${track.observation || ""}`.trim();
    feed.item({
      date: track.trackedAt,
      title,
      description: title,
      url: `${getBaseUrl()}/rastrear?codigo=${
        objectTracking.code
      }#${track.trackedAt.valueOf()}`,
    });
  }

  res.setHeader("Content-Type", "application/rss+xml");
  res.setHeader("Content-Disposition", "inline");
  res.end(feed.xml());
}
