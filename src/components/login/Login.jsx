"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "./hook/useLogin";

import { useEffect } from "react";

const Login = () => {
  const { initialValues, schema, handleSubmit, handleNavigate } = useLogin();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <main className="flex lg:h-[100vh]">
            <div className="w-full  p-8 md:p-14 flex items-center justify-center ">
              <div className="p-8 w-[600px]">
                <h1 className="text-6xl font-semibold">Login</h1>
                <p className="mt-6 ml-1">
                  Dont have an account ?{" "}
                  <span
                    className="underline hover:text-blue-400 cursor-pointer"
                    onClick={() => {
                      handleNavigate("register");
                    }}
                  >
                    Sign Up
                  </span>
                </p>

                <div className="mt-10 pl-1 flex flex-col">
                  <label>Email</label>
                  <Field
                    name="email"
                    id="email"
                    type="text"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="mt-10 pl-1 flex flex-col">
                  <label>Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90">
                  Sign in
                </button>
              </div>
            </div>
          </main>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
