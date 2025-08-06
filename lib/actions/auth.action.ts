'use server';

import { auth } from "@/firebase/admin";
import { db } from "@/firebase/admin";
import { cookies } from "next/headers";


interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

const ONE_WEEK = 60 * 60 * 24 * 7; // 7 days in seconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (userSnap.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    await userRef.set({ name, email, password });

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (e: unknown) {
  if (e instanceof Error) {
    console.error("Error during sign up:", e.message);

    return {
      success: false,
      message: e.message || "Failed to create an account.",
    };
  }

  console.error("Unknown error during sign up:", e);

  return {
    success: false,
    message: "Failed to create an account.",
  };
}
}

export async function signIn(params: SignInParams) {
  const { email, idToken} = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if(!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up.",
      };
    }
    await setSessionCookie(idToken);

  }catch (e) {
    console.log(e);

    return {
      success: false,
      message: "Failed to sign in.",
    }
  }
}


export async function setSessionCookie(idToken: string){
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  })

  cookieStore.set('session', sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) return null;
  

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
    if (!userRecord.exists) return null;
    

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch(e) {
    console.log(e)
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}