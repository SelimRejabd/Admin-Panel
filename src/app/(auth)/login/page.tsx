"use client";
import { userLogin } from "@/services/actions/UserLogin";
import { storeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type TLoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData: TLoginData = {
      email,
      password,
    };

    try {
      const res = await userLogin(loginData);
      storeUserInfo({ accessToken: res?.data?.accessToken });
      if (res?.status === "success") {
        toast.success("Login successfull");
        router.push("/users");
      } else if (res?.success === false) {
        toast.success(res?.message);
      }
    } catch (error) {}
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="mt-2 text-center">
          <Link href="/register" className="text-sm text-blue-600">
            Don't have an account? Register
          </Link>
        </div>
        <div className="mt-2 text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
