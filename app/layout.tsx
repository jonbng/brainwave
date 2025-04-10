import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ViewTransitions } from "next-view-transitions";
import { Geist } from "next/font/google";

const GeistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Brainwave",
  description: "Your personal learning assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
