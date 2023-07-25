import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { useToastMessages } from "@/components/message/useToastMessages";
import { registerSchema } from "../schema/registerSchema";

export const useRegister = () => {
  const router = useRouter();

  const { Success, Warn } = useToastMessages();

  const initialValues = {
    name: "",
    gender: "",
    email: "",
    password: "",
    hobby: "",
    // profileImg: "",
  };

  const handleNavigate = (url) => {
    router.push(`/${url}`);
  };
  // https://www.roc8.career
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const { name, gender, email, password, hobby } = values;

    try {
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
      console.log("i am data:=", docRef.id);
      handleNavigate(`profile/${docRef.id}`);
      // resetForm();
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
