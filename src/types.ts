export type AspectRatio = "3:4" | "1:1" | "9:16";

export interface PosterData {
  serviceName: string;
  brandLine: string;
  headline: string;
  subhead: string;
  prices: string;
  whatsappNumber: string;
  accentColor: string;
  location: string;
  items: string[];
  showQRCode: boolean;
  aspectRatio: AspectRatio;
}

export const DEFAULT_POSTER: PosterData = {
  serviceName: "Lapaz Delivery",
  brandLine: "by Zongo SpiderLink",
  headline: "SEND ANYTHING NEARBY IN LAPAZ",
  subhead: "ON WHATSAPP. WE HANDLE THE RIDER.",
  prices: "GHS 20 / 30 / 40",
  whatsappNumber: "050 000 0000",
  accentColor: "#FF6321",
  location: "LAPAZ",
  items: ["Item", "Pickup location", "Drop-off location"],
  showQRCode: true,
  aspectRatio: "3:4",
};
