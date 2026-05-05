import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HLTV Redesign - Counter-Strike Coverage",
  description:
    "Modern redesign of HLTV.org - the home of competitive Counter-Strike. News, matches, stats, rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
