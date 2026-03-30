export interface PosterData {
  headline: string;
  subhead: string;
  prices: string;
  whatsappNumber: string;
  accentColor: string;
  location: string;
  items: string[];
  showQRCode: boolean;
}

export const DEFAULT_POSTER: PosterData = {
  headline: "SEND ANYTHING NEARBY IN LAPAZ",
  subhead: "ON WHATSAPP. WE HANDLE THE RIDER.",
  prices: "GHS 20 / 30 / 40",
  whatsappNumber: "233123456789", // Example number for QR code
  accentColor: "#FF6321", // Vibrant orange
  location: "LAPAZ",
  items: ["Item", "Pickup location", "Drop-off location"],
  showQRCode: true,
};
