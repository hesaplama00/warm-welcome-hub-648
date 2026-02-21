import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

const SUPABASE_URL = "https://hnfgjzchlpdhektgnwwi.supabase.co/functions/v1/dynamic-service";

interface HeaderProps {
  updateTime: string;
  isLive: boolean;
  onRefresh: () => void;
}

const Header = ({ updateTime, isLive, onRefresh }: HeaderProps) => {
  const [ticker, setTicker] = useState([
    { label: "BIST 100", value: "...", change: "%0", positive: true },
    { label: "ONS", value: "...", change: "%0", positive: true },
    { label: "HAS", value: "...", change: "%0", positive: true },
    { label: "DOLAR", value: "...", change: "%0", positive: true },
    { label: "EURO", value: "...", change: "%0", positive: true },
  ]);

  useEffect(() => {
    const fetchTicker = () => {
      fetch(SUPABASE_URL)
        .then(r => r.json())
        .then(data => {
          const a = data.prices.anlik;
          setTicker([
            { label: "BIST 100", value: a.bist.sat.toLocaleString("tr-TR"), change: `%${a.bist.deg}`, positive: a.bist.yon >= 0 },
            { label: "ONS", value: a.ons.sat, change: `%${a.ons.deg}`, positive: a.ons.yon >= 0 },
            { label: "HAS", value: a.altin.sat, change: `%${a.altin.deg}`, positive: a.altin.yon >= 0 },
            { label: "DOLAR", value: a.usd.sat, change: `%${a.usd.deg}`, positive: a.usd.yon >= 0 },
            { label: "EURO", value: a.euro.sat, change: `%${a.euro.deg}`, positive: a.euro.yon >= 0 },
          ]);
        })
        .catch(e => console.error(e));
    };

    fetchTicker();
    const interval = setInterval(fetchTicker, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-gold/15">
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold gold-text font-serif leading-tight">
            Amasya Kuyumcular
          </h1>
          <p className="text-[11px] text-muted-foreground">Sarraflar ve Kuyumcular Derneği</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border ${
            isLive
              ? "text-green-400 border-green-400/30 bg-green-400/10"
              : "text-muted-foreground border-border bg-muted"
          }`}>
            {isLive ? <Wifi size={10} /> : <WifiOff size={10} />}
            {isLive ? "CANLI" : "ÇEVRİMDIŞI"}
          </div>
          <button onClick={onRefresh} className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors">
            <RefreshCw size={14} className="text-primary" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-2 px-4">
        <div className="flex gap-3 min-w-max">
          {ticker.map((item) => (
            <div key={item.label} className="flex flex-col items-center bg-surface rounded-lg px-3 py-1.5 border border-gold/10 min-w-[68px]">
              <span className="text-[9px] text-muted-foreground font-semibold tracking-wider">{item.label}</span>
              <span className="text-xs font-bold text-foreground">{item.value}</span>
              <span className={`text-[9px] font-medium ${item.positive ? "text-green-400" : "text-red-400"}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-[10px] text-muted-foreground">
          🕐 Son güncelleme: {updateTime}
        </p>
      </div>
    </div>
  );
};

export default Header;