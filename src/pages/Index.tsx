import { useState } from "react";
import GoldPriceCard from "@/components/GoldPriceCard";
import AdBanner from "@/components/AdBanner";
import Header from "@/components/Header";
import Hakkinda from "@/pages/Hakkinda";
import { Home, BarChart2, Bell, Info } from "lucide-react";
import { useGoldPrices } from "@/hooks/useGoldPrices";

const navItems = [
  { icon: Home, label: "Ana Sayfa" },
  { icon: BarChart2, label: "Piyasalar" },
  { icon: Bell, label: "Bildirimler" },
  { icon: Info, label: "Hakkında" },
];

const Index = () => {
  const { prices, updateTime, loading, fetchPrices } = useGoldPrices();
  const [activePage, setActivePage] = useState("Ana Sayfa");

  if (activePage === "Hakkında") {
    return <Hakkinda onNavigate={setActivePage} />;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-md mx-auto relative">

        <div className="sticky top-0 z-30">
          <Header updateTime={updateTime} isLive={!loading} onRefresh={fetchPrices} />
          <div className="px-4 pt-2 pb-2 bg-background">
            <AdBanner />
          </div>
        </div>

        <div className="pb-20 px-4 space-y-2">
          <div className="rounded-2xl border border-gold/20 bg-card overflow-hidden shadow-lg">
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

            {loading ? (
              <div className="p-6 text-center text-sm text-muted-foreground">Fiyatlar yükleniyor...</div>
            ) : (
              prices.map((gold) => (
                <GoldPriceCard key={gold.id} {...gold} />
              ))
            )}
          </div>

          <div className="py-2">
            <p className="text-[9px] text-muted-foreground/50 text-center">
              ⚠️ Fiyatlar bilgi amaçlıdır. amasyaaltinfiyatlari.com
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30">
          <div className="bg-card/95 backdrop-blur-xl border-t border-gold/15 px-6 pt-3 pb-5">
            <div className="flex justify-around">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActivePage(item.label)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    activePage === item.label ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  <item.icon size={activePage === item.label ? 20 : 19} strokeWidth={activePage === item.label ? 2 : 1.5} />
                  <span className="text-[9px] font-medium">{item.label}</span>
                  {activePage === item.label && <div className="w-1 h-0.5 rounded-full bg-primary mt-0.5" />}
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