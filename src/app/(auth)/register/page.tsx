"use client";
import { authKey } from "@/constants/authKey";
import { userRegister } from "@/services/actions/UserRegistration";
import { getLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type TRegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "operator" | "restaurant" | "super-admin";
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<TRegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "operator",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    const accessToken = getLocalStorage(authKey);

    const res = await userRegister(formData, accessToken as string);
    if (res?.data?.user) {
      toast.success("Registration completed");
      router.push("/users");
    } else if (res?.success === false) {
      toast.error(res?.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="mt-4" onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="operator">Operator</option>
            <option value="restaurant">Restaurant</option>
            <option value="super-admin">Super Admin</option>
          </select>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="mt-2 text-center">
          <Link href="/login" className="text-sm text-blue-600">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
