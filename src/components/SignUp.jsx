import { FaEnvelope, FaGithub } from "react-icons/fa6";
import Logo from "../assets/logo-removebg-preview.png";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import UserInput from "./UserInput";
import { useParams } from "react-router-dom";
import OR from "./OR";
import { signInWithGithub, signInWithGoogle } from "../auth";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function SignUp() {
  let { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVaildationMessage, setEmailVaildationMessage] = useState(false);
  const [isLogin, setIsLogin] = useState(id === "login");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function createNewUser() {
    if (emailVaildationMessage) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async function logInWithEmailAndPassword() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message.includes("invalid-credential") ||
          error.message.includes("auth/invalid-email")
        ) {
          setAlert(true);
          setAlertMessage("Invalid Email or Password");
        } else {
          setAlert(true);

          setAlertMessage("Temporarily Disabled due to many failures");
        }

        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  }

  useEffect(() => {
    if (id === "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [id]);

  return (
    <div className="w-full py-6">
      <img
        src={Logo}
        className="object-contain w-32 opacity-50 h-auto"
        alt="logo"
      />
      <div className="w-full flex flex-col items-center justify-center py-8">
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          {/* //////////////////// */}
          <UserInput
            label="Email"
            placeholder="Email"
            isPassword={false}
            key="email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setEmailVaildationMessage={setEmailVaildationMessage}
          />
          {/* //////////////////// */}
          <UserInput
            label="Password"
            placeholder="Password"
            isPassword={true}
            key="password"
            Icon={MdPassword}
            setStateFunction={setPassword}
          />
          {/* /////////////// */}
          {alert && <p className="text-red-500">{alertMessage}</p>}
          {/* ////////////////////// */}
          <div
            onClick={!isLogin ? createNewUser : logInWithEmailAndPassword}
            className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
          >
            <p className="text-xl text-white">
              {isLogin ? "Login" : "Sign Up"}
            </p>
          </div>
          <p className="text-sm flex items-center justify-center gap-3 text-primaryText">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-emerald-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
          {/* //////////////////////// */}
          <OR />
          <div
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,.4)] cursor-pointer"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-white text-xl ">Sign in with Google</p>
          </div>
          <OR />
          <div
            onClick={signInWithGithub}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,.4)] cursor-pointer"
          >
            <FaGithub className="text-3xl" />
            <p className="text-white text-xl ">Sign in with Github</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
