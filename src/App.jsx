import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { Circles } from "react-loader-spinner";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, user.providerData[0]);
        setDoc(doc(db, "users", user?.uid), user?.providerData[0]).then(
          () => {}
        );
      } else {
        navigate("/home/auth/login", { replace: true });
      }

      setInterval(() => {
        setIsLoading(false);
      });
    });

    return () => unsub();
  }, []);

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
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
