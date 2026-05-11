import type { Metadata, Viewport } from "next";
import { Roboto, Passion_One } from "next/font/google";
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

const passionOne = Passion_One({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  display: "swap",
});

const WIKIHOWL_LOGO_URL =
  "https://steamcommunity-a.akamaihd.net/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7delpVHoVhH4kJHf-SNM4bz9bKY_dPWQWDCUkLxy57g_H3DgkB5w42uAzIv4I3meOAQlApdwFO5YrFDmxUNp_lL7/256fx256f";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "WikiHowl - the home of competitive Counter-Strike. News, matches, stats, rankings.",
  icons: {
    icon: WIKIHOWL_LOGO_URL,
    shortcut: WIKIHOWL_LOGO_URL,
    apple: WIKIHOWL_LOGO_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0d1c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${passionOne.variable}`}>
        <div className="site-page-frame">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
