import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider).then(() => {
    window.location.reload();
  });
};

export const signInWithGithub = async () => {
  await signInWithPopup(auth, new GithubAuthProvider()).then(() => {
    window.location.reload();
  });
};
