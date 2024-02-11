import "./globals.css";

import type { Metadata } from "next";
import { Croissant_One } from "next/font/google";

import Providers from "./providers";

const font = Croissant_One({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Lista de Presentes · Vitória & André</title>
        <meta name="description" content="Lista de Presente" />

        <meta property="twitter:title" content="Vitória & André" />
        <meta property="twitter:image" content="/thumbnail" />
        <meta property="twitter:image:type" content="image/png" />
        <meta property="twitter:description" content="Lista de Presentes" />
        <meta property="twitter:image:width" content="1200" />
        <meta property="twitter:image:height" content="630" />

        <meta property="og:title" content="Vitória & André" />
        <meta property="og:image" content="/thumbnail" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:description" content="Lista de Presentes" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={`bg-beige text-wine ${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
