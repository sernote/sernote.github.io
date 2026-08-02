import "../globals.css";
import "fumadocs-ui/style.css";
import "@fontsource-variable/onest";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";

import { getSiteConfig } from "@/lib/i18n";

const siteConfig = getSiteConfig("ru");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider theme={{ defaultTheme: "light", enableSystem: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
