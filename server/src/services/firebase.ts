import { Response } from "express";
import { FirebaseError, initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ApiError } from "../utils/ApiError";

const firebaseConfig = {
  apiKey: "AIzaSyBSv_wQqwitECZFC-NbJWLndeVstel-7VY",
  authDomain: "synergy-aca29.firebaseapp.com",
  projectId: "synergy-aca29",
  storageBucket: "synergy-aca29.firebasestorage.app",
  messagingSenderId: "793533957071",
  appId: "1:793533957071:web:e718d8517298a0599f88ba",
  measurementId: "G-87JJKNCB3V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUpUserWithEmailAndPassword = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user: ", user);
    return user;
  } catch (error: unknown | FirebaseError) {
    throw error;
  }
};

export const loginUserWithEmailAndPassword = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: unknown | FirebaseError) {
    throw error;
  }
};
export const handleFirebaseErrors = (error: FirebaseError) => {
  const errorCode = error.code.replace("auth/", "");

  const errorMap: Record<string, { message: string; status: number }> = {
    "email-already-in-use": { message: "Email is already in use", status: 400 },
    "user-not-found": { message: "User with this email not found", status: 400 },
    "too-many-requests": { message: "Firebase API limit reached", status: 429 },
    "invalid-email": { message: "Invalid Email", status: 400 },
    "internal-error": { message: "Firebase internal error", status: 500 },
    "network-request-failed": { message: "Network error", status: 500 },
  };

  const mappedError = errorMap[errorCode] || { message: `Firebase Error: ${error.code}`, status: 500 };

  throw new ApiError({
    code: errorCode,
    message: mappedError.message,
    status: mappedError.status,
    at: "handleFirebaseErrors",
  });
};
