import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
  } = useForm({ mode: "onChange" });

  const password = useRef();
  password.current = watch("password");

  // useState
  const [errorFromSubmit, setErrorFromSubmit] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.createdUser.user, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
      });

      await set(ref(database, "users/" + createdUser.user.uid), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });
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
          fontSize: "2rem",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 200,
          color: "#fff",
          textShadow: "1px 1px 1px #3A9995",
          marginBottom: 30,
        }}
      >
        회원 가입
      </h1>
      <form
        className="registerForm"
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: 240, display: "flex", flexDirection: "column", color: "#fff" }}
      >
        <p className="warningMessage" style={{ textAlign: "right" }}>
          * 필수 입력
        </p>

        <label for="name">
          이름<span className="warningMessage">*</span>
        </label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true, minLength: 2, maxLength: 8 })}
          style={{ border: "1px solid #3A9995", boxShadow: "1px 1px 1px #3A9995" }}
        />
        {errors.name && errors.name.type === "required" && (
          <p className="warningMessage"> 필수 입력 사항입니다.</p>
        )}
        {errors.name && (errors.name.type === "minLength" || errors.name.type === "maxLength") && (
          <p className="warningMessage"> 입력 길이를 다시 확인해주세요. (2-8글자)</p>
        )}

        <label for="statusMessage">상태메시지</label>
        <input
          type="text"
          name="statusMessage"
          {...register("statusMessage", { required: false, maxLength: 20 })}
          style={{ border: "1px solid #3A9995", boxShadow: "1px 1px 1px #3A9995" }}
        />
        {errors.statusMessage && errors.statusMessage.type === "maxLength" && (
          <p className="warningMessage">
            최대 입력 길이를 초과하였습니다.
            <br /> (최대 20글자)
          </p>
        )}

        {errorFromSubmit && <p className="warningMessage"> {errorFromSubmit}</p>}
        <input
          type="submit"
          value="확인"
          disabled={loading}
          style={{
            marginTop: 30,
            height: 40,
            backgroundColor: "#C4EBE8",
            color: "#3A9995",
            border: "1px solid #3A9995",
            boxShadow: "1px 1px 1px #3A9995",
          }}
        />
      </form>
    </div>
  );
}

export default RegisterPage;
