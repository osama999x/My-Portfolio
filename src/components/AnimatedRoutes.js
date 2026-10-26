import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import profile from "../data/profile";
import Landing from "../pages/landing/Landing";
import About from "../pages/about/About";
import Portfolio from "../pages/portfolio/Portfolio";
import Skills from "../pages/skills/Skills";
import Contact from "../pages/contact/Contact";
import PageNotFound from "../pages/404/PageNotFound";

const AnimatedRoutes = () => {
    const location = useLocation();
    const reduced = usePrefersReducedMotion();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
                {!reduced && (
                    <motion.div
                        className="route-curtain"
                        aria-hidden="true"
                        initial={{ x: 0 }}
                        animate={{ x: "105%" }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                    />
                )}
                <Routes location={location}>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/about"
                        element={
                            <About
                                name={profile.name}
                                location={profile.location}
                                email={profile.email}
                                availability={profile.availability}
                                brand={profile.brand}
                            />
                        }
                    />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route
                        path="/contact"
                        element={<Contact name={profile.name} location={profile.location} email={profile.email} />}
                    />
                    <Route path="/page-not-found" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="/page-not-found" />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
