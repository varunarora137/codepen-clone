import { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi";
import Logo from "../assets/logo-removebg-preview.png";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa6";
import "./Home.css";
import Projects from "./Projects.jsx";
import SignUp from "./SignUp.jsx";

import { Link, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile.jsx";
import { SET_SEARCH_TERM } from "../Store/Slices/search.js";

function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.search ? state.searchTerm?.search : ""
  );
  // const [user, setUser] = useState(false);
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={` ${
          isSidebarOpen ? "flex-[.15] xl:flex-[.15]" : "w-2"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        {/* ////////////////////////////////////// */}
        <div
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer group "
        >
          <HiChevronDoubleLeft className="text-white text-xl group-active:text-gray-500" />
        </div>
        {/* ////////////////////////////////////////// */}
        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"/home"}>
            <img src={Logo} alt="img" className="object-contain w-72 h-auto" />
          </Link>
          {user && (
            <Link to={"/newProject"}>
              <div className="px-6 py-3 flex items-center justify-center rounded-xl border  cursor-pointer group border-animated">
                <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                  Start Coding
                </p>
              </div>
            </Link>
          )}
          {user && (
            <Link
              to={"/home/projects"}
              className="flex items-center justify-center gap-6"
            >
              <MdHome className="text-primaryText text-xl" />
              <p className="text-lg text-primaryText">Home</p>
            </Link>
          )}
        </div>
      </div>
      {/* ///////////////////////////// */}
      <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-8">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="bg-secondary w-full px-4 py-2 rounded-md flex items-center justify-center gap-3">
            <FaSearchengin className="text-2xl text-primaryText " />
            <input
              type="text"
              value={searchTerm}
              className="flex-1 px-4 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600"
              placeholder="Seach here..."
              onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))}
            />
          </div>
          {!user && (
            <div className="flex items-center justify-center gap-3">
              <Link
                to={"/home/auth/signup"}
                className="bg-emerald-500 px-4 py-2 rounded-md  text-white text-lg cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
              <Link
                to={"/home/auth/login"}
                className="bg-secondary px-4 py-2 rounded-md  text-white text-lg cursor-pointer hover:bg-primaryText"
              >
                LogIn
              </Link>
            </div>
          )}
          {user && <UserProfile />}
        </div>
        {/* /////////////////////////////// */}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth/:id" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Home;
