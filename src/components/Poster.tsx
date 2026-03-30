import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { PosterData } from "../types";

interface PosterProps {
  data: PosterData;
  backgroundImage?: string;
}

export default function Poster({ data, backgroundImage }: PosterProps) {
  const whatsappUrl = `https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full aspect-[3/4] bg-white border-[12px] border-black overflow-hidden flex flex-col p-8 md:p-12 shadow-2xl"
      style={{
        borderColor: "black",
        backgroundColor: "white",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Section */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-6xl font-display leading-none tracking-tighter uppercase break-words">
            {data.headline}
          </h1>
        </header>

        {/* Middle Section */}
        <main className="flex-grow flex flex-col justify-center">
          <div className="mb-8">
            <h2
              className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 font-mono"
              style={{ color: data.accentColor }}
            >
              {data.subhead}
            </h2>
            <div className="space-y-1">
              <p className="text-lg font-bold">Fast local delivery</p>
              <p className="text-lg font-bold opacity-70">Simple fixed fee</p>
            </div>
          </div>

          <div className="mb-12">
            <span className="text-3xl md:text-5xl font-display bg-black text-white px-4 py-2 inline-block">
              {data.prices}
            </span>
          </div>
        </main>

        {/* Bottom Section */}
        <footer className="mt-auto">
          <div className="flex items-end justify-between gap-6">
            <div className="flex-grow">
              <p className="text-sm font-black uppercase tracking-widest mb-2 opacity-50 font-mono">
                Send us:
              </p>
              <ul className="space-y-1 mb-6">
                {data.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-black text-lg uppercase tracking-tight">
                    <span className="w-2 h-2 bg-black rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t-4 border-black pt-6">
                <p className="text-sm font-black uppercase tracking-widest mb-1 opacity-50 font-mono">
                  WhatsApp:
                </p>
                <p
                  className="text-3xl md:text-5xl font-display tracking-tighter"
                  style={{ color: data.accentColor }}
                >
                  {data.whatsappNumber}
                </p>
              </div>
            </div>

            {data.showQRCode && (
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-white border-4 border-black">
                  <QRCodeSVG
                    value={whatsappUrl}
                    size={100}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest font-mono">
                  Scan to chat
                </p>
              </div>
            )}
          </div>
        </footer>
      </div>

      {/* Brutalist Decorative Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 border-l-4 border-b-4 border-black -mr-12 -mt-12 rotate-45 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-r-4 border-t-4 border-black -ml-12 -mb-12 rotate-45 pointer-events-none" />
    </motion.div>
  );
}
