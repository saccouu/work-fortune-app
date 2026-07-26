import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "婚活タイプ診断｜レイコ先生",
  description:
    "30代からの本気婚活。あなたの婚活タイプを1分で診断します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
