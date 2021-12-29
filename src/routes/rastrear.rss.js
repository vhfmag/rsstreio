import RSS from "rss";
import { rastro } from "rastrojs";
import { generateTrackingURL, getTrackingEventId } from "../utils/url";

export async function get(req, res, next) {
  const { codigo, titulo } = req.query;
  const [objectTracking] = await rastro.track(codigo);

  if (!objectTracking) {
    res.statusCode = 404;
    res.end(JSON.stringify(""));
  }

  const feed = new RSS({
    feed_url: generateTrackingURL({ codigo, titulo, isRSS: true }),
    site_url: generateTrackingURL({ codigo, titulo, isRSS: false }),
    title: `Rastreamento de "${titulo}" - ${codigo}`,
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
      url: generateTrackingURL({
        codigo: objectTracking.code,
        titulo: titulo,
        idDeEvento: getTrackingEventId(track.trackedAt),
      }),
    });
  }

  res.setHeader("Content-Type", "application/rss+xml");
  res.setHeader("Content-Disposition", "inline");
  res.end(feed.xml());
}
