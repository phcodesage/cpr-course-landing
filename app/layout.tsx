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
    "March 22 CPR and First Aid certification course from Exceed Learning Center for teens and adults.",
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
