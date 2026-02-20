import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GoldPriceCardProps {
  name: string;
  buying: string;
  selling: string;
  discountSelling: string;
  trend: "up" | "down" | "stable";
  icon: string;
}

const GoldPriceCard = ({ name, buying, selling, discountSelling, trend, icon }: GoldPriceCardProps) => {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-muted-foreground";

  return (
    <div className="flex items-center px-4 py-2.5 border-b border-border/40 hover:bg-secondary/30 transition-colors duration-150 last:border-b-0">
      {/* Icon + Name */}
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className="text-base shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground truncate leading-tight">{name}</p>
          <TrendIcon size={9} className={`${trendColor} mt-0.5`} />
        </div>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-3 gap-0 text-right" style={{ minWidth: 210 }}>
        <div className="px-2">
          <p className="text-[11px] text-muted-foreground">{buying}</p>
        </div>
        <div className="px-2 border-x border-gold/15">
          <p className="text-[11px] font-bold gold-text">{selling}</p>
        </div>
        <div className="pl-2">
          <p className="text-[11px] text-accent font-medium">{discountSelling}</p>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceCard;
