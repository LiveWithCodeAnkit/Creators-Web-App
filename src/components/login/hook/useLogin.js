import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/message/useToastMessages";
import { loginSchema } from "../schema/loginSchema";

import { collection, where, query, getDocs } from "firebase/firestore";

import { db } from "../../../../firebase/firebase";

export const useLogin = () => {
  const router = useRouter();

  const { Success, Warn } = useToastMessages();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleNavigate = (url) => {
    router.push(`/${url}`);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    console.log("i am login page:=", values);
    try {
      const q = query(
        collection(db, "Users"),
        where("email", "==", email),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);
      // console.log(" i am info:=",querySnapshot.docs.id);
      if (!querySnapshot.empty) {
        Success("You are logged in");
        // router.push(`/profile/${email}`)

        let id;
        querySnapshot.forEach((doc) => {
          id=({ ...doc.data(), id: doc.id });
        });
        router.push(`/profile/${id.id}`)
     
      } else {
        Warn("Invalid email or password");
      }
    } catch (error) {
      console.log("i am login error:=", error);
    }
  };

  return {
    initialValues,
    schema: loginSchema,
    handleNavigate,
    handleSubmit,
  };
};
