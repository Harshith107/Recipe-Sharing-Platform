"use client";
import { useEffect } from "react";
import { useUser, SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); // Redirect to dashboard after sign in
    }
  }, [isSignedIn]);

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isSignedIn ? <SignIn routing="hash" /> : null}
    </div>
  );
}
