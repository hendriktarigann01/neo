import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
// import { LenisProvider } from "@/components/providers/LenisProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "NEO Display — High-Impact Visuals, Small-Business Budget",
  description:
    "LED & LCD display solutions for retail and SMEs. Plug-and-play, affordable, maximum ROI.",
  keywords: ["LED display", "LCD signage", "retail display", "NEO", "SME"],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} font-body bg-neo-black text-neo-white antialiased`}
      >
        {/* <LenisProvider>{children}</LenisProvider> */}
        {children}
      </body>
    </html>
  );
}
