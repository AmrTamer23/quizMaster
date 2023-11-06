"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { userContext } from "@/app/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const inputFieldsStyle =
    "border-2 border-gray-300 rounded-xl p-3 drop-shadow-xl";

  const { signUp } = userContext();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(15, "Username must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: async (values) => {
      const msg = await signUp(values.email, values.password, values.username);

      if (msg === "success") {
        toast.success("Account created successfully!", {
          position: "top-right",
        });

        setTimeout(() => {
          router.push("/signIn");
        }, 1500);
      } else {
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full items-center"
      >
        <fieldset className="flex flex-col w-4/12 mb-5">
          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <input
            type="name"
            name="username"
            className={inputFieldsStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            autoFocus
          />
          {formik.errors.username &&
            formik.touched.username &&
            formik.errors.username && (
              <div className="text-red-800">{formik.errors.username}</div>
            )}
        </fieldset>
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
          className="w-4/12 text-white text-2xl bg-navyBlue rounded-md p-2 mt-4 drop-shadow-xl bg-primary hover:text-black hover:bg-secondary hover:text-navyBlue"
        >
          Sign Up
        </button>
        <span className="my-5">
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="dark:text-secondary text-dark_green-600 font-medium cursor-pointer"
          >
            Sign In
          </Link>
        </span>
      </form>
      <ToastContainer />
    </>
  );
};
export default SignUpForm;
