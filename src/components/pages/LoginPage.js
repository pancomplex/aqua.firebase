import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { RiWechat2Line } from "react-icons/ri";

function LoginPage() {
  const auth = getAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [errorFromSubmit, setErrorFromSubmit] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      console.log("error", error.message);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundImage: "linear-gradient(70deg, #3A9995, #C4EBE8)",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 200,
          color: "#fff",
          textShadow: "1px 1px 1px #3A9995",
          marginBottom: 50,
        }}
      >
        Aqua
        <RiWechat2Line
          style={{
            width: "1.5rem",
            verticalAlign: "top",
            marginLeft: 10,
          }}
        />
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p> E-mail을 입력해주세요.</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && errors.password.type === "required" && <p> 비밀번호를 입력해주세요.</p>}
        {errors.password && errors.password.type === "minLength" && <p> 최소 8자</p>}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" value="로그인" disabled={loading} />

        <Link style={{ color: "gray", textDecoration: "none" }} to="register">
          회원가입
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
