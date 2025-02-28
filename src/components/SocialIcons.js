const SocialIcons = () => {
    const styles = {
        socialIcons: {
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
            position: "relative", // Ensures it's not blocked
            zIndex: 10, // Moves it above overlays
        },
        icon: {
            textDecoration: "none",
            fontSize: "24px",
            padding: "10px",
            transition: "0.2s ease-in-out",
            color: "#fff",
            cursor: "pointer", // Ensures clickability
            pointerEvents: "auto", // Ensures clicks are registered
        },
    };

    return (
        <div className="socialIcons" style={styles.socialIcons}>
            <a style={styles.icon} href="https://github.com/osama999x" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github" aria-hidden="true" title="GitHub Profile"></i>
            </a>
            <a style={styles.icon} href="https://www.linkedin.com/in/osamakhan999/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin" aria-hidden="true" title="LinkedIn Profile"></i>
            </a>
            <a style={styles.icon} href="https://instagram.com/osama_khan88?igshid=MzMyNGUyNmU2YQ==" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram" aria-hidden="true" title="Instagram Profile"></i>
            </a>
        </div>
    );
};

export default SocialIcons;
