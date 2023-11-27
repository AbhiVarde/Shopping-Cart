"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { account, ID } from "../appwrite";
import { useRouter } from "next/navigation";

interface User {
  name: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const session = await account.createEmailSession(email, password);
      const loggedInUserData = await account.get<User>();
      setLoggedInUser(loggedInUserData);
      router.push("/");
    } catch (error) {
      showError("Error signing in. Please check your credentials.");
      console.error("SignIn Error:", error);
    }
  };

  const handleSignUp = async () => {
    const { email, password, name } = credentials;
    if (!email || !password || !name) {
      showError("Please fill in all the required fields.");
      return;
    }

    try {
      await account.create(ID.unique(), email, password, name);
      handleSignIn(email, password);
    } catch (error) {
      showError("Error signing up. Please try again.");
      console.error("SignUp Error:", error);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center ">
      <ToastContainer />
      <div className="py-4 sm:py-8 rounded-lg shadow-md sm:px-10 md:px-0 mx-auto w-4/5 sm:max-w-lg bg-white">
        <div className="px-4 sm:px-8">
          <div className="text-center mx-auto my-auto flex flex-col mb-4">
            <h1 className="text-gray-700 sm:text-lg md:text-xl font-bold">
              👋 Hello! Welcome to
              <span className="ml-1 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                NextEvent!
              </span>
            </h1>
            <p className="pt-2 text-sm sm:text-base text-gray-500">
              Sign In Using
            </p>
          </div>
          <div className="pt-4 divide-y divide-gray-200">
            <form
              onSubmit={() =>
                handleSignIn(credentials.email, credentials.password)
              }
            >
              {["name", "email", "password"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">
                    {field === "email"
                      ? "Email"
                      : field === "password"
                      ? "Password"
                      : "Name"}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "password"
                        ? "password"
                        : "text"
                    }
                    name={field}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder={`Enter your ${field}`}
                    value={credentials[field as keyof typeof credentials]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2.5 rounded-lg text-sm shadow-sm  text-center hover:shadow-md font-medium inline-block"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                {
                  icon: <FcGoogle className="text-xl my-auto" />,
                  text: "Google",
                },
                {
                  icon: <AiFillGithub className="text-xl my-auto text-black" />,
                  text: "Github",
                },
              ].map((provider, index) => (
                <button
                  key={index}
                  type="button"
                  className="gap-2 transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal flex align-items-center"
                >
                  <div className="flex align-items-center gap-1 justify-center mx-auto">
                    {provider.icon}
                    <p className="my-auto">{provider.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-center items-center divide-x-2 text-sm gap-2">
          <p className="text-gray-500">Don't have an account?</p>
          <div className="divide-x">
            <button
              className="text-black hover:underline font-medium px-2"
              onClick={handleSignUp}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
