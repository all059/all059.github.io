import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="App">
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? "scrolled fade-in" : ""}`}>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
                <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                    <li><button onClick={() => scrollToSection("home")}>Home</button></li>
                    <li><button onClick={() => scrollToSection("about")}>About</button></li>
                    <li><button onClick={() => scrollToSection("projects")}>Projects</button></li>
                    <li><button onClick={() => scrollToSection("hobbies")}>Hobbies</button></li>
                    <li><button onClick={() => scrollToSection("contact")}>Contact</button></li>
                </ul>
            </nav>


            {/* Sections */}
            <section id="home" className="section">
                <h1>Welcome to My Portfolio</h1>
                <p>This is the home section.</p>
            </section>

            <section id="about" className="section">
                <h1>About Me</h1>
                <p>Here's a little about me...</p>
            </section>

            <section id="projects" className="section">
                <h1>My Projects</h1>
                <p>Check out some of my work here.</p>
            </section>

            <section id="hobbies" className="section">
                <h1>Hobbies</h1>
                <p>Here are some of my hobbies.</p>
            </section>

            <section id="contact" className="section">
                <h1>Contact Me</h1>
                <p>You can reach me via email at myemail@example.com.</p>
            </section>

            {/* Back to Top Button */}
            {scrolled && (
                <button className="back-to-top" onClick={scrollToTop}>
                    ↑
                </button>
            )}
        </div>
    );
};

export default App;
