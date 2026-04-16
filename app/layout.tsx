import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://neodisplay.id"),
  title: "NEO Display",
  description:
    "LED & LCD display solutions for retail and SMEs. Plug-and-play, affordable, maximum ROI.",
  keywords: [
    "LED display",
    "LCD signage",
    "retail display",
    "NEO",
    "SME",
    "Indonesia",
  ],
  authors: [{ name: "NEO Display" }],
  openGraph: {
    title: "NEO Display",
    description:
      "LED & LCD display solutions for retail and SMEs. Plug-and-play, affordable, maximum ROI.",
    url: "https://neodisplay.id",
    siteName: "NEO Display",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
