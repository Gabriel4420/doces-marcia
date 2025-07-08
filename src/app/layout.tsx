import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";
import { CookieNotification } from "@/components/cookie-notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delicias da Márcia - Doces Caseiros",
  description: "Doces caseiros feitos com amor pela Dona Márcia. Experimente os sabores mais deliciosos da região!",
  icons: {
    icon: "/logo.svg",
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <main className="w-full mx-auto max-w-[1203px] md:max-w-none">
                {children}
              </main>
            </div>
            <Toaster />
            <CookieConsent />
            <CookieNotification />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
