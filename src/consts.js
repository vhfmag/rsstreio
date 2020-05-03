export const getBaseUrl = () =>
  process.env.FINAL_URL || process.env.VERCEL_URL
    ? `https://${process.env.FINAL_URL || process.env.VERCEL_URL}`
    : "http://localhost:3000";
