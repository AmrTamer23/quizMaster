"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { userContext } from "@/app/context/UserContext";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "@/app/components/Spinner";

function SignInForm() {
  const { signInWithPassword, googleSignIn } = userContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    onSubmit: async (values) => {
      Promise.resolve(setLoading(true)).then(async () => {
        const isLogged = await signInWithPassword(
          values.email,
          values.password
        );
        if (isLogged) {
          router.push("/dashboard");
        } else {
          setLoading(false);
          toast.error("Invalid email or password", {
            position: "top-right",
          });
        }
      });
    },
  });

  return !loading ? (
    <div className="flex flex-col w-full items-center gap-3">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full items-center"
      >
        <fieldset className="flex flex-col w-4/12 mb-5 gap-2">
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
        <fieldset className="flex flex-col w-4/12 mb-5 gap-2">
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
          className="w-4/12 text-white text-2xl bg-primary rounded-md p-2 mt-4 drop-shadow-xl hover:bg-secondary hover:text-black"
        >
          Sign In
        </button>
        <span className="mt-4">
          Don't have an account?{" "}
          <Link
            href="/signUp"
            className="dark:text-secondary text-dark_green-600 font-medium cursor-pointer"
          >
            Sign Up Now
          </Link>
        </span>
      </form>
      <div className="flex items-center mt-2">
        <div className="flex-1 h-0.5 dark:bg-white bg-midnight_green-200"></div>
        <span className="px-3 text-xl ">OR</span>
        <div className="flex-1 h-0.5 w-96 dark:bg-white bg-midnight_green-200"></div>
      </div>

      <button
        className="text-black text-lg dark:bg-secondary bg-whiteSmoke border-2 border-night-200  shadow-xl  rounded-md py-2 px-5 mt-4 flex justify-center items-center gap-2 w-4/12 hover:bg-gray-100 hover:border-x-4 hover:border-blue-500"
        onClick={async () => {
          Promise.resolve(setLoading(true)).then(async () => {
            const isLogged = await googleSignIn();
            if (isLogged) router.push("/dashboard");
            else console.log("error");
          });
        }}
      >
        <FcGoogle size={25} /> Continue With Google
      </button>
      <ToastContainer />
    </div>
  ) : (
    <Spinner />
  );
}
export default SignInForm;
