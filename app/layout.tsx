import type { Metadata, Viewport } from "next";
import { Cairo, El_Messiri } from "next/font/google";

import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

const elMissiri = El_Messiri({
  subsets: ["latin", "arabic"],
  variable: "--font-el-missiri",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  title: "شغل | منصة العمل الحر الأولى",
  description:
    "منصة شُغل تجمع بين نُخبة المستقلين وأصحاب المشاريع الطموحة في بيئة عمل ذكية وآمنة",
  keywords: ["عمل حر", "مستقلين", "مشاريع", "تصميم", "برمجة", "شغل"],
  authors: [{ name: "Ahmed Adel" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "شغل",
  },
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
import OfflineModal from "@/components/ui/OfflineModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.className} ${cairo.variable} ${elMissiri.className} ${elMissiri.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <Toaster position="top-center" />
            <OfflineModal />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
