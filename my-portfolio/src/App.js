import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const App = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [showCursor, setShowCursor] = useState(true); // For blinking cursor effect
    const fullText = "Andy Lu";
    const typingSpeed = 100; // Speed in milliseconds
    const indexRef = useRef(0); // Keep track of index without triggering re-renders
    const textRef = useRef(""); // Store typed text independently

    useEffect(() => {
        setTypedText(""); // Reset text before typing starts
        textRef.current = ""; // Reset ref value

        // Typing effect setup
        const typingInterval = setInterval(() => {
            if (indexRef.current < fullText.length) {
                textRef.current += fullText.charAt(indexRef.current);
                setTypedText(textRef.current);
                indexRef.current += 1;
            } else {
                clearInterval(typingInterval);
                // Start blinking cursor effect after typing is done
                setInterval(() => {
                    setShowCursor((prev) => !prev);
                }, 500);
            }
        }, typingSpeed);

        // Scroll event listener setup
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Cleanup function
        return () => {
            clearInterval(typingInterval);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fullText, typingSpeed]); // Depend on fullText and typingSpeed

    const handleMouseDown = () => {
        setIsPressed(true); // Shrinks image when clicked
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000); // Reset spin after 1 second
    };

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
            <section id="home" className="section home-section">
                <div className="home-content">
                    <img 
                        src="/self_photo.jpg" 
                        alt="My Portrait" 
                        className={`profile-photo ${isPressed ? "shrink" : ""} ${isSpinning ? "spin" : ""}`} 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}  // Mobile support
                        onTouchEnd={handleMouseUp} // Mobile support
                    />
                    <div className="text-container">
                        <h1 className="typewriter">
                            {typedText}
                            {showCursor && <span className="cursor">|</span>}
                        </h1>
                        <p>Welcome!</p>
                    </div>
                </div>
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
