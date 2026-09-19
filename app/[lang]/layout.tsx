import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

import { getDictionary } from "../../dictionaries/getDictionary";
import StoreProvider from "../../components/StoreProvider";
import { Toaster } from "react-hot-toast";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    metadataBase: new URL("https://keepit.com"),
    title: dict.seo.title,
    description: dict.seo.description,
    openGraph: {
      title: dict.seo.title,
      description: dict.seo.description,
      type: "website",
      url: "https://keepit.com", // Replace with actual domain
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          alt: "Keep It Logo",
        },
      ],
      locale: lang === "ar" ? "ar_EG" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.title,
      description: dict.seo.description,
      images: ["/logo.png"],
    },
    icons: {
      icon: [
        { url: '/16×16.png', sizes: '16x16', type: 'image/png' },
        { url: '/32×32.png', sizes: '32x32', type: 'image/png' },
        { url: '/192×192.png', sizes: '192x192', type: 'image/png' },
        { url: '/512×512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/180×180.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.variable} ${cairo.variable} antialiased min-h-screen text-[var(--text-primary)]`}>
        <StoreProvider>
          {children}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'border-4 border-black font-bold uppercase tracking-widest bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-[4px_4px_0px_0px_black] rounded-none',
              style: {
                borderRadius: '0',
                border: '4px solid black',
                padding: '16px',
                color: 'var(--text-primary)',
                background: 'var(--bg-primary)',
                boxShadow: '4px 4px 0px 0px black'
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
