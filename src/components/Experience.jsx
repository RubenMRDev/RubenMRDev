import React from "react";

const Experience = ({ language }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30" id="experience">
      <h2 className="text-transparent text-center font-bold text-2xl mb-8 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text">
        {language === 'en' ? 'Experience' : 'Experiencia'}
      </h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg">
        <div className="flex items-center gap-4">
          <img
            src="images/experience/sevimanager.webp"
            alt={language === 'en' ? "Sevimanager Logo" : "Logo de Sevimanager"}
            className="h-12 w-12 rounded-full"
          />
          <h3 className="text-lg font-semibold text-[#C5C5C5]">
            {language === 'en' ? 'Intern Sevimanager' : 'Practicas en Sevimanager'}
          </h3>
        </div>

        <p className="text-[#C5C5C5] text-lg mt-2 md:mt-0">
          {language === 'en' ? 'Mar. 2023 - Jun. 2023' : 'mar. 2023 - jun. 2023'}
        </p>
      </div>

      <p className="text-[#C5C5C5] text-lg  mt-4">
        {language === 'en'
          ? 'In this job, I significantly improved my teamwork skills and data management when handling them for a sports application.'
          : 'En este trabajo, mejoré significativamente mis habilidades de trabajo en equipo y gestión de datos al manejarlos para una aplicación deportiva.'}
      </p>
    </div>
  );
};

export default Experience;
