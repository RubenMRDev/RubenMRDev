import React from "react";

const Header = () => {
    return (
        <header className="bg-[#222222] text-white flex items-center justify-center p-4">
            <ul className="flex items-center justify-center space-x-6">
                <li><a href="#" className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text">Home</a></li>
                <li><a href="#" className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text">Projects</a></li>
                <li><a href="#" className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text">Experience</a></li>
                <li><a href="#" className="inline-block hover:bg-gradient-to-br hover:from-[#8000FF] hover:to-[#FF002D] hover:text-transparent hover:bg-clip-text">Contact</a></li>
            </ul>
        </header>
    )
}

export default Header;