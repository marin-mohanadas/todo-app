"use client";
import { useState } from "react";
import Login from "./components/login/Login";
import TodoApp from "./components/todo-app/TodoApp";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <TodoApp />
      )}
    </>
  );
}
