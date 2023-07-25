import { useRouter } from "next/navigation";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useToastMessages } from "@/components/message/useToastMessages";
import { registerSchema } from "../schema/registerSchema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useRegister = () => {
  const router = useRouter();

  const params = useParams();

  const { Success, Warn } = useToastMessages();
  const [user, setUser] = useState([]);

  console.log("i am register page and ", params.register);

  const handleNavigate = (url) => {
    router.push(`/${url}`);
  };

  useEffect(() => {
    if (params.register) {
      handleFetchMessage(params.register);
    } else {
      setMessage({});
    }
  }, [params.register]);

  const handleFetchMessage = async (ProfileId) => {
    try {
      const docRef = doc(db, "Users", ProfileId);

      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        const data = querySnapshot.data();

        setUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("i am user", user);
  const initialValues = {
    name: user && user.name ? user.name : "",
    gender: user && user.name ? user.name : "",
    email: user && user.name ? user.email : "",
    password: user && user.password ? user.password : "",
    hobby: user && user.hobby ? user.hobby : "",
    // profileImg: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const { name, gender, email, password, hobby } = values;

    try {
      if (params.register !== undefined && params.register !== "") {
        console.log(" i am if");
        const docRef = doc(db, "Users", params.register);
        await updateDoc(docRef, values);
        Success("Update DONE 😄");
        router.push("/self");
      } else {
        const docRef = await addDoc(collection(db, "Users"), {
          name: name,
          gender: gender,
          email: email,
          password: password,
          hobby: hobby,
          likes: 0,
          star: 0,
          blocklist: [],
          likedProfiles: [],
          starProfiles: [],
        });
        Success("Registration DONE 😄");
        handleNavigate("login");
        resetForm();
      }

      // Success("Registration DONE 😄");
      // // console.log("i am data:=", docRef.id);
      // // handleNavigate(`profile/${docRef.id}`);
    } catch (error) {
      Warn("Something Wrong  😑!");
    }
  };

  return {
    initialValues,
    schema: registerSchema,
    handleSubmit,
    navigate: handleNavigate,
  };
};
