"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/userProfile";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import  Search  from "@/components/search";

const LoginButton = () => {
  return (
    <Link
      className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 lg:block"
      href="/auth/login"
    >
      Login
    </Link>
  );
};

const RegisterButton = () => {
  return (
    <Link
      className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 lg:block"
      href="/auth/register"
    >
      Register
    </Link>
  );
};

// Navbar component
export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header>
      <nav className="flex justify-between p-4 border-b-2 border-black">
        <Link href="/">
          <h1 className="text-2xl underline">Blog App</h1>
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex gap-4">
              <Search />
              <button
                className="hidden rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 lg:block"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-4">
                <Search />
                <LoginButton />
                <RegisterButton />
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
