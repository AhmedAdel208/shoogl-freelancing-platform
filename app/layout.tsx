import type { Metadata } from "next";
import { Cairo, El_Messiri } from "next/font/google";

import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

const elMissiri = El_Messiri({
  subsets: ["latin", "arabic"],
  variable: "--font-el-missiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "شغل | منصة العمل الحر الأولى",
  description:
    "منصة شُغل تجمع بين نُخبة المستقلين وأصحاب المشاريع الطموحة في بيئة عمل ذكية وآمنة",
  keywords: ["عمل حر", "مستقلين", "مشاريع", "تصميم", "برمجة", "شغل"],
  authors: [{ name: "شغل" }],
  openGraph: {
    title: "شغل | منصة العمل الحر الأولى",
    description: "منصة شُغل تجمع بين نُخبة المستقلين وأصحاب المشاريع",
    locale: "ar_SA",
    type: "website",
  },
};

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { LocaleProvider } from "@/providers/LocaleProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/images/shogolbg.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className={`${cairo.variable} ${elMissiri.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster position="top-center" />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
