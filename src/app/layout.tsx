import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/shared/components/Sidebar";
import {getServerSession} from "next-auth/next";
import SessionProviderClientComponent from "@/app/providers/SessionProviderClientComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investment portoflio",
  description: "Your favorite investment portoflio app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <SessionProviderClientComponent session={session}>
          <div className="md:flex min-h-screen flex-row">
              <Sidebar />
              <main className="flex-1 bg-white text-black">
                  {children}
              </main>
          </div>
      </SessionProviderClientComponent>
      </body>
    </html>
  );
}
