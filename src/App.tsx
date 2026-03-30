import { useState } from "react";
import { motion } from "motion/react";
import { Download, Printer, Share2, Sparkles, Layout, Settings } from "lucide-react";
import Poster from "./components/Poster";
import Editor from "./components/Editor";
import AIImageGenerator from "./components/AIImageGenerator";
import { DEFAULT_POSTER, PosterData } from "./types";

export default function App() {
  const [posterData, setPosterData] = useState<PosterData>(DEFAULT_POSTER);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"edit" | "ai">("edit");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row overflow-hidden">
      {/* Left Pane: Preview */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto bg-zinc-200">
        <div className="w-full max-w-2xl relative">
          <div className="absolute -top-12 left-0 right-0 flex items-center justify-between px-4">
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
              <button className="p-2 text-zinc-500 hover:text-black hover:bg-white transition-all rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="p-2 text-zinc-500 hover:text-black hover:bg-white transition-all rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          <div className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
            <Poster data={posterData} backgroundImage={backgroundImage} />
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Brutally simple delivery poster generator • Lapaz, Ghana
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane: Controls */}
      <div className="w-full md:w-[450px] bg-white flex flex-col border-l border-zinc-200 shadow-2xl z-20">
        <div className="flex items-center border-b border-zinc-200">
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
                  <div className="aspect-[3/4] rounded-xl overflow-hidden border-2 border-zinc-200">
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

        <div className="p-8 border-t border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-4 p-4 bg-white border-2 border-zinc-200 rounded-xl">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white">
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
