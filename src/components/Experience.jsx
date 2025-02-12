import React from "react";

const Experience = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30">
      <h2 className="text-transparent text-center font-bold text-2xl mb-8 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text">
        Experience
      </h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between  p-6 rounded-lg ">
        <div className="flex items-center gap-4">
          <img
            src="images/experience/sevimanager.webp"
            alt="Sevimanager Logo"
            className="h-12 w-12 rounded-full"
          />
          <h3 className="text-lg font-semibold text-[#C5C5C5]">
            Intern Sevimanager
          </h3>
        </div>

        <p className="text-[#C5C5C5] text-sm md:text-base mt-2 md:mt-0">
        mar. 2023 - jun. 2023
        </p>
      </div>

      <p className="text-[#C5C5C5] text-sm md:text-base mt-4">
        In this job, I significantly improved my teamwork skills and data
        management when handling them for a sports application.
      </p>
    </div>
  );
};

export default Experience;
