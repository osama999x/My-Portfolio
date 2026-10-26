import { useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import SocialIcons from "../../components/SocialIcons";
import HeroStage from "../../components/visual/HeroStage";
import profile from "../../data/profile";
import About from "../about/About";
import Portfolio from "../portfolio/Portfolio";
import Skills, { skillsData } from "../skills/Skills";
import Contact from "../contact/Contact";

const Landing = () => {
    const aboutRef = useRef(null);
    const portfolioRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <motion.section
                className="hero"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <HeroStage />
                <motion.div
                    className="hero-copy"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    <h1 className="hero-title" aria-label={profile.name}>
                        {profile.name.split(" ").map((word, wordIndex) => (
                            <span className="hero-word" key={word}>
                                {word.split("").map((char, index) => (
                                    <span key={`${word}-${char}-${index}`} aria-hidden="true" style={{ animationDelay: `${(wordIndex * 6 + index) * 0.045}s` }}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>
                    <div className="hero-terminal">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("Full Stack Developer")
                                .pauseFor(1200)
                                .deleteAll()
                                .typeString("Node.js, NestJS, Next.js")
                                .pauseFor(1200)
                                .deleteAll()
                                .typeString("Technical Lead")
                                .pauseFor(1200)
                                .start();
                        }}
                        options={{
                            autoStart: true,
                            loop: true,
                            wrapperClassName: "typewriter-text",
                            cursorClassName: "typewriter-cursor"
                        }}
                    />
                    </div>
                    <p className="status-pill"><span className="status-dot" aria-hidden="true" />{profile.availability}</p>
                    <div className="hero-actions">
                        <button type="button" className="btn" onClick={() => scrollToSection(contactRef)}>Hire me</button>
                        <button type="button" className="btn ghost" onClick={() => scrollToSection(portfolioRef)}>View work</button>
                    </div>
                    <div className="hero-stats">
                        <div><strong>20+</strong><span>Products</span></div>
                        <div><strong>3+</strong><span>Years shipping</span></div>
                        <div><strong>4–5</strong><span>Engineers led</span></div>
                    </div>
                </motion.div>
                <SocialIcons />
                <motion.button
                    className="hero-scroll"
                    aria-label="Scroll to about"
                    onClick={() => scrollToSection(aboutRef)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                >
                    ↓
                </motion.button>
                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[...skillsData, ...skillsData].map((skill, index) => (
                            <span key={`${skill.name}-${index}`}>{skill.name}</span>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section ref={aboutRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <About name={profile.name} location={profile.location} brand={profile.brand} email={profile.email} availability={profile.availability} />
            </motion.section>

            {/* Portfolio Section */}
            <motion.section id="work" ref={portfolioRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Portfolio />
            </motion.section>

            {/* Skills Section */}
            <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Skills />
            </motion.section>

            <motion.section ref={contactRef} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Contact name={profile.name} location={profile.location} email={profile.email} />
            </motion.section>
            <footer className="site-footer">
                <p className="footer-name" aria-hidden="true">{profile.name}</p>
                <SocialIcons />
                <button type="button" className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    ↑
                </button>
            </footer>
        </div>
    );
};

export default Landing;
