"use server";

import { signIn, signOut } from "@/auth"
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, {redirectTo: "/"});
  revalidatePath("/");
}

export const logout = async () => {
  await signOut();
  revalidatePath("/")
}

export const loginWithCredentials = async (data) => {
  // get username pass from data
  // chech for existing user using prisma
  // trycatch
  // signIn("credentials", data)
}