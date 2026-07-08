import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AppProvider>
      </body>
    </html>
  );
}