import aboutMeImg from "../images/o1m.jpg";
import { motion } from "framer-motion";
import SocialIcons from "../components/SocialIcons";
import { useInView } from "react-intersection-observer";
const resume = `${process.env.PUBLIC_URL}/Osama_Khan_MERN.pdf`;

const AboutMe = ({ name, email, location, availability, brand }) => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = resume;
        link.download = "osama_khan_MERN.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <>

            <div className="aboutContainer container">
                <div className="row">
                    <motion.div
                        className="personalImage col-12 col-lg-4"
                        ref={ref}
                        initial={{ y: 16, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <img src={aboutMeImg} alt={name} className="img-top" />
                    </motion.div>
                    <motion.div
                        className="personalInfo col-12 col-lg-8"
                        ref={ref}
                        initial={{ y: 16, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >

                        <div className="contentContainer">
                            <h4>Nice to meet you</h4>
                            <h5>I am a full stack developer with 3+ years shipping Node.js, NestJS, and React products.</h5>
                            <div className="contentDescription">
                                <p>{brand}</p>
                            </div>
                            <div className="infoContainer">
                                <div className="row">
                                    <div className="col-12 col-md-6 info">
                                        <span>Name:</span>
                                        <p>{name}</p>
                                    </div>
                                    <div className="col-12 col-md-6 info">
                                        <span>Email:</span>
                                        <p>
                                            <a href={`mailto:${email}`}>{email}</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 info">
                                        <span>Location:</span>
                                        <p>{location}</p>
                                    </div>
                                    <div className="col-12 col-md-6 info">
                                        <span>Availability:</span>
                                        <p>{availability}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="statsRow">
                                <div>
                                    <strong>3+</strong>
                                    <span>Years shipping</span>
                                </div>
                                <div>
                                    <strong>20+</strong>
                                    <span>Products</span>
                                </div>
                                <div>
                                    <strong>4–5</strong>
                                    <span>Engineers led</span>
                                </div>
                            </div>
                            <div className="buttonContainer">
                                <button className="btn downloadCV" type="button" onClick={handleDownload}>
                                    Download Resume
                                </button>{" "}
                                <SocialIcons />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AboutMe;
