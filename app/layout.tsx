import type { Metadata, Viewport } from "next";
import "./globals.css";
import { initialData } from "../constants/constants";
import { ThemeProvider } from "next-themes";
import CRTOverlay from "../components/crt/CRTOverlay";
import BottomMask from "../components/crt/BottomMask";

const title = `${initialData.name} | ML & Software Engineering`;
const description =
  "Computer Science student at York University building machine-learning systems, from medical-imaging evaluation to a cited-answer policy assistant. Projects, experience, and résumé.";

// Text-only previews (no og:image) for LinkedIn and other link unfurls.
export const metadata: Metadata = {
  metadataBase: new URL("https://baybars.ca"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    siteName: initialData.name,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-black text-crt-text overflow-x-hidden max-w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
        <CRTOverlay />
        <BottomMask />
      </body>
    </html>
  );
}