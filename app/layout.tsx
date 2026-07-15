import type { Metadata, Viewport } from "next";
import "./globals.css";
import { initialData } from "../constants/constants";
import { ThemeProvider } from "next-themes";
import CRTOverlay from "../components/crt/CRTOverlay";

export const metadata: Metadata = {
  title: `${initialData.name} | Personal Portfolio`,
  description:
    "Baybars Al-Zibdeh — Computer Science student at York University, focused on AI and machine learning. Building models that turn data into decisions.",
};

// viewport-fit=cover extends the layout viewport under the iOS status
// bar / notch so the fixed CRT overlay tints the entire screen.
// themeColor makes iOS Safari paint its status bar / toolbar chrome as
// a solid CRT-dark band instead of a translucent strip that shows
// untinted page content (Safari composites that strip itself from the
// document layer only — fixed overlays can never cover it).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-black text-crt-text overflow-x-hidden max-w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
        <CRTOverlay />
      </body>
    </html>
  );
}