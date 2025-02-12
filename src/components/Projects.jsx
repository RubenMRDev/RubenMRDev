import React from "react";

const projects = [
  {
    title: "Wheel Of Doom",
    description: "Only One Escapes is a dynamic web-based project inspired by the Wheel of Doom concept. Players' fates are decided through dice rolls, and the participant with the highest score wins the combat.",
    image: "images/projects/onlyoneescapes.webp",
    previewLink: "https://only-one-escapes-project.vercel.app/",
    githubLink: "https://github.com/RubenMRDev/OnlyOneEscapes",
  },
  {
    title: "MHA Wiki",
    description: "MHA Wiki is a web page that displays informational cards about characters from the anime My Hero Academia. The page uses Bootstrap for the card designs and retrieves character data from a JSON file, offering a visually appealing and accessible interface.",
    image: "images/projects/mhawiki.webp",
    previewLink: "https://mha-wiki.vercel.app/",
    githubLink: "https://github.com/RubenMRDev/MHAWiki",
  },
  // Añade más proyectos según sea necesario
];

const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30">
      <h2 className="text-transparent text-center font-bold text-2xl mb-8 bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-[#C5C5C5] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#1A1A1A] text-center flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-[#C5C5C5] mb-2">
              {project.title}
            </h3>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            
            <p className="text-[#C5C5C5] mb-4">{project.description}</p>
            <div className="flex space-x-4">
              <a
                href={project.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-transparent text-[#7297ed] rounded-full border border-[#7297ed] hover:bg-[#7297ed] hover:text-black transition-all duration-300 ease-in-out"
              >
                Preview
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#9f72ed] text-black rounded-full border border-[#9f72ed] hover:bg-transparent hover:text-[#9f72ed] transition-all duration-300 ease-in-out"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
