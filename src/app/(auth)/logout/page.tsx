"use client";
import AuthButton from "../button";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleForgotPassword = () => {
    router.push("/forgotpassword");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Log Out</h1>
      <p>You have been logged out</p>
      <AuthButton onClick={handleLogin}>Login</AuthButton>
      <AuthButton onClick={handleForgotPassword}>Forget Password</AuthButton>
    </div>
  );
}
