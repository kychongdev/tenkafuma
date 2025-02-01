"use server";

import { createClient } from "@/supabase/server";

export async function createSpire() {
  const supabase = await createClient();

  //export const signUpAction = async (formData: FormData) => {
  //  const email = formData.get("email")?.toString();
  //  const password = formData.get("password")?.toString();
  //  const name = formData.get("name")?.toString();
  //  const locale = await getLocale();
  //  const { data, error: zodError } = signUpSchema.safeParse({
  //    email,
  //    password,
  //    name,
  //  });
  //  if (zodError) {
  //    return encodedRedirect(
  //      "error",
  //      "/login",
  //      zodError.issues[0].message,
  //      locale,
  //    );
  //  }
  //  // // const origin = (await headers()).get('origin');
  //  //
  //  const { error } = await supabase.auth.signUp({
  //    email: data.email,
  //    password: data.password,
  //    options: {
  //      data: { name: data.name },
  //      // emailRedirectTo: `${origin}/auth/callback`,
  //    },
  //  });
  //  if (error) {
  //    return encodedRedirect("error", "/login", "Failed to register", locale);
  //  }
  //  return redirect({ href: "/", locale });
  //};
}
