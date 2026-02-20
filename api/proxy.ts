export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    const response = await fetch("https://www.amasyakuyumculardernegi.com/");
    const html = await response.text();
    res.status(200).json({ contents: html });
  } catch (error) {
    res.status(500).json({ error: "Veri çekilemedi" });
  }
}