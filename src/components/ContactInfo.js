import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const ContactInfo = ({ name, email, location }) => {

    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: true,
    });

    const whatsappNumber = "03215271247"; // Your WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/-/g, "")}`;

    return (
        <motion.div
            className="contactInfo"
            ref={ref}
            initial={{ x: "10vw", opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: "10vw", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <h4 className="contentTitle">Contact Information</h4>
            <p className="infoDescription">
                Open for opportunities. Let's connect and build something awesome together!
            </p>
            <ul className="listInfo">
                <li>
                    <div className="personalContactInfo">
                        <span className="infoIcon">
                            <i className="icon fa-solid fa-user"></i>
                        </span>
                        <div className="mediaWrap">
                            <h6 className="infoType">Name</h6>
                            <span className="infoValue">{name}</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="personalContactInfo">
                        <span className="infoIcon">
                            <i className="icon fa-solid fa-location-pin"></i>
                        </span>
                        <div className="mediaWrap">
                            <h6 className="infoType">Location</h6>
                            <span className="infoValue">{location}</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="personalContactInfo">
                        <span className="infoIcon">
                            <i className="icon fa-solid fa-phone"></i>
                        </span>
                        <div className="mediaWrap">
                            <h6 className="infoType">Contact No.</h6>
                            <span className="infoValue">{whatsappNumber}</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="personalContactInfo">
                        <span className="infoIcon">
                            <i className="icon fa-solid fa-envelope"></i>
                        </span>
                        <div className="mediaWrap">
                            <h6 className="infoType">Email</h6>
                            <span className="infoValue">
                                <a href={`mailto:${email}`}>{email}</a>
                            </span>
                        </div>
                    </div>
                </li>
                {/* WhatsApp Button */}
                <li>
                    <div className="personalContactInfo">
                        <span className="infoIcon">
                            <i className="icon fa-brands fa-whatsapp"></i>
                        </span>
                        <div className="mediaWrap">
                            <h6 className="infoType">WhatsApp</h6>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsappLink"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="WhatsApp"
                                    width="30"
                                    height="30"
                                    style={{ cursor: "pointer" }}
                                />
                                <span className="infoValue">Send Message on WhatsApp</span>

                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </motion.div>
    );
};

export default ContactInfo;
