import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";

import firebase from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ChatPage from "./components/pages/ChatPage";
import Loading from "./components/pages/Loading";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = getAuth();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
      } else {
        history.push("/login");
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/chat/:friendEmail">
          <ChatPage />
        </Route>
        <Route path="/main">
          {/* 임시 메인 페이지 라우터*/}
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
