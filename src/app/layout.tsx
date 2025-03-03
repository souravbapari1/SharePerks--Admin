import type { Metadata } from "next";
import "flatpickr/dist/flatpickr.min.css";
import "material-react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.css";
import "react-json-view-lite/dist/index.css";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import ClientProvider from "./client";
export const revalidate = 0;
export const metadata: Metadata = {
  title: "SharePerks - Admin",
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
        <NextTopLoader />
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-[100vh]">
          <ClientProvider>{children}</ClientProvider>
        </div>
      </body>
    </html>
  );
}
