import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import * as Auth from "../style/authStyle";

import { RiWechat2Line } from "react-icons/ri";

function LoginPage() {
  // firebase
  const auth = getAuth();

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // useState
  const [errorFromSubmit, setErrorFromSubmit] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      if (error.message == "Firebase: Error (auth/user-not-found).") {
        setErrorFromSubmit("가입되지 않은 이메일 입니다.");
      } else if (error.message == "Firebase: Error (auth/wrong-password).") {
        setErrorFromSubmit("비밀번호를 다시 확인해주세요.");
      } else {
        setErrorFromSubmit(error.message);
      }
      setLoading(false);
      console.log("error", error.message);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <Auth.Wrapper>
      <Auth.Title size="3rem">
        Aqua
        <RiWechat2Line
          style={{
            width: "1.5rem",
            verticalAlign: "top",
            marginLeft: 10,
          }}
        />
      </Auth.Title>

      <Auth.Form onSubmit={handleSubmit(onSubmit)}>
        <Auth.InputWrapper>
          <label>이메일</label>
          <Auth.Input
            type="email"
            name="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <Auth.WarningMsg> 이메일을 입력해주세요.</Auth.WarningMsg>}
        </Auth.InputWrapper>

        <Auth.InputWrapper>
          <label>비밀번호</label>
          <Auth.Input
            type="password"
            name="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" && (
            <Auth.WarningMsg> 비밀번호를 입력해주세요.</Auth.WarningMsg>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Auth.WarningMsg> 최소 8자</Auth.WarningMsg>
          )}
        </Auth.InputWrapper>

        {errorFromSubmit && <Auth.WarningMsg>{errorFromSubmit}</Auth.WarningMsg>}
        <Auth.Submit type="submit" value="로그인" disabled={loading} />

        <Auth.StyledLink to="register">아직 아이디가 없다면...</Auth.StyledLink>
      </Auth.Form>
    </Auth.Wrapper>
  );
}

export default LoginPage;
