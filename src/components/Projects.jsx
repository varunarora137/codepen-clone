import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

function Projects() {
  const projects = useSelector((state) => state.projects?.projects);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.search ? state.searchTerm?.search : ""
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
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
      {filteredProjects
        ? filteredProjects?.map((project, ind) => (
            <ProjectCard
              key={ind}
              project={project}
              ind={ind}
              handleDelete={handleDelete}
            />
          ))
        : projects?.map((project, ind) => (
            <ProjectCard
              key={ind}
              project={project}
              ind={ind}
              handleDelete={handleDelete}
            />
          ))}
    </div>
  );
}

function ProjectCard({ project, ind, handleDelete }) {
  return (
    <div
      key={ind}
      className="w-full flex flex-col items-center justify-center rounded-md cursor-pointer bg-secondary md:w-[450px] h-[375px] gap-4 p-4"
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: "hidden", height: "100%" }}
      >
        <iframe
          title="Result"
          srcDoc={project.output}
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex items-center justify-start gap-3 w-full">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
          {project?.user?.photoURL ? (
            <img
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="font-semibold text-xl text-white">
              {project?.ser?.email[0].toUpperCase()}
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
        <div className="cursor-pointer ml-auto">
          <MdDelete
            className="text-primaryText text-3xl"
            onClick={() => handleDelete(project.id)}
          />
        </div>
      </div>
    </div>
  );
}
export default Projects;
