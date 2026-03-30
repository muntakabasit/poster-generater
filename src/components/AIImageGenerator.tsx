import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  prompt: string;
}

export default function AIImageGenerator({ onImageGenerated, prompt }: AIImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image-preview",
        contents: {
          parts: [
            {
              text: `A professional, high-quality, street-clean, minimalist poster background for a local delivery service in Ghana. The prompt is: ${prompt}. Style: Brutalist, bold, high contrast, clean lines, urban, professional. No text in the image.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4",
            imageSize: "1K",
          },
        },
      });

      let imageUrl = "";
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }

      if (imageUrl) {
        onImageGenerated(imageUrl);
      } else {
        throw new Error("No image was generated.");
      }
    } catch (err) {
      console.error("AI Image Generation Error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-zinc-900 text-white rounded-2xl border border-zinc-800">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold uppercase tracking-tight">AI Background Generator</h3>
      </div>
      <p className="text-sm text-zinc-400 mb-4">
        Generate a professional, street-clean background for your poster using AI.
      </p>
      
      <button
        onClick={generateImage}
        disabled={isGenerating}
        className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-2 rounded-lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Background
          </>
        )}
      </button>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
