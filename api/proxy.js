export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const response = await fetch("https://www.amasyakuyumculardernegi.com/");
    const html = await response.text();
    res.status(200).json({ contents: html });
  } catch (error) {
    res.status(500).json({ error: "Hata" });
  }
}