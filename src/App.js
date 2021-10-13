import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ChatPage from "./components/pages/ChatPage";
import LoadingPage from "./components/pages/LoadingPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = getAuth();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(setUser(user));
        history.push("/");
      } else {
        history.push("/login");
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
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
        <Route path="/chat/:friendUid">
          <ChatPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
