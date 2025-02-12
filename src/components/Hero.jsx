import React from "react";

const Hero = () => {
    return (
        <div className="mt-20">
            <div className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] rounded-full p-1 h-40 w-40 mx-auto">
                <img className="rounded-full h-full w-full" src="src/assets/profile.webp" alt="" />
            </div>
            <p className="text-center text-white mt-4 text-4xl font">
                <span className="block c-bold-text">Hey! I'm <span className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] text-transparent bg-clip-text">Ruben</span></span>
                <span className="block c-bold-text text-3xl mt-2">Web Developer</span>
            </p>
            <div className="mt-8 mx-4 md:mx-20 lg:mx-80 text-sm">
                <p className="text-[#C5C5C5]">
                    Hi, I'm Ruben! I've just completed my degree in 
                    <span className="bg-gradient-to-br from-[#8000FF] to-[#FF002D] text-transparent bg-clip-text"> Web Development</span>, 
                    and I'm passionate about exploring new working methods. I'm always eager to learn something new and expand my skills in the ever-evolving world of technology.
                </p>
            </div>

            <div className="text-white flex items-center justify-center gap-x-4 mt-8">
                <button onClick={() => window.location.href = "#contact-me"} className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                    Get In Touch
                </button>
                <button onClick={() => window.open("src/assets/rubenMartinRuizCV.pdf", "_blank")} className="border border-white bg-white text-black px-4 py-2 rounded-full hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out">
                    Download CV
                </button>
            </div>
        </div>
    )
}

export default Hero;
