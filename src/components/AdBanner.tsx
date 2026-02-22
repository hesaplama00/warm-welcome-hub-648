import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SUPABASE_URL = "https://hnfgjzchlpdhektgnwwi.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZmdqemNobHBkaGVrdGdud3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MTQ5NjUsImV4cCI6MjA4NzE5MDk2NX0.Cip6QnuFBgWP6zfDODw1ZqwXKrY9dw2BRpui8mGZBBs";

interface Ad {
  id: number;
  gorsel_url: string;
  kuyumcu_adi: string;
}

const AdBanner = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/reklamlar?select=*`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setAds(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [ads.length]);

  const prev = () => setCurrent((c) => (c - 1 + ads.length) % ads.length);
  const next = () => setCurrent((c) => (c + 1) % ads.length);

  if (loading) return (
    <div className="rounded-2xl h-56 bg-card border border-gold/20 flex items-center justify-center">
      <p className="text-xs text-muted-foreground">Yükleniyor...</p>
    </div>
  );

  if (ads.length === 0 || !ads[current]) return null;

  const ad = ads[current];

  return (
    <div className="rounded-2xl overflow-hidden relative border border-gold/25">
      <div className="absolute top-3 left-3 z-20">
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-background/80 text-muted-foreground px-2 py-0.5 rounded-full backdrop-blur-sm border border-gold/20">
          Reklam
        </span>
      </div>

      <div className="relative h-56 overflow-hidden">
        <img
          key={ad.id}
          src={ad.gorsel_url}
          alt={ad.kuyumcu_adi}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-base font-bold gold-text font-serif">{ad.kuyumcu_adi}</h3>
          </div>
          <div className="flex gap-1">
            <button onClick={prev} className="w-7 h-7 rounded-full bg-background/70 border border-gold/30 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 transition-colors">
              <ChevronLeft size={14} className="text-foreground" />
            </button>
            <button onClick={next} className="w-7 h-7 rounded-full bg-background/70 border border-gold/30 flex items-center justify-center backdrop-blur-sm hover:bg-gold/20 transition-colors">
              <ChevronRight size={14} className="text-foreground" />
            </button>
          </div>
        </div>

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