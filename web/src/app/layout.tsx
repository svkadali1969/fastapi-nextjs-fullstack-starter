import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Verita — Independent AI Research & Education",
  description: "Independent AI research and education. Advancing AI-literate workforces through independent research and future-ready education.",
  verification: {
    google: "-Wj8apcU5c0URwdDpLn4kM_-UZ4Aj9GTFyLWlWY_rgI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
  <body>
  {children}
</body>
    </html>
  );
}
