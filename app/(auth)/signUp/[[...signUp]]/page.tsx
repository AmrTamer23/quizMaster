import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("../signUpForm"));

const SignUp = () => {
  return (
    <>
      <h2 className="text-3xl text-center font-medium mb-5">Hey There !</h2>
      <SignUpForm />
    </>
  );
};
export default SignUp;
