"use client";

import { axiosInstance } from "@/helper/axiosInstance";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { profile } from "@/redux/userProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { Input } from "../ui/input";

interface User {
  name: string;
  email: string;
  type: string;
  profile_image: string;
}

export const Profile = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | string>("");

  const authToken = localStorage.getItem("token");

  const isAuthenticated = useCallback(() => {
    if (!authToken) {
      router.push("/auth/login");
    }
  }, [authToken, router]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.includes("image")) {
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const fetchUserProfile = useCallback(async () => {
    if (!authToken) return;

    try {
      const res = await axiosInstance.get("/user/profile", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.status === 200) {
        const { data } = res.data;
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setImage(data.profile_image || "");

        dispatch(
          profile({
            id: data.id,
            name: data.name,
            email: data.email,
            type: data.type,
          })
        );
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to fetch profile.");
    }
  }, [authToken, dispatch]);

  const updateProfile = async () => {
    if (!authToken) return;

    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("email", email || "");
      if (image && typeof image !== "string") {
        formData.append("profile_image", image);
      }

      const res = await axiosInstance.post(
        "/user/profile/update?_method=PUT",
        formData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (res.status === 200) {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update profile.");
    }
  };

  useEffect(() => {
    isAuthenticated();
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken, fetchUserProfile, isAuthenticated]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        {user && (
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Profile image
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-y-4">
                <Image
                  src={
                    user?.profile_image ||
                    "https://cdn-icons-png.flaticon.com/512/4123/4123763.png"
                  }
                  width={100}
                  height={100}
                  className="rounded-full border"
                  alt="Profile Picture"
                />
                <Input
                  id="picture"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  required
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </dd>
            </div>
            <div className="sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt></dt>
              <dd className="sm:col-span-2">
                <button
                  onClick={updateProfile}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
                >
                  Update Profile
                </button>
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
};
