import type { Metadata } from "next";
import { Inter_Tight, Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Preloader } from "@/components/Preloader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

// Display: clean, professional grotesque for headings. Body: clean geometric sans. Mono: for labels.
const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-x",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — Senior Full Stack & AI Engineer | Portfolio`,
  description: site.description,
};

const ENABLE_TAWK = false;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} dark h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly etc.) add attributes to <body> before React loads */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <noscript>
          <style>{"#preloader{display:none!important}"}</style>
        </noscript>
        <Preloader />
        {children}
        <WhatsAppButton />

        {/* Tawk.to live chat (switched off for now: set ENABLE_TAWK to true to bring it back) */}
        {ENABLE_TAWK && (
        <Script id="tawk-to" strategy="afterInteractive">
          {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6460f6e874285f0ec46b616b/1k673la3n';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`}
        </Script>
        )}
      </body>
    </html>
  );
}
