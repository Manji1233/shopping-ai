import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "家采AI管家",
  description: "面向家庭服务的对话式购物AI管家演示版",
  openGraph: {
    title: "家采AI管家",
    description: "面向家庭服务的对话式购物AI管家演示版",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
