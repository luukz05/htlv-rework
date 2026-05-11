import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { DEFAULT_TITLE, SITE_NAME } from "@/lib/page-title";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Modern redesign of HLTV.org - the home of competitive Counter-Strike. News, matches, stats, rankings.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <div className="site-page-frame">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
