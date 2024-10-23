import "./globals.css";
import { DynaPuff } from "next/font/google";

const dynaPuff = DynaPuff({
  weight: "700",
  subsets: ["latin"],
});

export const metadata = {
  title: "PortaPet",
  description: "WebXR Voice Assistant Mascot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dynaPuff.className}>{children}</body>
    </html>
  );
}