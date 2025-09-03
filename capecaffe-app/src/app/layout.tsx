import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cape Caffe",
  description: "Welcome to Cape Caffe – your cozy neighborhood coffee retreat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="pt-28"> {/* Ensures all pages are below the navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}