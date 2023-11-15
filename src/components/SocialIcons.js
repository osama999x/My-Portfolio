const SocialIcons = () => {
  const styles = {
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  return (
    <div className="socialIcons" style={styles.socialIcons}>
      <a className="icon" style={styles.icon} href="https://github.com/osama999x">
        <i className="fa-brands fa-github" aria-hidden="true" title="Hammad Ahsan' GitHub Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://www.linkedin.com/in/osamakhan999/">
        <i className="fa-brands fa-linkedin" aria-hidden="true" title="Hammad Ahsan' LinkedIn Profile"></i>
      </a>
      <a className="icon" style={styles.icon} href="https://instagram.com/osama_khan88?igshid=MzMyNGUyNmU2YQ==">
        <i className="fa-brands fa-instagram" aria-hidden="true" title="Hammad Ahsan' Instagram Profile"></i>
      </a>
      {/* <a className="icon" style={styles.icon} href="">
        <i className="fa-brands fa-twitter" aria-hidden="true" title="Hammad Ahsan' Twitter Profile"></i>
      </a> */}
    </div>
  );
};

export default SocialIcons;
