import type { Metadata } from "next";
import './global.css';
import Header from "@/components/Header/Header";
import { Quicksand } from 'next/font/google';


const quicksand = Quicksand({
    subsets: ['latin'],
    display: 'swap'
})

export const metadata: Metadata = {
  title: "Gallery",
  description: "Easy save your photos",
  icons: './icon.jpg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <Header />
        <main className={`main ${quicksand.className}`}>
          {children}
        </main>
      </body>
    </html>
  );
}
