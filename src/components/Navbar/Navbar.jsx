"use client";
import Link from "next/link";
import React, { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { destroyToken, getToken } from "@/helpers/auth";

export default function Navbar() {
  const { isloggin, setIsloggin } = useContext(AuthContext);
  const router = useRouter();

  function handleLogin() {
    router.push("/auth/login");
  }
  async function handelLogout() {
    logout({
      token: getToken(),
    });
    router.push("/auth/login");
    destroyToken();
    setIsloggin(false)
}
  return (
    <div className="nabar">
      <div className="logo">
        <h1>My App</h1>
      </div>
      <div className="link">
        <Link className="nav-link" href="/home">
          Home
        </Link>
        <Link className="nav-link" href="/about">
          About
        </Link>
        <Link className="nav-link" href="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" href="/explore">
        Explore
        </Link>

        {isloggin ? (
          <button onClick={handelLogout} className="btn-login-nav">
            Logout
          </button>
        ) : (
          <button className="btn-login-nav" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
