import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { Detail } from "../../../style/mainStyle";

function MyDetail(props) {
  const myUid = props.currentUser.uid;
  let inProcess = false;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const statusMsg = useRef();
  const submitRef = useRef();

  const handleChange = () => {
    statusMsg.current = watch("statusMsg");
    console.log(statusMsg.current);
  };

  const handleSubmitRef = () => {
    submitRef.current.click();
  };

  const onSubmit = async (data) => {
    try {
      // setLoading(true);
      // await createUserWithEmailAndPassword(auth, data.email, data.password);
      // let createdUser = auth.currentUser;
      // await updateProfile(createdUser, {
      //   displayName: data.name,
      //   photoURL: `http://gravatar.com/avatar/${md5(createdUser.email)}?d=identicon`,
      // });
      // await set(ref(database, "users/" + createdUser.uid), {
      //   email: createdUser.email,
      //   name: createdUser.displayName,
      //   image: createdUser.photoURL,
      //   friends: { JIgPFjBwBYP5qI00Lzy3bkahkA13: true }, // for Demo
      // });
      // setLoading(false);
    } catch (error) {
      //   console.log(error);
      //   if (error.message == "Firebase: Error (auth/email-already-in-use).") {
      //     setErrorFromSubmit("이미 가입된 이메일입니다.");
      //   } else {
      //     setErrorFromSubmit(error.message);
      //   }
      //   setLoading(false);
      //   console.log("error", error.message);
      //   setTimeout(() => {
      //     setErrorFromSubmit("");
      //   }, 5000);
    }
  };

  return (
    <Detail.Container>
      <Detail.Form onSubmit={handleSubmit(onSubmit)}>
        <Detail.ImageBox>
          <img src={props.currentUser.photoURL} />
        </Detail.ImageBox>
        <Detail.TextBox>
          <Detail.Title> {props.currentUser.displayName}</Detail.Title>
          <Detail.Content>안녕하세요</Detail.Content>
          {props.currentUser.statusMsg ? (
            <Detail.Content>{props.currentUser.statusMsg}</Detail.Content>
          ) : (
            <Detail.ContentInputBox>
              <Detail.ContentInput
                type="text"
                {...register("statusMsg")}
                onChange={() => {
                  handleChange();
                }}
                text={statusMsg.current}
              />
              <Detail.ContentInputIcon />
            </Detail.ContentInputBox>
          )}
        </Detail.TextBox>
        <Detail.BtnBox>
          <Detail.GoBackBtn
            onClick={() => {
              props.hideProfile();
            }}
          />
          <Detail.SubmitBtn
            onClick={() => {
              handleSubmitRef();
            }}
          />
          <input type="submit" ref={submitRef} disabled={inProcess} style={{ display: "none" }} />
        </Detail.BtnBox>
      </Detail.Form>
    </Detail.Container>
  );
}

export default MyDetail;
