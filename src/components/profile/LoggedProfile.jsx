"use client";
import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useParams } from "next/navigation";
import Image from "next/image";
import { BsHeart } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

const LoggedProfile = () => {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPost = async () => {
    await getDocs(collection(db, "Users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filteredData = newData.filter((user) => user.id !== params.profile);
      setUsers(filteredData);
    });
  };
  useEffect(() => {
    fetchPost();
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.hobby.some((hobby) =>
        hobby.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleBlock = async (userId) => {
    try {
      const currentUserDocRef = doc(db, "Users", params.profile);
      const currentUserDocSnap = await getDoc(currentUserDocRef);
      if (currentUserDocSnap.exists()) {
        await updateDoc(currentUserDocRef, {
          blocklist: arrayUnion(userId),
        });
      } else {
        console.log("Current user not found in the database.");
      }
    } catch (error) {
      console.error("Error blocking the user:", error);
    }
  };
  const handleLike = async (userId) => {
    try {
      const userDocRef = doc(db, "Users", userId);
      const userDocSnap = await getDoc(userDocRef);

      const currentUserDocRef = doc(db, "Users", params.profile);
      const currentUserDocSnap = await getDoc(currentUserDocRef);

      if (userDocSnap.exists()) {
        let numLike = userDocSnap.data().likes;
        let newLikes = numLike + 1;
        await updateDoc(userDocRef, {
          likes: newLikes,
        });

        if (currentUserDocSnap.exists()) {
          await updateDoc(currentUserDocRef, {
            likedProfiles: arrayUnion(userId),
          });
        } else {
          console.log("Current user not found in the database.");
        }

        fetchPost();
      } else {
        console.log("User not found in the database.");
      }
    } catch (error) {
      console.error("Error updating the user's like:", error);
    }
  };

  const handleStar = async (userID) => {
    try {
      const userDocRef = doc(db, "Users", userID);
      const userDocSnap = await getDoc(userDocRef);

      const currentUserDocRef = doc(db, "Users", params.profile);
      const currentUserDocSnap = await getDoc(currentUserDocRef);

      if (userDocSnap.exists()) {
        let numStar = userDocSnap.data().star;

        console.log("User's Star updated successfully!");
        let newStar = numStar + 1;
        await updateDoc(userDocRef, {
          star: newStar,
        });

        if (currentUserDocSnap.exists()) {
          await updateDoc(currentUserDocRef, {
            starProfiles: arrayUnion(userID),
          });
        } else {
          console.log("Current user not found in the database.");
        }

        fetchPost();
      } else {
        console.log("User not found in the database.");
      }
    } catch (error) {
      console.error("Error updating the user's Star:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-3">
        <div className="w-1/2">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Name ,Hobby,..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 p-10 flex-wrap">
        {filteredUsers.map((item, i) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-start p-4 gap-2  bg-blue-500"
          >
            <Image
              src={"/avatar2.png"}
              width={50}
              height={50}
              alt="not found"
              className="rounded-lg"
            />
            <div className="flex justify-center items-start gap-2">
              <label>Name:</label>
              <label>{item.name}</label>
            </div>
            <div className="flex justify-center items-start gap-2">
              <label>Gender:</label>
              <label>{item.gender}</label>
            </div>
            <div className="flex justify-center items-start gap-2">
              <label>Hobby:</label>
              <label>{item.hobby.join(" , ")}</label>
            </div>
            <div className="flex justify-center items-start gap-3">
              <div className="flex justify-center items-start gap-1">
                <AiOutlineStar
                  className="text-2xl hover:cursor-pointer"
                  onClick={() => {
                    handleStar(item.id);
                  }}
                />
                <label>{item.star}</label>
              </div>
              <div className="flex justify-center items-start gap-1">
                <BsHeart
                  className="text-2xl hover:cursor-pointer	"
                  onClick={() => {
                    handleLike(item.id);
                  }}
                />
                <label>{item.likes}</label>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1">
              {" "}
              <button
                className="bg-red-500 p-2 rounded-xl"
                onClick={() => {
                  handleBlock(item.id);
                }}
              >
                Block
              </button>
              <button className="bg-red-500 p-2 rounded-xl">UnBlock</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LoggedProfile;
