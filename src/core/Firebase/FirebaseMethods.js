import { auth } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";


export const signupWithEmailAndPassword = async (request) => {
  const EmailRegEx = new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);

  const { fullName, email, password } = request
  try {
    if (fullName.length === 0) {
      throw new Error("Please Enter name")
    } else if (!EmailRegEx.test(email)) {
      throw new Error("Please Enter valid email")
    } else if (password.length < 6) {
      throw new Error("Please Enter valid password")
    } else {
      const resposne = await createUserWithEmailAndPassword(auth, email, password)
      const user = resposne.user
      await updateProfile(user, { displayName: fullName })
      return user
    }
  } catch (err) {
    switch (err.code) {
      case "auth/email-already-in-use":
        throw new Error("Email address already registered")
      default:
        throw new Error(err.message)
    }
  }
}


export const loginWithEmailAndPassword = async (request) => {
  const EmailRegEx = new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);

  const { email, password, rememberMe } = request
  try {
    if (!EmailRegEx.test(email)) {
      throw new Error("Please Enter valid email")
    } else if (password.length < 6) {
      throw new Error("Please Enter valid password")
    } else {
      const resposne = await signInWithEmailAndPassword(auth, email, password)
      const user = resposne.user
      { rememberMe ? localStorage.setItem('storedEmail', email) : localStorage.removeItem('storedEmail') }
      return user
    }
  } catch (err) {
    switch (err.code) {
      case "auth/user-not-found":
        throw new Error("Invalid email address")
      case "auth/wrong-password":
        throw new Error("Invalid password")
      default:
        throw new Error(err.message)
    }
  }
}

export const loginWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user
  } catch (err) {
    switch (err.code) {
      case "auth/popup-closed-by-user":
        throw new Error("Please don't close popup")
      default:
        throw new Error(err.message)
    }
  }
}

export const getFirebaseUser = async () => {
  try {
    const user = auth.currentUser;
    return user
  } catch (err) {
    switch (err.code) {
      default:
        throw new Error(err.message)
    }
  }
}

export const logoutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(err.message)
  }
}