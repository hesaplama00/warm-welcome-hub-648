import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import adBanner1 from "@/assets/ad-banner-1.jpg";
import adBanner2 from "@/assets/ad-banner-2.jpg";
import adBanner3 from "@/assets/ad-banner-3.jpg";

interface Ad {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  phone?: string;
}

const defaultAds: Ad[] = [
  {
    id: 1,
    image: adBanner1,
    title: "AMASYA GOLD",
    subtitle: "Gelenekten gelen zarafet, modern tasarımla buluşuyor",
    phone: "0358 XXX XX XX",
  },
  {
    id: 2,
    image: adBanner2,
    title: "ÖRNEK KUYUMCU",
    subtitle: "22 ve 24 Ayar Altın Koleksiyonu • Amasya Merkez",
    phone: "0358 XXX XX XX",
  },
  {
    id: 3,
    image: adBanner3,
    title: "ALTIN DÜNYASI",
    subtitle: "Ziynet Altınları • Bilezik • Yüzük • Kolye",
    phone: "0358 XXX XX XX",
  },
];

interface AdBannerProps {
  ads?: Ad[];
}

const AdBanner = ({ ads = defaultAds }: AdBannerProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [ads.length]);

  const prev = () => setCurrent((c) => (c - 1 + ads.length) % ads.length);
  const next = () => setCurrent((c) => (c + 1) % ads.length);

  const ad = ads[current];

  return (
    <div className="rounded-2xl overflow-hidden relative border border-gold/25 card-glow">
      {/* Label */}
      <div className="absolute top-3 left-3 z-20">
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-background/80 text-muted-foreground px-2 py-0.5 rounded-full backdrop-blur-sm border border-gold/20">
          Reklam
        </span>
      </div>

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          key={ad.id}
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base font-bold gold-text font-serif">{ad.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 max-w-[220px]">{ad.subtitle}</p>
            {ad.phone && (
              <p className="text-xs text-accent font-medium mt-1">📞 {ad.phone}</p>
            )}
          </div>

          {/* Nav arrows */}
          <div className="flex gap-1">
            <button
              onClick={prev}
              className="w-7 h-7 rounded-full bg-background/70 border border-gold/30 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 transition-colors"
            >
              <ChevronLeft size={14} className="text-foreground" />
            </button>
            <button
              onClick={next}
              className="w-7 h-7 rounded-full bg-background/70 border border-gold/30 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 transition-colors"
            >
              <ChevronRight size={14} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5 mt-3 justify-center">
          {ads.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
