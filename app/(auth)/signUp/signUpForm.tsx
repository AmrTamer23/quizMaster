import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const SignUpForm = () => {
  const inputFieldsStyle =
    "border-2 border-gray-300 rounded-xl p-3 drop-shadow-xl";

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col w-full items-center"
    >
      <fieldset className="flex flex-col w-4/12 mb-5">
        <label htmlFor="email" className="text-lg">
          Username
        </label>
        <input
          type="name"
          name="username"
          className={inputFieldsStyle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
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
        Sign Up
      </button>
      <span className="my-5">
        Already have an account?{" "}
        <Link href="/signIn" className="text-secondary cursor-pointer">
          Sign In
        </Link>
      </span>
    </form>
  );
};
export default SignUpForm;
