import { QRCodeSVG } from "qrcode.react";
import { PosterData } from "../types";

interface PosterProps {
  data: PosterData;
  backgroundImage?: string;
}

export default function Poster({ data, backgroundImage }: PosterProps) {
  const whatsappUrl = `https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}`;

  const aspectClass = {
    "3:4": "aspect-[3/4]",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  }[data.aspectRatio];

  return (
    <div
      className={`relative w-full ${aspectClass} bg-white border-[12px] md:border-[16px] border-black overflow-hidden flex flex-col`}
      style={{
        borderColor: "black",
        backgroundColor: "white",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col p-6 md:p-10">
          {/* 1. Headline: Bold & Brutalist */}
          <header className="mb-4 md:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display leading-[0.85] tracking-tighter uppercase break-words text-black">
              {data.headline}
            </h1>
          </header>

          {/* 2. Sub-headline (The Offer) */}
          <div className="mb-6 md:mb-10">
            <h2
              className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tight font-mono leading-tight"
              style={{ color: data.accentColor || "#FF6321" }}
            >
              {data.subhead}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                <p className="text-sm md:text-xl font-black uppercase tracking-tight text-black">Fast local delivery</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                <p className="text-sm md:text-xl font-black uppercase tracking-tight text-black">Simple fixed fee</p>
              </div>
            </div>
          </div>

          {/* 3. Price Block: High visibility */}
          <div className="mb-8 md:mb-12">
            <div className="inline-block bg-black text-white p-1">
              <div className="border-2 border-white px-4 py-2 md:px-8 md:py-4">
                <span className="text-4xl md:text-7xl font-display tracking-tighter">
                  {data.prices}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Instruction Block */}
          <div className="mt-auto mb-6 md:mb-10">
            <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] mb-3 md:mb-4 opacity-50 font-mono text-black">
              SEND US:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {data.items.map((item, i) => (
                <div key={i} className="border-l-4 border-black pl-3 py-1">
                  <p className="text-sm md:text-lg font-black uppercase tracking-tight leading-none text-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Main Contact CTA: Dominant & Impossible to Miss */}
        <footer className="bg-black text-white p-6 md:p-10 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-grow min-w-0 text-center md:text-left relative z-30">
              <p className="text-[12px] md:text-sm font-black uppercase tracking-[0.4em] mb-3 text-white/70 font-mono">
                WHATSAPP NOW:
              </p>
              <p
                className="text-4xl sm:text-6xl md:text-8xl font-display tracking-tighter leading-tight break-all relative z-40"
                style={{ color: data.accentColor || "#FF6321", display: 'block' }}
              >
                {data.whatsappNumber || "050 000 0000"}
              </p>
            </div>

            {data.showQRCode && (
              <div className="flex flex-col items-center gap-2 flex-shrink-0 relative z-30">
                <div className="p-2 bg-white">
                  <div className="hidden md:block">
                    <QRCodeSVG
                      value={whatsappUrl}
                      size={120}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="block md:hidden">
                    <QRCodeSVG
                      value={whatsappUrl}
                      size={80}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Supporting Brand Line */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-[12px] md:text-sm font-bold uppercase tracking-[0.2em] opacity-70 text-center text-white">
              {data.serviceName} <span className="opacity-60 font-medium">{data.brandLine}</span>
            </p>
          </div>
        </footer>
      </div>

      {/* Brutalist Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 border-l-4 border-b-4 border-black -mr-16 -mt-16 rotate-45 pointer-events-none opacity-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-r-4 border-t-4 border-black -ml-16 -mb-16 rotate-45 pointer-events-none opacity-10" />
    </div>
  );
}
