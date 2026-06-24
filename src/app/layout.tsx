import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteNavbar from "@/components/ui/SiteNavbar";
import SmoothScroll from "@/components/ui/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SiteOnLab — We build websites that convert",
  description:
    "High-performance, visually stunning websites for modern businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <SmoothScroll>
          <SiteNavbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
