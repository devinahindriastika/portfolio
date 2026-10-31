import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devina Hindriastika — Informatics Student",
  description:
    "Portfolio Devina Hindriastika, mahasiswa Teknik Informatika yang sedang bertransisi ke dunia teknologi.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
