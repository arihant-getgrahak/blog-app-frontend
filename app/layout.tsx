import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Algolia } from "@/helper/algolia";

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
    <html lang="en">
      <body>
        <Algolia>
          <ReduxProvider>{children}</ReduxProvider>
        </Algolia>
      </body>
    </html>
  );
}
