import type {Metadata} from "next";
import "./globals.css";
import {cn} from "@/lib/utils";
import {Inter as FontSans} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import {Toaster} from "@/components/ui/toaster";


export const metadata: Metadata = {
    title: "ZeroNet Dashboard",
    description: "Management Dashboard for ZeroNet Overlay",
};

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head/>
        <body
            className={cn(
                "min-h-screen  font-sans antialiased",
                fontSans.variable
            )}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Navbar/>
            {children}
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
