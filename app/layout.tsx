import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolNest — Dev Utilities",
  description: "A slick dev utility belt: JSON formatter, Base64, UUID generator, color converter, and Lorem ipsum. All in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
