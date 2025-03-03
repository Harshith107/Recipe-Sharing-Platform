"use client";
import React, { createContext, useContext, useState } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}

        <ToastPrimitive.Root
          duration={3000}
          open={open}
          onOpenChange={setOpen}
          className="bg-black text-white p-3 rounded shadow-lg"
        >
          <ToastPrimitive.Title>{message}</ToastPrimitive.Title>
        </ToastPrimitive.Root>

        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 w-64" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
