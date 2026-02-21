import { useState, useEffect } from "react";
import GoldPriceCard from "@/components/GoldPriceCard";
import AdBanner from "@/components/AdBanner";
import Header from "@/components/Header";
import { Star, Home, BarChart2, Bell, Info } from "lucide-react";

const goldPrices = [
  { id: "bilezik", name: "22 Ayar Bilezik", buying: "6.630 ₺", selling: "7.277 ₺", discountSelling: "6.930 ₺", trend: "up" as const, icon: "📿" },
  { id: "gram", name: "24 Gram Altın", buying: "7.230 ₺", selling: "7.823 ₺", discountSelling: "7.450 ₺", trend: "up" as const, icon: "🏅" },
  { id: "ceyrek", name: "Çeyrek Altın", buying: "11.640 ₺", selling: "12.747 ₺", discountSelling: "12.140 ₺", trend: "up" as const, icon: "🪙" },
  { id: "yarim", name: "Yarım Altın", buying: "23.280 ₺", selling: "25.494 ₺", discountSelling: "24.280 ₺", trend: "up" as const, icon: "💰" },
  { id: "lira", name: "Cumhuriyet Lirası", buying: "46.560 ₺", selling: "50.988 ₺", discountSelling: "48.560 ₺", trend: "up" as const, icon: "🏆" },
  { id: "arma", name: "Arma Altın", buying: "116.400 ₺", selling: "127.470 ₺", discountSelling: "121.400 ₺", trend: "up" as const, icon: "⭐" },
  { id: "ata", name: "Ata Altın", buying: "47.950 ₺", selling: "52.122 ₺", discountSelling: "49.640 ₺", trend: "up" as const, icon: "🎖️" },
];

const navItems = [
  { icon: Home, label: "Ana Sayfa", active: true },
  { icon: BarChart2, label: "Piyasalar", active: false },
  { icon: Bell, label: "Bildirimler", active: false },
  { icon: Info, label: "Hakkında", active: false },
];

const Index = () => {
  const [updateTime, setUpdateTime] = useState("20.02.2026 03:57:01");
  const [isLive] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setContentReady(true);
    }, 2300);
    return () => clearTimeout(splashTimer);
  }, []);

  const handleRefresh = () => {
    const now = new Date();
    setUpdateTime(now.toLocaleString("tr-TR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Splash Screen */}
      {showSplash && (
        <div className="splash-screen fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
          <div className="splash-logo text-5xl">🪙</div>
          <h1 className="splash-text text-2xl font-bold gold-text font-serif mt-4 text-center px-8">
            Amasya Kuyumcular<br />Altın Fiyatları
          </h1>
          <div className="splash-bar w-16 h-0.5 gold-gradient rounded-full mt-4" />
        </div>
      )}

      <div className="max-w-md mx-auto relative">
        <Header updateTime={updateTime} isLive={isLive} onRefresh={handleRefresh} />

        <div className={`pb-24 pt-3 space-y-4 px-4 ${contentReady ? '' : 'opacity-0'}`}>
          {/* Ad Banner */}
          <div className={contentReady ? 'content-enter content-enter-delay-1' : ''}>
            <AdBanner />
          </div>

          {/* Price Table */}
          <div className={contentReady ? 'content-enter content-enter-delay-2' : ''}>
            <div className="rounded-2xl border border-gold/20 bg-card overflow-hidden shadow-lg">
              {/* Table header */}
              <div className="flex items-center px-3 py-2 bg-secondary/60 border-b border-gold/20">
                <div className="w-[130px] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-3.5 gold-gradient rounded-full" />
                    <span className="text-[10px] font-bold text-foreground tracking-wide uppercase">Tavsiye Fiyatları</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 text-right flex-1">
                  <span className="px-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Alış</span>
                  <span className="px-1 text-[10px] font-semibold text-primary uppercase tracking-wider border-x border-gold/15">Satış</span>
                  <span className="pl-1 text-[10px] font-semibold text-accent uppercase tracking-wider">İsk.</span>
                </div>
              </div>

              {/* Rows */}
              {goldPrices.map((gold) => (
                <GoldPriceCard key={gold.id} {...gold} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={contentReady ? 'content-enter content-enter-delay-3' : ''}>
            <div className="flex items-center gap-3 px-1">
              <div className="flex-1 h-px bg-gold/10" />
              <Star size={10} className="text-primary/60" />
              <div className="flex-1 h-px bg-gold/10" />
            </div>
          </div>

          {/* Second ad slot */}
          <div className={contentReady ? 'content-enter content-enter-delay-3' : ''}>
            <div className="rounded-2xl border border-dashed border-gold/20 p-4 text-center bg-card/30 hover:bg-card/60 transition-colors cursor-pointer">
              <p className="text-xs text-muted-foreground">📢 Reklam alanı</p>
              <p className="text-[10px] text-primary/80 mt-0.5">Kuyumcu reklamınızı buraya ekletin</p>
            </div>
          </div>

          {/* Info note */}
          <div className={contentReady ? 'content-enter content-enter-delay-4' : ''}>
            <div className="rounded-xl bg-secondary/40 border border-gold/10 px-4 py-3">
              <p className="text-[11px] text-muted-foreground leading-relaxed text-center">
              ⚠️ Fiyatlar bilgi amaçlıdır. Güncel fiyat için kuyumcunuza danışınız.
            </p>
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30">
          <div className="bg-card/95 backdrop-blur-xl border-t border-gold/15 px-6 pt-3 pb-5">
            <div className="flex justify-around">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    item.active ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  <item.icon size={item.active ? 20 : 19} strokeWidth={item.active ? 2 : 1.5} />
                  <span className="text-[9px] font-medium">{item.label}</span>
                  {item.active && <div className="w-1 h-0.5 rounded-full bg-primary mt-0.5" />}
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
