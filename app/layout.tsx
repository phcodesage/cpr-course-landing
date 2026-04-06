import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CPR AND FIRST AID TRAINING | Exceed Learning Center",
  description:
    "April 19 CPR and First Aid certification course from Exceed Learning Center for teens and adults.",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} antialiased`}>
        <SmoothScroll />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
