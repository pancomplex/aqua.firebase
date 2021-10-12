import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPhotoURL, setStatusMsg } from "../../../../redux/actions/user_action";
import { useForm } from "react-hook-form";
import mime from "mime-types";

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";

import { Detail } from "../../../style/mainStyle";

function MyDetail(props) {
  const currentUser = props.currentUser;

  // firebase
  const storage = getStorage();
  const database = getDatabase();
  const auth = getAuth();

  // redux
  const dispatch = useDispatch();

  // useState
  const [imagePreview, setImagePreview] = useState();
  const [inputMode, setInputMode] = useState(false);
  const [updateStatusMsg, setUpdateStatusMsg] = useState(currentUser.statusMsg);
  const [updateProfileImg, setUpdateProfileImg] = useState({});
  const [inputStatusMsgSize, setInputStatusMsgSize] = useState({ width: 40, height: 20 });
  const [inProcess, setInProcess] = useState(false);

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { statusMsg: updateStatusMsg }, mode: "onSubmit" });

  // useRef
  const statusMsgRef = useRef();
  const inputOpenImageRef = useRef();
  const inputTextRef = useRef();
  const submitRef = useRef();

  // useEffect
  useEffect(() => {
    setInputStatusMsgSize({
      width: statusMsgRef.current.offsetWidth,
      height: statusMsgRef.current.offsetHeight,
    });
  }, []);

  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };

  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    const metadata = { contentType: mime.lookup(file.name) };

    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
    }
    setUpdateProfileImg({ data: file, metadata: metadata });
  };

  const handleInputIcon = () => {
    setInputMode((prev) => !prev);
  };

  const handleChangeStatusMsg = (e) => {
    setUpdateStatusMsg(e.target.value);
    setInputStatusMsgSize({
      width: statusMsgRef.current.offsetWidth,
      height: statusMsgRef.current.offsetHeight,
    });
  };

  const handleSubmitRef = () => {
    submitRef.current.click();
  };

  const onSubmit = async () => {
    setInProcess(true);

    try {
      if (updateProfileImg.data) {
        const uploadTaskSnapshot = await uploadBytes(
          storageRef(storage, `user_image/${currentUser.uid}.jpg`),
          updateProfileImg.data,
          updateProfileImg.metadata
        );
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });
        await update(databaseRef(database, "users/" + currentUser.uid), {
          image: downloadURL,
        });
        dispatch(setPhotoURL(downloadURL));
      }
      await update(databaseRef(database, "users/" + currentUser.uid), {
        statusMessage: updateStatusMsg,
      });
      dispatch(setStatusMsg(updateStatusMsg));

      props.hideProfile();
    } catch (error) {
      console.log(error);
    }
    setInProcess(false);
  };

  return (
    <Detail.Container>
      <Detail.Form onSubmit={handleSubmit(onSubmit)}>
        <Detail.ImageBox onClick={handleOpenImageRef}>
          <img src={imagePreview ?? currentUser.photoURL} />
        </Detail.ImageBox>
        <Detail.TextBox>
          <Detail.Title> {currentUser.displayName}</Detail.Title>
          <Detail.ContentInputBox>
            {inputMode ? (
              <Detail.ContentInput
                {...register("statusMsg")}
                ref={inputTextRef}
                onChange={(e) => {
                  handleChangeStatusMsg(e);
                }}
                width={inputStatusMsgSize.width}
                height={inputStatusMsgSize.height}
              />
            ) : (
              <Detail.Content>{updateStatusMsg}</Detail.Content>
            )}
          </Detail.ContentInputBox>
          <Detail.ContentInputIcon
            onClick={async () => {
              await handleInputIcon();
              inputTextRef.current.focus();
            }}
          />
          {/* )} */}
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
        </Detail.BtnBox>
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/png"
          ref={inputOpenImageRef}
          onChange={handleChangeProfileImage}
          style={{ display: "none" }}
        />
        <input type="submit" ref={submitRef} disabled={inProcess} style={{ display: "none" }} />
      </Detail.Form>
      <Detail.Content
        ref={statusMsgRef}
        style={{ position: "fixed", bottom: 0, right: 0, color: "transparent" }}
      >
        {updateStatusMsg}
      </Detail.Content>
    </Detail.Container>
  );
}

export default MyDetail;
