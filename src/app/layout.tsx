import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>acctingsys-local</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body 
        className={`
          ${inter.className}
          h-screen 
          overflow-x-hidden
        `}
      >
        {children}
      </body>
    </html>
  );
}
