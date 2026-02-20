import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPriceCardProps {
  name: string;
  buying: string;
  selling: string;
  discountSelling: string;
  trend: "up" | "down" | "stable";
  icon: string;
}

const GoldPriceCard = ({ name, buying, selling, discountSelling, trend, icon }: GoldPriceCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-card card-glow p-4 transition-all duration-300 hover:border-gold/40 hover:scale-[1.01]">
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div className="shimmer absolute inset-0 w-full h-full" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="font-semibold text-foreground text-base">{name}</h3>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
            trend === "up" 
              ? "text-green-400 bg-green-400/10" 
              : trend === "down" 
              ? "text-red-400 bg-red-400/10"
              : "text-muted-foreground bg-muted"
          }`}>
            {trend === "up" ? <TrendingUp size={12} /> : trend === "down" ? <TrendingDown size={12} /> : null}
            {trend === "up" ? "Yükseliyor" : trend === "down" ? "Düşüyor" : "Sabit"}
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Alış</p>
            <p className="text-sm font-semibold text-foreground">{buying}</p>
          </div>
          <div className="text-center relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gold/20" />
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gold/20" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Satış</p>
            <p className="text-sm font-bold gold-text">{selling}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">İsk. Satış</p>
            <p className="text-sm font-semibold text-accent">{discountSelling}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceCard;
