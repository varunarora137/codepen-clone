import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import NewProject from "./components/NewProject.jsx";
import { SET_PROJECTS } from "./Store/Slices/Projects.js";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [ques, setQues] = useState("");
  const [value, setValue] = useState("");
  const [ans, setAns] = useState("");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const [model, setModel] = useState("");
  const [getAns, setGetAns] = useState("");
  const user = useSelector((state) => state.user?.currentUser);

  useEffect(() => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    setModel(model);
  }, []);
  const getResponseForGivenPrompt = async (val) => {
    try {
      const result = await model.generateContent(val);
      const response = await result.response.text();
      setGetAns(false);
      setAns(response);
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };

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
        <>
          <div className="w-screen h-screen flex items-start  justify-start overflow-hidden">
            <Routes>
              <Route path="/home/*" element={<Home />} />
              <Route path="*" element={<Navigate to={"/home"} />} />
              <Route path="/newProject" element={<NewProject />} />
            </Routes>
          </div>
          {user && (
            <div className="fixed bottom-4 right-8">
              {visible && (
                <div
                  id="chat"
                  className="overflow-hidden w-[350px] h-[350px] bg-white fixed bottom-20 right-10 z-20 rounded-md transition-all  border-2 border-black pb-8"
                >
                  <div className="mt-2 mx-2  !overflow-auto">
                    {ques && (
                      <div className="bg-gray-300 text-black px-2 py-1 rounded-lg">
                        <span className="font-bold"> Ques: </span>
                        {ques}
                      </div>
                    )}
                    {getAns && <p className="text-center">Please wait...</p>}
                    {ques && ans && (
                      <div className="mt-2 max-h-[240px] !overflow-auto bg-gray-300 text-black px-2 py-2 rounded-lg">
                        <span className="font-bold"> Ans: </span>
                        <ReactMarkdown>{ans}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-[330px] h-8 bg-transparent border-2 border-black px-2 py-1 pr-8 fixed bottom-24  right-12"
                    placeholder="Enter your query..."
                  />
                  <IoMdSend
                    className="fixed bottom-24 right-12 text-3xl text-green-600 cursor-pointer"
                    onClick={() => {
                      if (value) {
                        setQues(value);
                        setAns("");
                        setGetAns(true);
                        getResponseForGivenPrompt(value);
                        setValue("");
                      }
                    }}
                  />
                </div>
              )}
              <IoChatbubbleEllipses
                className="fixed cursor-pointer bottom-4 right-8  text-primaryText text-[60px]"
                onClick={() => setVisible(!visible)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
