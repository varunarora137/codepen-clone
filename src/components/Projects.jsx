import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects() {
  const projects = useSelector((state) => state.projects?.projects);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.search ? state.searchTerm?.search : ""
  );

  const user = useSelector((state) => state.user?.currentUser);
  const navigate = useNavigate();

  function handleView(project) {
    navigate("/newProject", { state: { ...project, view: true } });
  }

  function handleEdit(project) {
    console.log("hello");
    if (user && user.uid === project.user.uid) {
      navigate("/newProject", { state: project });
    } else {
      toast.error("No Permission", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleDelete = async (id, uid) => {
    if (user && user.uid === uid) {
      try {
        await deleteDoc(doc(db, "projects", id));
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    } else {
      toast.error("No Permission", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const sTerm = searchTerm.toLowerCase();
      const arr = [];
      projects?.map((project) => {
        if (project.title.toLowerCase().includes(sTerm)) {
          arr.push(project);
        }
      });
      setFilteredProjects(arr);
    } else {
      setFilteredProjects(null);
    }
  }, [searchTerm]);
  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      <ToastContainer />
      {filteredProjects
        ? filteredProjects?.map((project, ind) => (
            <ProjectCard
              key={ind}
              project={project}
              ind={ind}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              user={user}
              handleView={handleView}
            />
          ))
        : projects?.map((project, ind) => (
            <ProjectCard
              key={ind}
              project={project}
              handleEdit={handleEdit}
              ind={ind}
              handleDelete={handleDelete}
              user={user}
              handleView={handleView}
            />
          ))}
    </div>
  );
}

function ProjectCard({
  project,
  ind,
  handleDelete,
  handleEdit,
  user,
  handleView,
}) {
  return (
    <div
      key={ind}
      className="w-full flex flex-col items-center cursor-pointer justify-center rounded-md  bg-secondary md:w-[450px] h-[375px] gap-4 p-4"
      onClick={(event) => {
        // if (event.target === event.currentTarget) {
        //   console.log("hello");
        // }
        handleView(project);
      }}
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%", cursor: "pointer" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          className="cursor-pointer"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden  bg-emerald-500">
          {project?.user?.photoURL ? (
            <img
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="font-semibold text-xl text-white">
              {project?.user?.email[0].toUpperCase()}
            </p>
          )}
        </div>
        {/* //////////////////// */}
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split("@")[0]}`}
          </p>
        </div>
        {/* ///////////////////////// */}
        <div className=" ml-auto flex gap-4">
          {user && user.uid === project.user.uid && (
            <MdEdit
              className="text-primaryText text-3xl hover:text-white cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleEdit(project);
              }}
            />
          )}
          {user && user.uid === project.user.uid && (
            <MdDelete
              className="text-primaryText text-3xl hover:text-white cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleDelete(project.id, project.user.uid);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Projects;
