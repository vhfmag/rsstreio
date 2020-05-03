import { rastro } from "rastrojs";

export async function get(req, res, next) {
  const { code } = req.params;
  const [objectTracking] = await rastro.track(code);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(objectTracking));
}
