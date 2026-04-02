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
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
