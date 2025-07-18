import React from "react";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Cognify
        </a>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
