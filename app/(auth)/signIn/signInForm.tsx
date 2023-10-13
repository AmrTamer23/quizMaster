import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { userAuth } from "@/app/context/AuthContext";

const SignInForm = () => {
  const inputFieldsStyle =
    "border-2 border-gray-300 rounded-xl p-3 drop-shadow-xl";

  const { user, googleSignIn } = userAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-full items-center"
    >
      <fieldset className="flex flex-col w-4/12 mb-5">
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          type="email"
          name="email"
          className={inputFieldsStyle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && formik.errors.email && (
          <div className="text-red-800">{formik.errors.email}</div>
        )}
      </fieldset>
      <fieldset className="flex flex-col w-4/12 mb-5">
        <label htmlFor="email" className="text-lg ">
          Password
        </label>
        <input
          type="password"
          name="password"
          className={inputFieldsStyle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password &&
          formik.touched.password &&
          formik.errors.password && (
            <div className="text-red-800">{formik.errors.password}</div>
          )}
      </fieldset>
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-4/12 text-white text-2xl bg-navyBlue rounded-md p-2 mt-4 drop-shadow-xl hover:bg-secondary hover:text-navyBlue"
      >
        Sign In
      </button>
      <span className="my-5">
        Don't have an account?{" "}
        <Link href="/signUp" className="text-secondary cursor-pointer">
          Sign Up Now
        </Link>
      </span>
      <div className="flex items-center mt-2">
        <div className="flex-1 h-0.5 bg-cText"></div>
        <span className="px-3 text-xl">Or</span>
        <div className="flex-1 h-0.5 w-96 bg-cText"></div>
      </div>

      <button
        className="text-white text-lg bg-[#132a3f]  rounded-md py-2 px-5 mt-4 drop-shadow-xl flex justify-center gap-2 w-2/12"
        onClick={handleGoogleSignIn}
      >
        Continue With <FcGoogle size={25} />
      </button>
    </form>
  );
};
export default SignInForm;
