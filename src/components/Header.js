import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import logo from "../images/OK_3_Logo-1.png";
import { useTheme } from "./visual/theme";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={scrolled ? "header header--scrolled" : "header"}>
            <img className="logo" width={"40px"} src={logo} alt="Osama Logo" />
            <div className="header-actions">
                <button
                    type="button"
                    className="theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        {theme === "dark" ? (
                            <path fill="currentColor" d="M12 4.2a.8.8 0 0 1 .8.8V7a.8.8 0 1 1-1.6 0V5a.8.8 0 0 1 .8-.8Zm0 12.2a.8.8 0 0 1 .8.8v1.8a.8.8 0 1 1-1.6 0V17a.8.8 0 0 1 .8-.8ZM4.2 12a.8.8 0 0 1 .8-.8H7a.8.8 0 1 1 0 1.6H5a.8.8 0 0 1-.8-.8Zm12.2 0a.8.8 0 0 1 .8-.8h1.8a.8.8 0 1 1 0 1.6H17a.8.8 0 0 1-.8-.8ZM6.4 6.4a.8.8 0 0 1 1.1 0l1.3 1.3a.8.8 0 1 1-1.1 1.1L6.4 7.5a.8.8 0 0 1 0-1.1Zm9.8 9.8a.8.8 0 0 1 1.1 0l1.3 1.3a.8.8 0 1 1-1.1 1.1l-1.3-1.3a.8.8 0 0 1 0-1.1ZM17.6 6.4a.8.8 0 0 1 0 1.1l-1.3 1.3a.8.8 0 1 1-1.1-1.1l1.3-1.3a.8.8 0 0 1 1.1 0ZM7.8 16.2a.8.8 0 0 1 0 1.1L6.5 18.6a.8.8 0 1 1-1.1-1.1l1.3-1.3a.8.8 0 0 1 1.1 0ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Z" />
                        ) : (
                            <path fill="currentColor" d="M14.6 3.2a.8.8 0 0 1 .3 1.1A7.2 7.2 0 1 0 19.7 14a.8.8 0 0 1 1.4.8A8.8 8.8 0 1 1 13.5 2.9a.8.8 0 0 1 1.1.3Z" />
                        )}
                    </svg>
                </button>
                <NavLinks />
            </div>
        </header>
    );
};

export default Header;
