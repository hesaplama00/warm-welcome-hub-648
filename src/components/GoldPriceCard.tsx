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
    <div className="flex items-center px-3 py-2.5 border-b border-border/40 hover:bg-secondary/30 transition-colors duration-150 last:border-b-0">
      {/* Icon + Name */}
      <div className="flex items-center gap-2 w-[130px] shrink-0">
        <span className="text-sm shrink-0">{icon}</span>
        <div>
          <p className="text-[11px] font-medium text-foreground leading-tight">{name}</p>
          <TrendIcon size={9} className={`${trendColor} mt-0.5`} />
        </div>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-3 gap-0 text-right flex-1">
        <div className="px-1">
          <p className="text-[11px] text-muted-foreground">{buying}</p>
        </div>
        <div className="px-1 border-x border-gold/15">
          <p className="text-[11px] font-bold gold-text">{selling}</p>
        </div>
        <div className="pl-1">
          <p className="text-[11px] text-accent font-medium">{discountSelling}</p>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceCard;
