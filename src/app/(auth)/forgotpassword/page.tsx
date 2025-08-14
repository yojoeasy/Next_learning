"use client";
import AuthButton from "../button";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Forgot Password</h1>
      <p>Reset your password</p>
      <AuthButton onClick={handleLogin}>Login</AuthButton>
    </div>
  );
}
