import type { Metadata, Viewport } from "next";
import "./globals.css";
import { initialData } from "../constants/constants";
import { ThemeProvider } from "next-themes";
import CRTOverlay from "../components/crt/CRTOverlay";

export const metadata: Metadata = {
  title: `${initialData.name} | Personal Portfolio`,
};

// viewport-fit=cover extends the layout viewport under the iOS status
// bar / notch so the fixed CRT overlay tints the entire screen.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=VT323&family=Sekuya&family=BJ+Cree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/f9ad3735a42ad7a8f71e0554ca1f78d5?family=FS+Ostro+Display+VF+Regular"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-neutral-950 text-gray-200 overflow-x-hidden max-w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
        <CRTOverlay />
      </body>
    </html>
  );
}