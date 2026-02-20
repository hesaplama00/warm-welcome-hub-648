import { useState, useEffect } from "react";

const PROXY_URL = "https://amasya-altin-fiyatlari.vercel.app/api/proxy?url=";
const TARGET_URL = "";

export const useGoldPrices = () => {
  const [prices, setPrices] = useState([
    { id: "bilezik", name: "22 Ayar Bilezik", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "🔿" },
    { id: "gram", name: "24 Gram Altın", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "🅰" },
    { id: "ceyrek", name: "Çeyrek Altın", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "🪙" },
    { id: "yarim", name: "Yarım Altın", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "💰" },
    { id: "lira", name: "Cumhuriyet Lirası", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "🆔" },
    { id: "arma", name: "Arma Altın", buying: "...", selling: "...", discountSelling: "...", trend: "stable" as const, icon: "▪️" },
  ]);
  const [updateTime, setUpdateTime] = useState("-");
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const res = await fetch(PROXY_URL);
      const data = await res.json();
      const html = data.contents;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const rows = doc.querySelectorAll("table tr");

      const priceMap: Record<string, { buying: string; selling: string; discount: string }> = {};

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 3) {
          const label = cells[0].textContent?.trim() || "";
          const buying = cells[1].textContent?.trim() || "";
          const selling = cells[2].textContent?.trim() || "";
          const discount = cells[3]?.textContent?.trim() || "";

          if (label.includes("22 Ayar")) priceMap["bilezik"] = { buying, selling, discount };
          if (label.includes("24 Gram")) priceMap["gram"] = { buying, selling, discount };
          if (label.includes("eyrek")) priceMap["ceyrek"] = { buying, selling, discount };
          if (label.includes("Yar")) priceMap["yarim"] = { buying, selling, discount };
          if (label.includes("Lira")) priceMap["lira"] = { buying, selling, discount };
          if (label.includes("Arma")) priceMap["arma"] = { buying, selling, discount };
        }
      });

      setPrices((prev) =>
        prev.map((p) =>
          priceMap[p.id]
            ? { ...p, buying: priceMap[p.id].buying + " ₺", selling: priceMap[p.id].selling + " ₺", discountSelling: priceMap[p.id].discount + " ₺", trend: "up" as const }
            : p
        )
      );

      const now = new Date();
      setUpdateTime(now.toLocaleString("tr-TR"));
    } catch (e) {
      console.error("Fiyat çekme hatası:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return { prices, updateTime, loading, fetchPrices };
};