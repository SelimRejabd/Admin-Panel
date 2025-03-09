"use client";

import { authKey } from "@/constants/authKey";
import { updatePassword } from "@/services/actions/Users";
import { getLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type TUpdatePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePassword = () => {
  const [formData, setFormData] = useState<TUpdatePasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const accessToken = getLocalStorage(authKey);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      toast.error("Please login first.");
      router.push("/login");
    }
  }, [accessToken, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    const res = await updatePassword(formData, accessToken as string);
    if (res?.success === false) {
      toast.error("Incorrect current password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Password</h2>
        <form className="mt-4" onSubmit={handleReset}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full p-2 mt-2 border rounded-md"
            value={formData.newPassword}
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
          {error && <p className="text-red-600 mt-2">{error}</p>}
          <button className="w-full p-2 mt-4 bg-blue-600 cursor-pointer text-white rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
