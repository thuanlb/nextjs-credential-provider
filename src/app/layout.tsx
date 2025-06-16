import { getServerSession } from "next-auth/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthMiddleware from "@/components/AuthMiddleware";
import authOptions from "@/lib/authOptions";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import SessionProvider from "@/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ohmidas NextAuth",
  description: "Ohmidas NextAuth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthSessionProvider>
          <SessionProvider session={session}>
            <AuthMiddleware>{children}</AuthMiddleware>
          </SessionProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
