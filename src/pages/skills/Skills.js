import { useEffect, useState } from 'react';

export const skillsData = [
    { name: 'Node.js', proficiency: 92 },
    { name: 'NestJS', proficiency: 90 },
    { name: 'Express.js', proficiency: 88 },
    { name: 'JavaScript', proficiency: 88 },
    { name: 'TypeScript', proficiency: 84 },
    { name: 'React.js', proficiency: 80 },
    { name: 'Next.js', proficiency: 82 },
    { name: 'REST & WebSockets', proficiency: 92 },
    { name: 'PostgreSQL', proficiency: 86 },
    { name: 'MongoDB', proficiency: 84 },
    { name: 'MySQL', proficiency: 78 },
    { name: 'Socket.IO', proficiency: 84 },
    { name: 'AWS', proficiency: 80 },
    { name: 'Prisma & TypeORM', proficiency: 78 },
    { name: 'Redis', proficiency: 74 },
    { name: 'JWT & API Security', proficiency: 88 },
    { name: 'Nginx & PM2', proficiency: 80 },
    { name: 'Git & CI/CD', proficiency: 86 },
    { name: 'Tailwind CSS', proficiency: 74 },
    { name: 'Stripe & PayPal', proficiency: 76 },
    { name: 'Python', proficiency: 80 },
    { name: 'PySide6', proficiency: 76 },
    { name: 'SQLite', proficiency: 78 },
    { name: 'OpenCV', proficiency: 72 },
    { name: 'PyMuPDF', proficiency: 74 }
];

const Skills = () => {
    const [animatedBars, setAnimatedBars] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setAnimatedBars(skillsData.reduce((acc, skill) => {
                acc[skill.name] = skill.proficiency;
                return acc;
            }, {}));
        }, 300); // Smooth animation delay
    }, []);

    return (
        <div className="skills-container">
            <h3 className="pageTitlee">SKILLS</h3>
            <div className="skills-list">
                {skillsData.map((skill, index) => (
                    <div className="skill-card" key={index}>
                        <div className="skill-content">
                            <h4>{skill.name}</h4>
                            <div className="skill-track">
                                <div
                                    className="proficiency-bar"
                                    style={{ width: `${animatedBars[skill.name] || 0}%` }}
                                ></div>
                            </div>
                            <div className="proficiency-text">{skill.proficiency}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
