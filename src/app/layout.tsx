import { Metadata } from "next";
import "./globals.scss";

import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Manejo de Incidencias"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}
