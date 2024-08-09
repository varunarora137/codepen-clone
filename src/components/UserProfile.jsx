import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useState } from "react";
import { SET_USER_NULL } from "../Store/Slices/User";

function UserProfile() {
  const user = useSelector((state) => state.user?.currentUser);
  const [isMenu, setIsMenu] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
        {user.photoURL ? (
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="font-semibold text-xl text-white">
            {user?.email[0].toUpperCase()}
          </p>
        )}
      </div>
      <div
        onClick={() => setIsMenu(!isMenu)}
        className="flex items-center justify-center p-3.5 rounded-md bg-secondary cursor-pointer"
      >
        <FaChevronDown className=" text-primaryText" />
      </div>
      {isMenu && (
        <div className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]">
          <Link
            to="/home/projects"
            className="text-lg text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
          >
            Projects
          </Link>
          <Link
            to="/home/collection"
            className="text-lg text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
          >
            Collections
          </Link>
          <Link
            to="/home/profile"
            className="text-lg text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
          >
            Profile
          </Link>
          <p
            onClick={async () => {
              dispatch(SET_USER_NULL());
              await auth.signOut().then(() => window.location.reload());
            }}
            className="text-lg text-primaryText hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
          >
            Sign Out
          </p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
