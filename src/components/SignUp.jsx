import { FaEnvelope, FaGithub } from "react-icons/fa6";
import Logo from "../assets/logo-removebg-preview.png";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import UserInput from "./UserInput";
import { useParams } from "react-router-dom";
import OR from "./OR";

function SignUp() {
  let { id } = useParams();
  console.log(id);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVaildationMessage, setEmailVaildationMessage] = useState(false);
  const [isLogin, setIsLogin] = useState(id === "login");

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
          {/* ////////////////////// */}
          <div className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500">
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
          <div className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,.4)] cursor-pointer">
            <FcGoogle className="text-3xl" />
            <p className="text-white text-xl ">Sign in with Google</p>
          </div>
          <OR />
          <div className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,.4)] cursor-pointer">
            <FaGithub className="text-3xl" />
            <p className="text-white text-xl ">Sign in with Github</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
