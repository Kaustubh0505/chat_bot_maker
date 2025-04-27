"use client";
import { AuthContext } from "@/context/auth";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import "./page.css"

const Login = () => {
  const { setIsloggin } = useContext(AuthContext);

  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function chandelchnage(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setForm({
      ...form,
      [fieldName]: fieldValue,
    });
  }
  async function handelsubmit(e) {
    try {
      e.preventDefault();
      const response = await login(form);
      const { token } = response;
      localStorage.setItem("token", token);
      router.push("/dashboard");
      setIsloggin(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  return (
    <div>
      <h1>login</h1>
      <form onChange={chandelchnage} onSubmit={handelsubmit}>
        <input type="email" name="email" placeholder="enter email" />
        <input
          type="password"
          name="password"
          id=""
          placeholder="enter password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account ? <a href="/auth/signup">Signup</a> First
      </p>
    </div>
  );
};
export default Login;
