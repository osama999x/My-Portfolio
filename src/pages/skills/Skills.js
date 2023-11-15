import React from 'react';
import './Skills.css';

const skillsData = [
    { name: 'HTML/ HTML5', proficiency: 65, bgColor: 'linear-gradient(83deg, #736DFF, rgb(170 135 212))' },
    { name: 'CSS/ CSS3/ SCSS', proficiency: 65, bgColor: 'linear-gradient(83deg, #44DEC5, #4EBCFA)' },
    { name: 'Express', proficiency: 85, bgColor: 'linear-gradient(83deg, #DEB544, #D5C896)' },
    { name: 'JavaScript - ES5/ES6', proficiency: 65, bgColor: 'linear-gradient(83deg, #F7C596, #FF8886)' },
    { name: 'Node Mailer', proficiency: 70, bgColor: 'linear-gradient(83deg, #c97983, rgb(186 35 110))' },
    { name: 'Sequelize', proficiency: 70, bgColor: 'linear-gradient(83deg, #88ffba, #048234)' },
    { name: 'Type ORM', proficiency: 65, bgColor: 'linear-gradient(83deg, #b8933e, #f17c38)' },
    { name: 'REST API`s ', proficiency: 85, bgColor: 'linear-gradient(83deg, #44DEC5, #4EBCFA)' },
    { name: 'Bootstrap', proficiency: 50, bgColor: 'linear-gradient(83deg, #67c4cd, rgb(0 13 117))' },
    { name: 'MySQL', proficiency: 70, bgColor: 'linear-gradient(83deg, #DEB544, #D5C896)' },
    { name: 'Mongo Db', proficiency: 75, bgColor: 'linear-gradient(83deg, #F7C598, #FF8886)' },
    { name: 'Microsoft Azure', proficiency: 70, bgColor: 'linear-gradient(83deg, #f0ff8f, #e1f43b)' },
    { name: 'Git/ Git Hub', proficiency: 70, bgColor: 'linear-gradient(83deg, #f98a9c, #ff1e1a)' },
    { name: 'Heroku/ Netlify', proficiency: 70, bgColor: 'linear-gradient(83deg, #8e8e8e, #564e67)' },
    { name: 'TypeScript', proficiency: 60, bgColor: 'linear-gradient(83deg, #88ffba, #564e67)' }

];

const Skills = () => {  
    return (
        <div className="skills-container">
            <h3 className="pageTitlee resp" style={{textAlign:"center"}}>SKILLS</h3>
            <br />
            <div className="skills-list">
                {skillsData.map((skill, index) => (
                    <div className="skill-card" key={index} style={{ background: "linear-gradient(83deg, #44DEC5, #4EBCFA)" }}>
                        <div className="skill-content">
                            <h4>{skill.name}</h4>
                            <div className="proficiency-bar" style={{ width: `${skill.proficiency}%` }}></div>
                            <div className="proficiency-text textNone">{skill.proficiency}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Skills;
