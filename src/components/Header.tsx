import { RefreshCw, Wifi, WifiOff } from "lucide-react";

interface MarketTickerItem {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const tickerData: MarketTickerItem[] = [
  { label: "DOLAR", value: "44,02", change: "+%0.20", positive: true },
  { label: "EURO", value: "51,72", change: "+%0.08", positive: true },
  { label: "ONS", value: "5.003", change: "+%0.02", positive: true },
  { label: "HAS", value: "7.353", change: "+%0.21", positive: true },
  { label: "PARİTE", value: "1,1753", change: "-%0.11", positive: false },
  { label: "BIST", value: "13.804", change: "-%3.2", positive: false },
];

interface HeaderProps {
  updateTime: string;
  isLive: boolean;
  onRefresh: () => void;
}

const Header = ({ updateTime, isLive, onRefresh }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-gold/15">
      {/* Top bar */}
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
          <button
            onClick={onRefresh}
            className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
          >
            <RefreshCw size={14} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Market ticker */}
      <div className="overflow-x-auto scrollbar-none pb-2 px-4">
        <div className="flex gap-3 min-w-max">
          {tickerData.map((item) => (
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

      {/* Update time */}
      <div className="px-4 pb-2">
        <p className="text-[10px] text-muted-foreground">
          🕐 Son güncelleme: {updateTime}
        </p>
      </div>
    </div>
  );
};

export default Header;
