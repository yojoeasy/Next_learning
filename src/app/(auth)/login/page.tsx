"use client";
import AuthButton from "../button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/logout");
    // router.refresh();
    // router.prefetch("/logout"); // Pre-fetch the logout page for better UX
    // router.back();
    // router.forward();
    // router.prefetch("/logout");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Log In</h1>
      <p>Welcome back! Please log in to your account.</p>
      <AuthButton onClick={handleLogout}>Logout</AuthButton>
    </div>
  );
}
