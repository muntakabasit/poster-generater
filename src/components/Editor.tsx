import { PosterData } from "../types";
import { Plus, Trash2, Phone, MapPin, Tag, Palette, Type } from "lucide-react";

interface EditorProps {
  data: PosterData;
  onChange: (data: PosterData) => void;
}

export default function Editor({ data, onChange }: EditorProps) {
  const handleChange = (field: keyof PosterData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...data.items];
    newItems[index] = value;
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...data.items, "New item"]);
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    handleChange("items", newItems);
  };

  return (
    <div className="flex flex-col gap-8 p-8 bg-zinc-50 border-l border-zinc-200 h-full overflow-y-auto">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-zinc-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Content</h3>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Headline</label>
            <input
              type="text"
              value={data.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
              className="w-full p-3 bg-white border-2 border-zinc-200 focus:border-black outline-none font-bold transition-all rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Sub-headline</label>
            <input
              type="text"
              value={data.subhead}
              onChange={(e) => handleChange("subhead", e.target.value)}
              className="w-full p-3 bg-white border-2 border-zinc-200 focus:border-black outline-none font-bold transition-all rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Prices</label>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={data.prices}
                onChange={(e) => handleChange("prices", e.target.value)}
                className="w-full p-3 bg-white border-2 border-zinc-200 focus:border-black outline-none font-bold transition-all rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">WhatsApp Number</label>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={data.whatsappNumber}
                onChange={(e) => handleChange("whatsappNumber", e.target.value)}
                placeholder="e.g. 233123456789"
                className="w-full p-3 bg-white border-2 border-zinc-200 focus:border-black outline-none font-bold transition-all rounded-lg"
              />
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Include country code for the QR code to work.</p>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border-2 border-zinc-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-bold uppercase tracking-tight">Show QR Code</span>
            </div>
            <button
              onClick={() => handleChange("showQRCode", !data.showQRCode)}
              className={`w-12 h-6 rounded-full transition-all relative ${
                data.showQRCode ? "bg-black" : "bg-zinc-200"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                  data.showQRCode ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-zinc-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Design</h3>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={data.accentColor}
              onChange={(e) => handleChange("accentColor", e.target.value)}
              className="w-12 h-12 p-1 bg-white border-2 border-zinc-200 rounded-lg cursor-pointer"
            />
            <span className="font-mono text-sm uppercase">{data.accentColor}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-zinc-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Items to Send</h3>
        </div>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 group">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(i, e.target.value)}
                className="flex-grow p-3 bg-white border-2 border-zinc-200 focus:border-black outline-none font-medium transition-all rounded-lg"
              />
              <button
                onClick={() => removeItem(i)}
                className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-lg opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full py-3 px-4 border-2 border-dashed border-zinc-300 hover:border-black hover:bg-zinc-100 text-zinc-500 hover:text-black font-bold transition-all flex items-center justify-center gap-2 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
