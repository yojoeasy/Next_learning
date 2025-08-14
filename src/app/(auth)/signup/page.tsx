"use client";
import AuthButton from "../button";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1>Sign Up</h1>
      <p>Create a new account</p>
      <AuthButton onClick={handleSignUp}>Sign Up</AuthButton>
    </div>
  );
}
