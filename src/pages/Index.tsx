import { useState, useEffect } from "react";
import GoldPriceCard from "@/components/GoldPriceCard";
import AdBanner from "@/components/AdBanner";
import Header from "@/components/Header";
import { Calculator, Star } from "lucide-react";

const goldPrices = [
  {
    id: "bilezik",
    name: "22 Ayar Bilezik",
    buying: "6.630 ₺",
    selling: "7.277 ₺",
    discountSelling: "6.930 ₺",
    trend: "up" as const,
    icon: "📿",
  },
  {
    id: "gram",
    name: "24 Gram Altın",
    buying: "7.230 ₺",
    selling: "7.823 ₺",
    discountSelling: "7.450 ₺",
    trend: "up" as const,
    icon: "🏅",
  },
  {
    id: "ceyrek",
    name: "Çeyrek Altın",
    buying: "11.640 ₺",
    selling: "12.747 ₺",
    discountSelling: "12.140 ₺",
    trend: "up" as const,
    icon: "🪙",
  },
  {
    id: "yarim",
    name: "Yarım Altın",
    buying: "23.280 ₺",
    selling: "25.494 ₺",
    discountSelling: "24.280 ₺",
    trend: "up" as const,
    icon: "💰",
  },
  {
    id: "lira",
    name: "Cumhuriyet Lirası",
    buying: "46.560 ₺",
    selling: "50.988 ₺",
    discountSelling: "48.560 ₺",
    trend: "up" as const,
    icon: "🏆",
  },
  {
    id: "arma",
    name: "Arma Altın",
    buying: "116.400 ₺",
    selling: "127.470 ₺",
    discountSelling: "121.400 ₺",
    trend: "up" as const,
    icon: "⭐",
  },
  {
    id: "ata",
    name: "Ata Altın",
    buying: "47.950 ₺",
    selling: "52.122 ₺",
    discountSelling: "49.640 ₺",
    trend: "up" as const,
    icon: "🎖️",
  },
];

const Index = () => {
  const [updateTime, setUpdateTime] = useState("20.02.2026 03:57:01");
  const [isLive, setIsLive] = useState(true);

  const handleRefresh = () => {
    const now = new Date();
    const formatted = now.toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setUpdateTime(formatted);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile frame */}
      <div className="max-w-md mx-auto relative">
        <Header
          updateTime={updateTime}
          isLive={isLive}
          onRefresh={handleRefresh}
        />

        <div className="px-4 pb-24 space-y-5 pt-4">
          {/* Ad Banner */}
          <AdBanner />

          {/* Section title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 gold-gradient rounded-full" />
              <h2 className="text-base font-bold text-foreground font-serif">
                Amasya'da Tavsiye Edilen Fiyatlar
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400 font-medium">Canlı</span>
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 gap-2 px-1">
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Alış</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">Satış</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] text-accent uppercase tracking-wider font-semibold">İsk. Satış</span>
            </div>
          </div>

          {/* Gold price cards */}
          <div className="space-y-3">
            {goldPrices.map((gold) => (
              <GoldPriceCard key={gold.id} {...gold} />
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gold/15" />
            <Star size={12} className="text-primary" />
            <div className="flex-1 h-px bg-gold/15" />
          </div>

          {/* Calculator promo */}
          <div className="rounded-xl border border-gold/20 bg-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shrink-0">
              <Calculator size={18} className="text-background" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Altın Hesap Makinesi</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Altın değerinizi anında hesaplayın
              </p>
            </div>
          </div>

          {/* Info note */}
          <div className="rounded-xl bg-muted/50 border border-gold/10 p-3">
            <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
              ⚠️ Fiyatlar bilgi amaçlıdır. Güncel fiyat için kuyumcunuza danışınız.
              <br />
              <span className="text-primary font-medium">amasyakuyumculardernegi.com</span>
            </p>
          </div>

          {/* Second ad banner area */}
          <div className="rounded-xl border border-dashed border-gold/25 p-4 text-center bg-card/50">
            <p className="text-xs text-muted-foreground">📢 Reklam alanınız için iletişime geçin</p>
            <p className="text-[10px] text-primary mt-1 font-medium">Kuyumcu reklamınızı buraya ekletin</p>
          </div>
        </div>

        {/* Bottom navigation bar */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
          <div className="bg-card/95 backdrop-blur-xl border-t border-gold/20 px-6 py-3">
            <div className="flex justify-around">
              {[
                { icon: "🏠", label: "Ana Sayfa", active: true },
                { icon: "📊", label: "Piyasalar", active: false },
                { icon: "🔔", label: "Bildirimler", active: false },
                { icon: "ℹ️", label: "Hakkında", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    item.active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[9px] font-medium">{item.label}</span>
                  {item.active && (
                    <div className="w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
