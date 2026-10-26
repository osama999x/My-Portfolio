import "./Experience.css";

const roles = [
  {
    title: "Full Stack Developer",
    company: "Leo's International",
    dates: "Oct 2025 — Present",
    location: "Islamabad, Pakistan",
    points: [
      "Technical lead for a team of 4–5. I coordinate delivery, unblock engineering, and keep client and management conversations tied to the work.",
      "Design REST APIs with JWT and role-based access, backed by PostgreSQL and MongoDB.",
      "Run production on AWS with Linux, Nginx, and PM2, including load balancing across instances.",
      "Shipped the LEOS broker portal, with Zoho CRM and WhatsApp for broker onboarding and lead handling, plus the public LEOS site.",
      "Built backend flows for the Leos app — unit purchases, installment tracking, and payments — and supported the Prive community platform.",
    ],
  },
  {
    title: "Backend Engineer",
    company: "Fexen Smart Solutions — Extsy",
    dates: "May 2025 — Oct 2025",
    location: "Islamabad, Pakistan",
    points: [
      "Backend for a trading platform covering spot, futures, demo, and copy trading.",
      "Multi-wallet support across Ethereum, Arbitrum, Optimism, and Bitcoin, with Binance WebSocket and REST for live markets and order execution.",
      "Sumsub KYC plus JWT, MFA, and 2FA. Socket.IO carries live trading and wallet updates.",
      "Crypto-backed virtual cards. Services run on Node.js, NestJS, PostgreSQL, and MongoDB, deployed on AWS.",
    ],
  },
  {
    title: "MERN Stack Developer",
    company: "App In Snap",
    dates: "May 2023 — May 2025",
    location: "Islamabad, Pakistan",
    points: [
      "Backend systems in Node.js, NestJS, and Express, including REST and SOAP integrations.",
      "PostgreSQL, MySQL, MSSQL, and MongoDB, with React on the client and JWT for auth.",
      "Real-time features with Socket.IO across banking, railways, ride sharing, agriculture, and government products.",
    ],
  },
];

const Experience = () => {
  return (
    <section className="experience" id="experience">
      <p className="pageDescription">Where I have worked</p>
      <h3 className="pageTitle">Experience</h3>
      <div className="roleList">
        {roles.map((role) => (
          <article className="role" key={role.company}>
            <div className="roleHeader">
              <div>
                <h4>{role.title}</h4>
                <p className="roleCompany">{role.company}</p>
              </div>
              <div className="roleMeta">
                <span>{role.dates}</span>
                <span>{role.location}</span>
              </div>
            </div>
            <ul>
              {role.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="education">
        <h4>Education</h4>
        <p className="roleCompany">Bachelors in Computer Science — Bahria University</p>
        <p className="roleMeta">Jan 2019 — Feb 2023 · Islamabad, Pakistan</p>
      </div>
    </section>
  );
};

export default Experience;
