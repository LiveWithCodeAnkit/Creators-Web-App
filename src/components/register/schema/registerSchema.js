import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const emailRules = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name Must be required!"),
  gender: Yup.string().required("A radio option is required"),
  hobby: Yup.array()
    .min(1)
    .of(Yup.string().required("required Hobby"))
    .required("Rq Hobby"),
  // profileImg: Yup.mixed().required("Profile Pic Required"),
  email: Yup.string()
    .email("Invalid Email!")
    .matches(emailRules, { message: " Not valid :{" })
    .required("Email Required !"),
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password !" })
    .required("Password Required !"),
});
