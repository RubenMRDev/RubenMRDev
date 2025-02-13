import React from "react";

const ContactMe = ({ language }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30 bg-[#1A1A1A] rounded-lg shadow-lg p-8" id="contact-me">
      <h2 className="text-transparent text-center font-bold text-2xl mb-6 bg-gradient-to-br from-[#8000FF] to-[#FF002D] bg-clip-text">
        {language === 'en' ? 'Contact Me' : 'Contáctame'}
      </h2>
      <p className="text-[#C5C5C5] mb-6 text-center">
        {language === 'en' ? 'If you have any questions or inquiries, please feel free to contact me through the following channels:' : 'Si tienes alguna pregunta o consulta, no dudes en contactarme a través de los siguientes canales:'}
      </p>
      <div className="flex justify-center space-x-6">
        <a
          href="https://www.linkedin.com/in/rub%C3%A9n-mart%C3%ADn-ruiz-985397252/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 fill-current"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.2c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 11.2h-3v-5.5c0-1.32-.02-3.03-1.84-3.03-1.84 0-2.12 1.44-2.12 2.93v5.6h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z" />
          </svg>
        </a>
        <a
          href="https://github.com/RubenMRDev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 fill-current"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.727-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.005-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.139 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.657 1.653.245 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .321.21.694.825.576 4.77-1.588 8.205-6.088 8.205-11.386 0-6.63-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ContactMe;
