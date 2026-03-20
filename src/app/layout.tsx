import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "AutoHub Rostov - Evacuator, Autoservice, Accident Commissioner",
    description: "AutoHub Rostov - evacuator 24/7, autoservice, accident commissioner in Rostov-on-Don",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
          <html lang="ru">
                <body className="font-manrope bg-background text-secondary antialiased">
                  {children}
                </body>
          </html>
        );
}
