import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { Circles } from "react-loader-spinner";
import { SET_USER } from "./Store/Slices/User";
import { useDispatch } from "react-redux";
import NewProject from "./components/NewProject.jsx";
import { SET_PROJECTS } from "./Store/Slices/Projects.js";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, user.providerData[0]);
        setDoc(doc(db, "users", user?.uid), user?.providerData[0]).then(() => {
          dispatch(SET_USER(user?.providerData[0]));
          navigate("/home/projects", { replace: true });
        });
      } else {
        navigate("/home/auth/login", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      });
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, "projects"),
      orderBy("id", "desc")
    );
    const unsubscribe = onSnapshot(projectQuery, (querySnaps) => {
      const projectsList = querySnaps.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projectsList));
    });
    return unsubscribe;
  }, []);

  // if (isLoading) return <div>Loading</div>;
  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start  justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="*" element={<Navigate to={"/home"} />} />
            <Route path="/newProject" element={<NewProject />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
