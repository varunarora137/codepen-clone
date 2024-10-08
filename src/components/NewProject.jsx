import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-removebg-preview.png";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

function NewProject() {
  const location = useLocation();
  const project = location.state || {};

  const [html, setHtml] = useState(project.html || "");
  const [css, setCss] = useState(project.css || "");
  const [js, setJs] = useState(project.js || "");
  const [output, setOutput] = useState(project.output || "");
  const [title, setTitle] = useState(project.title || "Untitled");
  const [isTitle, setIsTitle] = useState("");
  const user = useSelector((state) => state?.user?.currentUser);

  useEffect(() => {
    generateOutput();
  }, [html, css, js]);

  function generateOutput() {
    setOutput(`<html>
    <head>
    <style>
    ${css}
    </style>
    </head>
    <body>
    ${html}
    <script>${js}</script>
    </body>
    </html>`);
  }

  async function saveProgram() {
    const id = project.id || `${Date.now()}`;
    const _doc = {
      id,
      title,
      html,
      css,
      js,
      output,
      user,
    };

    await setDoc(doc(db, "projects", id), _doc)
      .then(() => {
        toast.success("Saved", { autoClose: 1000 });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-start justify-start !overflow-hidden">
        {/* /////////////////// */}
        <ToastContainer />
        {/* /////////////////////////// */}

        <header className="w-full flex  items-center justify-between px-8 py-2 ">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img
                src={Logo}
                alt="img"
                className="w-32 h-auto object-contain"
              />
            </Link>
            <div className="flex flex-col items-start justify-start">
              {/* ///////////// */}
              <div className="flex items-center justify-center  gap-3">
                {isTitle ? (
                  <>
                    <input
                      type="text"
                      placeholder="Your Title"
                      className="px-3 py-2 rounded-mg bg-transparent text-primaryText text-base outline-none border-none"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        console.log("yo");
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p className="px-3 py-2 text-white text-lg">{title}</p>
                  </>
                )}
                {!project.view && isTitle && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsTitle(false)}
                  >
                    <MdCheck className="text-2xl text-emerald-500 hover:text-white" />
                  </div>
                )}
                {!project.view && !isTitle && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsTitle(true)}
                  >
                    <MdEdit className="text-2xl text-primaryText hover:text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center px-3 -mt-2 gap-2">
                <p className="text-primaryText text-sm capitalize">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email?.split("@")[0]}`}
                </p>
                <p className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer hover:text-white">
                  + Follow
                </p>
              </div>
            </div>
          </div>
          {/* //////////////// */}
          {user && (
            <div className="flex items-center justify-center gap-4">
              {!project.view && (
                <button
                  onClick={saveProgram}
                  className="px-6 py-2 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md hover:text-white"
                >
                  Save
                </button>
              )}
              <UserProfile />
            </div>
          )}
        </header>

        {/* /////////////////////////// */}

        <div className="!overflow-hidden">
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* ///////////// */}
            <SplitPane split="vertical" minSize={500}>
              {/* /////////////// */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                    <FaHtml5 className="text-xl text-red-500" />
                    <p className="text-primaryText font-semibold">HTML</p>
                  </div>
                  {/* ///////////////// */}
                  <div className="flex items-center justify-center cursor-pointer gap-5 px-4">
                    <FcSettings className="text-xl hover:text-white" />
                    <FaChevronDown className="text-xl text-primaryText hover:text-white" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    className="CodeMirror"
                    value={html}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value) => setHtml(value)}
                    readOnly={project.view === true ? "nocursor" : false}
                  />
                </div>
              </div>
              <SplitPane split="vertical" minSize={500}>
                {/* /////////////// */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaCss3 className="text-xl text-sky-500" />
                      <p className="text-primaryText font-semibold">CSS</p>
                    </div>
                    {/* ///////////////// */}
                    <div className="flex items-center justify-center cursor-pointer gap-5 px-4">
                      <FcSettings className="text-xl hover:text-white" />
                      <FaChevronDown className="text-xl text-primaryText hover:text-white" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      className="CodeMirror"
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value) => setCss(value)}
                      readOnly={project.view === true ? "nocursor" : false}
                    />
                  </div>
                </div>
                {/* //////////////////////// */}
                <div className="w-full h-full flex flex-col items-start justify-start !overflow-hidden">
                  <div className="w-full flex items-center justify-between">
                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
                      <FaJs className="text-xl text-yellow-500" />
                      <p className="text-primaryText font-semibold">JS</p>
                    </div>
                    {/* ///////////////// */}
                    <div className="flex items-center justify-center cursor-pointer gap-5 px-4">
                      <FcSettings className="text-xl hover:text-white" />
                      <FaChevronDown className="text-xl text-primaryText hover:text-white" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      className="CodeMirror"
                      value={js}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value) => setJs(value)}
                      readOnly={project.view === true ? "nocursor" : false}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* ////////////////// */}
            <div
              className="bg-white !overflow-hidden"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              ></iframe>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
}

export default NewProject;
