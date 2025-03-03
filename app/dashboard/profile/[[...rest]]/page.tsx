"use client";
import { UserProfile, useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/toasts";

export default function ProfilePage() {
  const { user } = useUser();
  const { showToast } = useToast();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Profile Page 🔥</h1>
      <UserProfile />

      {user?.username ? (
        <p className="text-xl">
          Your Username: <span className="font-bold">{user.username}</span>
        </p>
      ) : (
        <button
          onClick={() => showToast("Set your username from the profile")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          No Username? Set it now 🔥
        </button>
      )}
    </div>
  );
}
