import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { userContext } from "@/app/context/UserContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "@/assets/Spinner.gif";

function SignInForm() {
  const { user, signInWithPassword, googleSignIn } = userContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  const inputFieldsStyle =
    "border-2 border-gray-300 rounded-xl p-3 drop-shadow-xl";

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
    onSubmit: (values) => {
      signInWithPassword(values.email, values.password);
    },
  });

  return !loading ? (
    <div className="flex flex-col w-full items-center gap-3">
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
          {formik.errors.email &&
            formik.touched.email &&
            formik.errors.email && (
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
        <span className="mt-2">
          Don't have an account?{" "}
          <Link href="/signUp" className="text-secondary cursor-pointer">
            Sign Up Now
          </Link>
        </span>
      </form>
      <div className="flex items-center mt-2">
        <div className="flex-1 h-0.5 bg-cText"></div>
        <span className="px-3 text-xl">OR</span>
        <div className="flex-1 h-0.5 w-96 bg-cText"></div>
      </div>

      <button
        className="text-white text-lg bg-[#28313A]  rounded-md py-2 px-5 mt-4 drop-shadow-xl flex justify-center items-center gap-2 w-4/12 hover:bg-gray-100 hover:text-navyBlue hover:border-2 hover:border-blue-500"
        onClick={async () => {
          await googleSignIn();
        }}
      >
        Continue With <FcGoogle size={25} />
      </button>
    </div>
  ) : (
    <Image src={Spinner} alt="Spinner" width={50} height={50} />
  );
}
export default SignInForm;
