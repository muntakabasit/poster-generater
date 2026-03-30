import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Download, Printer, Share2, Sparkles, Layout, Settings, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import Poster from "./components/Poster";
import Editor from "./components/Editor";
import AIImageGenerator from "./components/AIImageGenerator";
import { DEFAULT_POSTER, PosterData } from "./types";

export default function App() {
  const [posterData, setPosterData] = useState<PosterData>(DEFAULT_POSTER);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"edit" | "ai">("edit");
  const [isDownloading, setIsDownloading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    
    setIsDownloading(true);
    try {
      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2, // High quality
        backgroundColor: "white",
      });
      
      const link = document.createElement("a");
      link.download = `lapaz-delivery-${posterData.location.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download poster. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!posterRef.current) return;
    
    try {
      const dataUrl = await toPng(posterRef.current, { pixelRatio: 2 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "poster.png", { type: "image/png" });
      
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: "Lapaz Delivery Poster",
          text: "Check out my delivery service poster!",
        });
      } else {
        alert("Sharing is not supported on this browser. Try downloading instead.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row">
      {/* Left Pane: Preview */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 bg-zinc-200 min-h-[600px] md:h-screen md:overflow-y-auto">
        <div className="w-full max-w-2xl relative">
          <div className="absolute -top-12 left-0 right-0 flex items-center justify-between px-4 no-print">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrint}
                className="p-2 text-zinc-500 hover:text-black hover:bg-white transition-all rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="p-2 text-zinc-500 hover:text-black hover:bg-white disabled:opacity-50 transition-all rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isDownloading ? "Saving..." : "Download"}
              </button>
              <button 
                onClick={handleShare}
                className="p-2 text-zinc-500 hover:text-black hover:bg-white transition-all rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          <div ref={posterRef} className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
            <Poster data={posterData} backgroundImage={backgroundImage} />
          </div>

          <div className="mt-12 text-center no-print">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Brutally simple delivery poster generator • Lapaz, Ghana
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane: Controls */}
      <div className="w-full md:w-[450px] bg-white flex flex-col border-l border-zinc-200 shadow-2xl z-20 md:h-screen">
        <div className="flex items-center border-b border-zinc-200 sticky top-0 bg-white z-30">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-6 px-4 flex items-center justify-center gap-2 font-black uppercase tracking-tighter transition-all ${
              activeTab === "edit"
                ? "bg-black text-white"
                : "bg-white text-zinc-400 hover:bg-zinc-50"
            }`}
          >
            <Settings className="w-5 h-5" />
            Customize
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-6 px-4 flex items-center justify-center gap-2 font-black uppercase tracking-tighter transition-all ${
              activeTab === "ai"
                ? "bg-black text-white"
                : "bg-white text-zinc-400 hover:bg-zinc-50"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Background
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {activeTab === "edit" ? (
            <Editor data={posterData} onChange={setPosterData} />
          ) : (
            <div className="p-8 space-y-8">
              <AIImageGenerator
                onImageGenerated={setBackgroundImage}
                prompt={posterData.headline}
                aspectRatio={posterData.aspectRatio}
              />
              
              {backgroundImage && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Current Background</h4>
                    <button
                      onClick={() => setBackgroundImage(undefined)}
                      className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className={`rounded-xl overflow-hidden border-2 border-zinc-200 ${
                    posterData.aspectRatio === "3:4" ? "aspect-[3/4]" : 
                    posterData.aspectRatio === "1:1" ? "aspect-square" : "aspect-[9/16]"
                  }`}>
                    <img
                      src={backgroundImage}
                      alt="Current Background"
                      className="w-full h-full object-cover grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-zinc-200 bg-zinc-50 space-y-4">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-4 px-6 bg-black text-white font-black uppercase tracking-tighter flex items-center justify-center gap-3 rounded-xl hover:bg-zinc-800 transition-all disabled:opacity-50"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isDownloading ? "Generating Image..." : "Download Poster (PNG)"}
          </button>

          <div className="flex items-center gap-4 p-4 bg-white border-2 border-zinc-200 rounded-xl">
            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tighter">Ready to print?</p>
              <p className="text-xs text-zinc-500">Posters look best on A3 paper.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
