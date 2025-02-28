import { FirebaseError, initializeApp } from "firebase/app";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

export const signUpUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user: ", user);
    return user;
  } catch (error: unknown | FirebaseError) {
    if (error instanceof FirebaseError) {
      console.log("Google Auth Error: SignUp: error: ", error);
      console.log("error: ", error.code);
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid Email");
      }
    }
  }
};

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log("Google Auth Error: error: ", error);
  }
};
