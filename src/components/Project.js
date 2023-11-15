import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import closeModal from "../images/close.svg";

const Project = ({ technologies, title, image, color, id, github, deployed, description }) => {

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const variants = {
    hidden: { x: id % 2 === 0 ? "10vw" : "-10vw", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  Modal.setAppElement("#root");

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (

    <motion.div
      ref={ref}
      className="col-sm-12 col-lg-6"
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div
        style={{ backgroundColor: color }}
        className="projectCard d-flex align-items-center justify-content-center p-5"
        onClick={handleOpenModal}
      >
        <div className="textWrap col-6 d-flex flex-column justify-content-center align-items-center m-5">
          {/* <p className="tech">
            <em>{technologies}</em>
          </p> */}
          <h3 className="projectTitle">{title}</h3>
          <span className="viewWork">Project Details &#8594;</span>
        </div>
        <div className="imageContainer col-6 d-flex align-items-center justify-content-center">
          <img src={image} alt="Laptop displaying the application" />
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modal-responsive"
        style={{
          content: {
            backgroundColor: "#131a22",
            color: "#9f9f9f",
            padding: "40px", 
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            maxWidth: "50%",
            maxHeight: "60%",
          },
          overlay: {
            zIndex: "9999",
            overflow: "hidden",
            backgroundColor: "rgba(19, 26, 34, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
        
      >

        <div className="container modal">
          <img src={closeModal} className="closeMenu " onClick={handleCloseModal} alt="Close"></img>
          <h3 className="modalTitle">{title}</h3>
          <h5 className="modalTitle">{technologies}</h5>
          <div className="projectDescription">
            {description.split("\n").map((paragraph, i) => (
              <p key={{ i }}>
                {paragraph}
                <br />
                <br />
              </p>
            ))}
          </div>

          <div className="modalBtns">
            <>
              {github ?
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  className="btn"
                  onClick={() => (window.location.href = github)}
                >

                  Get Code
                </motion.button>
                : null}
              {deployed ?
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  className="btn"
                  onClick={() => (window.location.href = deployed)}
                >
                  View Site
                </motion.button>
                : null}
            </>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Project;
