"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/ui/toasts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ToastProvider>
        <html>
          <body>{children}</body>
        </html>
      </ToastProvider>
    </ClerkProvider>
  );
}
