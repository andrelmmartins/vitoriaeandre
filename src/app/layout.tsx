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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`bg-beige text-wine ${font.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
