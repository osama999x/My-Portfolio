import { useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Draw from "../../components/Draw";
import SocialIcons from "../../components/SocialIcons";
import About from "../about/About";
import Portfolio from "../portfolio/Portfolio";
import Skills from "../skills/Skills";
import Contact from "../contact/Contact";

const personalDetails = {
    name: "Osama Khan",
    location: "Islamabad, Pakistan",
    email: "osamakhan99@hotmail.com",
    availability: "Open for work",
    brand:
        "Skilled MERN Stack Developer with 2 years of experience, specializing in React, Node.js, and NestJS. With nearly a year of hands-on experience in both React and Node.js, I have built scalable REST APIs, worked with GraphQL, implemented WebSockets for real-time applications, and developed microservices-based architectures. Passionate about innovation and problem-solving, I continuously seek new challenges to enhance my expertise in modern web and mobile application development."
};

const Landing = ({ name }) => {
    const aboutRef = useRef(null);
    const portfolioRef = useRef(null);
    const skillsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div style={{ scrollBehavior: "smooth" }}>
            <motion.section
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                    padding: "50px"
                }}
            >
                <Draw />
                <motion.div style={{ textAlign: "center", color: "#fff" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 style={{ fontWeight: "700", fontSize: "4rem", marginBottom: "20px" }}>{name}</h1>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("I'm a MERN/ Nest Developer...")
                                .pauseFor(1500)
                                .deleteAll()
                                .typeString("Code. ")
                                .pauseFor(500)
                                .typeString("Create. ")
                                .pauseFor(500)
                                .typeString("Innovate.")
                                .start();
                        }}
                        options={{
                            autoStart: true,
                            loop: true,
                            wrapperClassName: "typewriter-text",
                            cursorClassName: "typewriter-cursor"
                        }}
                    />
                </motion.div>
                <SocialIcons />
                <motion.button
                    onClick={() => scrollToSection(aboutRef)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        marginTop: "40px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "2rem"
                    }}
                >
                    ↓
                </motion.button>
            </motion.section>

            {/* About Section */}
            <motion.section ref={aboutRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <About name={name} location={personalDetails.location} brand={personalDetails.brand} email={personalDetails.email} availability={personalDetails.availability} />
            </motion.section>

            {/* Portfolio Section */}
            <motion.section ref={portfolioRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Portfolio />
            </motion.section>

            {/* Skills Section */}
            <motion.section ref={skillsRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Skills />
            </motion.section>

            {/* Contact Section */}
            <motion.section ref={contactRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Contact name={personalDetails.name} location={personalDetails.location} email={personalDetails.email} />
            </motion.section>
        </div>
    );
};

export default Landing;
