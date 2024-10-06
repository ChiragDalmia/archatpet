import "./globals.css";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
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
      <body className={luckiestGuy.className}>{children}</body>
    </html>
  );
}