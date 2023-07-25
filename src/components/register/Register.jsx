"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { useRegister } from "./hook/useRegister";
import { useParams } from "next/navigation";

const Register = () => {
  const { initialValues, schema, handleSubmit, navigate } = useRegister();

  const params = useParams();

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <main className="flex lg:h-[100vh]">
            <div className="w-full  p-8 md:p-14 flex items-center justify-center ">
              <div className="p-8 w-[600px]">
                <h1 className="text-6xl font-semibold">
                  {params.register ? "Update Your Profile" : "Sign Up"}
                </h1>

                {params.register ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <p className="mt-6 ml-1">
                      Already have an account ?{" "}
                      <span
                        className="underline hover:text-blue-400 cursor-pointer"
                        onClick={() => {
                          navigate("login");
                        }}
                      >
                        Login
                      </span>
                    </p>
                  </>
                )}

                <div className="mt-10 pl-1 flex flex-col">
                  <label>Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <div className="mt-10 pl-1 flex justify-start items-center gap-3">
                  <label>Gender</label>
                  <Field
                    type="radio"
                    name="gender"
                    id="gender"
                    value="male"
                    className="accent-red-800"
                  />
                  Male
                  <Field
                    type="radio"
                    name="gender"
                    id="gender"
                    value="female"
                    className="accent-red-800"
                  />
                  Female
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-orange-700"
                  />
                </div>
                <div className="mt-10 pl-1 flex justify-start items-center gap-3">
                  <label>Hobby</label>
                  <div className="flex  justify-center items-start gap-2">
                    <div className="flex justify-center items-center gap-2">
                      <Field
                        type="checkbox"
                        name="hobby"
                        id="hobby"
                        value="Study"
                        className="accent-red-800"
                      />
                      <label>Study</label>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <Field
                        type="checkbox"
                        name="hobby"
                        id="hobby"
                        value="Code"
                        className="accent-red-800"
                      />
                      <label>Code</label>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <Field
                        type="checkbox"
                        name="hobby"
                        id="hobby"
                        value="Nothing"
                        className="accent-red-800"
                      />
                      <label>Nothing</label>
                    </div>
                    <ErrorMessage
                      name="hobby"
                      component="div"
                      className="text-orange-700"
                    />
                  </div>
                </div>
                {/* <div className="mt-10 pl-1">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>

                  <Field
                    type="file"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="profileImg"
                    name="profileImg"
                  />
                  <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                  >
                    SVG, PNG, JPG or GIF MAX 800x400px
                  </p>
                  <ErrorMessage
                    name="profileImg"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div> */}
                <div className="mt-10 pl-1 flex flex-col">
                  <label>Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                    disabled={params.register?"true":"false"}
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
                    id="password"
                    name="password"
                    className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                    disabled={params.register?"true":"false"}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                >
                  {params.register ? "Update" : "Sign Up"}
                </button>
              </div>
            </div>
          </main>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
