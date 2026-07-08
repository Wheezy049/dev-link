import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const instrument_Sans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLink",
  description: "Link-sharing app for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrument_Sans.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}