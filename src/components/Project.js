import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import { useRef, useState } from "react";
import closeModal from "../images/close.svg";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Project = ({ technologies, title, image, color, github, deployed, portal, description, role }) => {

    const [ref, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const variants = {
        hidden: { y: 16, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    Modal.setAppElement("#root");

    const [showModal, setShowModal] = useState(false);
    const cardRef = useRef(null);
    const reduced = usePrefersReducedMotion();
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const tilt = (event) => {
        const card = cardRef.current;
        if (!card || reduced || !window.matchMedia("(pointer: fine)").matches) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
        card.style.setProperty("--gx", `${x * 100}%`);
        card.style.setProperty("--gy", `${y * 100}%`);
    };

    const resetTilt = () => {
        if (cardRef.current) cardRef.current.style.transform = "";
    };

    return (
        <motion.div
            ref={ref}
            className="col-sm-12 col-lg-6"
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.98 }}
        >
            <div
                ref={cardRef}
                role="button"
                tabIndex={0}
                data-cursor="View"
                aria-label={`${title} project details`}
                style={{ background: "#121316", boxShadow: `inset 4px 0 0 ${color}` }}
                className="projectCard d-flex align-items-center justify-content-center p-5"
                onClick={handleOpenModal}
                onMouseMove={tilt}
                onMouseLeave={resetTilt}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleOpenModal();
                    }
                }}
            >
                <span className="project-glare" aria-hidden="true" />
                <span className="bracket bracket-tl" aria-hidden="true" />
                <span className="bracket bracket-tr" aria-hidden="true" />
                <span className="bracket bracket-bl" aria-hidden="true" />
                <span className="bracket bracket-br" aria-hidden="true" />
                <div className="textWrap col-6 d-flex flex-column justify-content-center align-items-center m-5">
                    {role && <span className="projectRole">{role}</span>}
                    <h3 className="projectTitle">{title}</h3>
                    {technologies && <p className="tech-line">{technologies}</p>}
                    <span className="viewWork">{deployed ? "Live project" : "Project Details"} &#8594;</span>
                </div>
                <div className="imageContainer col-6 d-flex align-items-center justify-content-center">
                    <img src={image || "projectImages/web.webp"} alt="Laptop displaying the application" />
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                className="modal-responsive"
                style={{
                    content: {
                        backgroundColor: "#121316",
                        color: "#9aa0a8",
                        padding: "clamp(16px, 4vw, 40px)",
                        display: "flex",
                        flexDirection: "column",
                        margin: "auto",
                        width: "min(720px, 92vw)",
                        maxHeight: "80vh",
                        overflow: "auto",
                    },
                    overlay: {
                        zIndex: "9999",
                        backgroundColor: "rgba(19, 26, 34, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <div className="container modal">
                    <img src={closeModal} className="closeMenu" onClick={handleCloseModal} alt="Close" />
                    <h3 className="modalTitle">{title}</h3>
                    <h5 className="modalTitle">{technologies}</h5>
                    <div className="projectDescription">
                        {description.split("\n").map((paragraph, i) => (
                            <p key={i}>
                                {paragraph}
                                <br />
                                <br />
                            </p>
                        ))}
                    </div>

                    <div className="modalBtns">
                        {github && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1 }}
                                className="btn"
                                onClick={() => window.open(github, "_blank", "noopener,noreferrer")}
                            >
                                Get Code
                            </motion.button>
                        )}
                        {deployed && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1 }}
                                className="btn"
                                onClick={() => window.open(deployed, "_blank", "noopener,noreferrer")}
                            >
                                View Site
                            </motion.button>
                        )}
                        {portal && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 1 }}
                                className="btn"
                                onClick={() => window.open(portal, "_blank", "noopener,noreferrer")}
                            >
                                Admin Portal
                            </motion.button>
                        )}
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default Project;
