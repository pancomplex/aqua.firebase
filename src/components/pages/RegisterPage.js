import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";

import firebase from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import md5 from "md5";

import * as Auth from "../style/authStyle";

function RegisterPage() {
  // firebase
  const auth = getAuth();
  const database = getDatabase();

  // useForm
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // useRef
  const password = useRef();
  password.current = watch("password");

  // useState
  const [errorFromSubmit, setErrorFromSubmit] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      let createdUser = auth.currentUser;
      await updateProfile(createdUser, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.email)}?d=identicon`,
      });
      await set(ref(database, "users/" + createdUser.uid), {
        email: createdUser.email,
        name: createdUser.displayName,
        image: createdUser.photoURL,
        friends: { JIgPFjBwBYP5qI00Lzy3bkahkA13: true }, // for Demo
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setErrorFromSubmit("이미 가입된 이메일입니다.");
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
      <Auth.Title>회원 가입</Auth.Title>
      <Auth.Form onSubmit={handleSubmit(onSubmit)}>
        <Auth.WarningMsg style={{ textAlign: "right" }}>* 필수 입력</Auth.WarningMsg>

        <Auth.InputWrapper>
          <label>이메일*</label>
          <Auth.Input
            type="email"
            name="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && errors.email.type === "required" && (
            <Auth.WarningMsg> 필수 입력 사항입니다.</Auth.WarningMsg>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <Auth.WarningMsg> 이메일 형식에 맞지 않습니다.</Auth.WarningMsg>
          )}
        </Auth.InputWrapper>
        <Auth.InputWrapper>
          <label>이름*</label>
          <Auth.Input
            type="text"
            name="name"
            {...register("name", { required: true, minLength: 2, maxLength: 8 })}
          />
          {errors.name && errors.name.type === "required" && (
            <Auth.WarningMsg> 필수 입력 사항입니다.</Auth.WarningMsg>
          )}
          {errors.name &&
            (errors.name.type === "minLength" || errors.name.type === "maxLength") && (
              <Auth.WarningMsg> 입력 길이를 다시 확인해주세요. (2-8글자)</Auth.WarningMsg>
            )}
        </Auth.InputWrapper>

        <Auth.InputWrapper>
          <label>비밀번호*</label>
          <Auth.Input
            type="password"
            name="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" && (
            <Auth.WarningMsg> 필수 입력 사항입니다.</Auth.WarningMsg>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <Auth.WarningMsg> 비밀번호는 최소 8자 이상이어야 합니다.</Auth.WarningMsg>
          )}
        </Auth.InputWrapper>

        <Auth.InputWrapper>
          <label>비밀번호 확인*</label>
          <Auth.Input
            type="password"
            name="password_confirm"
            {...register("password_confirm", {
              required: true,
              validate: (value) => value === password.current,
            })}
          />
          {errors.password_confirm && errors.password_confirm.type === "required" && (
            <Auth.WarningMsg> 필수 입력 사항입니다.</Auth.WarningMsg>
          )}
          {errors.password_confirm && errors.password_confirm.type === "validate" && (
            <Auth.WarningMsg> 비밀번호가 일치하지 않습니다.</Auth.WarningMsg>
          )}
        </Auth.InputWrapper>

        {errorFromSubmit && <Auth.WarningMsg> {errorFromSubmit}</Auth.WarningMsg>}
        <Auth.Submit type="submit" value="회원가입" disabled={loading} />

        <Auth.StyledLink to="login">이미 아이디가 있다면...</Auth.StyledLink>
      </Auth.Form>
    </Auth.Wrapper>
  );
}

export default RegisterPage;
