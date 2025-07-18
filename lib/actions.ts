"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { APIError } from "better-auth/api";

interface State {
  errorMessage?: string | null;
}

export async function userSignupAction(prevState: State, formdata: FormData) {
  const rawFormdata = {
    name: formdata.get("name") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  const { name, email, password } = rawFormdata;

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.error("Sign-up with email & password has not worked. ", error);
  }

  redirect("/sign-in");
}

export async function userSigninAction(prevState: State, formdata: FormData) {
  const rawFormdata = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  const { email, password } = rawFormdata;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "User not found." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.error("Sign-in with email & password has not worked. ", error);
  }

  redirect("/dashboard");
}
