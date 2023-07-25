"use client";
import {
  collection,
  where,
  query,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import { logOut } from "../store/action";
import { useToastMessages } from "../message/useToastMessages";

const SelfProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Success, Warn } = useToastMessages();
  const authUser = useSelector((state) => state.listStream.authUser);
  console.log("i am selfProfile Page :=", authUser);
  const [users, setUsers] = useState([]);

  const fetchPost = async () => {
    const userDocRef = doc(db, "Users", authUser);
    const userDocSnap = await getDoc(userDocRef);

    setUsers(userDocSnap.data());
  };
  useEffect(() => {
    fetchPost();
  },[]);

  const handleDelete = async () => {
    try {
      const result = window.confirm(`Are You Sure Delete This Record ?`);
      if (result) {
        deleteDoc(doc(db, "Users", authUser));
        Success("Account  Successful Deleted bye bye :)");
        await dispatch(logOut());
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className=" flex justify-center items-center mt-20">
        <div className="flex flex-col items-start gap-5 p-5">
          <Image
            src={"/avatar2.png"}
            width={100}
            height={100}
            alt="not found"
            className="rounded-lg"
          />
          <div className="flex justify-center items-start gap-4">
            <label>Name</label>
            <label>{users.name}</label>
          </div>
          <div className="flex justify-center items-start gap-4">
            <label>Email</label>
            <label>{users.email}</label>
          </div>
          <div className="flex justify-center items-start gap-4">
            <label>Hobby</label>
            <label>{users.hobby}</label>
          </div>
          <div className="flex justify-center items-start gap-4">
            <label>Total likes ..{users.likes}</label>
            <label>Total Star.. {users.star}</label>
          </div>
          <div className="flex justify-center items-start gap-4">
            <button
              className="bg-blue-500 p-2 rounded-md"
              onClick={() => {
                router.push(`/register/${authUser}`);
              }}
            >
              Update
            </button>
            <button
              className="bg-red-500 p-2 rounded-md"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfProfile;
