"use server";

import { encodedRedirect } from "@/supabase/utils";
import { headers } from "next/headers";
import { SignUpSchema, signUpSchema } from "./SignUpSchema";
import { SignInSchema, signInSchema } from "./SignInSchema";
import { createClient } from "@/supabase/server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/app/i18n/routing";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const locale = await getLocale();
  const { data, error: zodError } = signUpSchema.safeParse({
    email,
    password,
    name,
  });
  if (zodError) {
    return encodedRedirect(
      "error",
      "/login",
      zodError.issues[0].message,
      locale,
    );
  }
  const supabase = await createClient();
  // // const origin = (await headers()).get('origin');
  //
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { name: data.name },
      // emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return encodedRedirect("error", "/login", "Failed to register", locale);
  }
  return redirect({ href: "/", locale });
};

export async function signInAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const locale = await getLocale();
  const { data, error: zodError } = signInSchema.safeParse({ email, password });

  if (zodError) {
    return encodedRedirect(
      "error",
      "/login",
      zodError.issues[0].message,
      locale,
    );
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return encodedRedirect("error", "/login", error.message, locale);
  }

  return redirect({ href: "/", locale });
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const locale = await getLocale();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Email is required",
      locale,
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    // return encodedRedirect(
    //   'error',
    //   '/forgot-password',
    //   'Could not reset password',
    // );
  }

  if (callbackUrl) {
    // return redirect(callbackUrl);
  }

  // return encodedRedirect(
  //   'success',
  //   '/forgot-password',
  //   'Check your email for a link to reset your password.',
  // );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    // encodedRedirect(
    //   'error',
    //   '/protected/reset-password',
    //   'Password and confirm password are required',
    // );
  }

  if (password !== confirmPassword) {
    // encodedRedirect(
    //   'error',
    //   '/protected/reset-password',
    //   'Passwords do not match',
    // );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  // if (error) {
  //   encodedRedirect(
  //     'error',
  //     '/protected/reset-password',
  //     'Password update failed',
  //   );
  // }
  //
  // encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  const locale = await getLocale();
  await supabase.auth.signOut();
  return redirect({ href: "/", locale });
};
