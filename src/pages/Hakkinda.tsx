import { Home, BarChart2, Bell, Info, Mail, Globe } from "lucide-react";

const navItems = [
  { icon: Home, label: "Ana Sayfa", active: false },
  { icon: BarChart2, label: "Piyasalar", active: false },
  { icon: Bell, label: "Bildirimler", active: false },
  { icon: Info, label: "Hakkında", active: true },
];

const Hakkinda = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-md mx-auto relative">

        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-gold/15 px-4 pt-4 pb-3">
          <h1 className="text-xl font-bold gold-text font-serif">Hakkında</h1>
          <p className="text-[11px] text-muted-foreground">Uygulama bilgileri</p>
        </div>

        <div className="px-4 pt-4 pb-24 space-y-4">
          <div className="rounded-2xl border border-gold/20 bg-card p-5">
            <h2 className="text-sm font-bold text-foreground mb-1">
              Sarcontrol Bilişim
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Amasya Kuyumcular uygulamasının geliştiricisi
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-gold/10">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                İletişim
              </p>
            </div>

            {/* MAIL */}
            <a
              href="mailto:woodenmy@gmail.com"
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors border-b border-gold/10"
            >
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                <Mail size={14} className="text-background" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">E-posta</p>
                <p className="text-sm font-medium text-foreground">
                  woodenmy@gmail.com

                </p>
              </div>
            </a>

            {/* WEBSITE */}
            <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                <Globe size={14} className="text-background" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Veri Kaynağı</p>
                <p className="text-sm font-medium text-foreground">
                  amasyakuyumculardernegi.com
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-card p-4">
            <p className="text-[11px] text-muted-foreground text-center">
              Versiyon 1.0.0 • © 2026 Sarcontrol Bilişim
            </p>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30">
          <div className="bg-card/95 backdrop-blur-xl border-t border-gold/15 px-6 pt-3 pb-5">
            <div className="flex justify-around">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.label)}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    item.active
                      ? "text-primary"
                      : "text-muted-foreground/50"
                  }`}
                >
                  <item.icon
                    size={item.active ? 20 : 19}
                    strokeWidth={item.active ? 2 : 1.5}
                  />
                  <span className="text-[9px] font-medium">
                    {item.label}
                  </span>
                  {item.active && (
                    <div className="w-1 h-0.5 rounded-full bg-primary mt-0.5" />
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

export default Hakkinda;