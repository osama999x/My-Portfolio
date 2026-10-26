import AboutMe from "../../components/AboutMe";
import Experience from "../../components/Experience";
import PageHeader from "../../components/PageHeader";

const About = ({ name, location, brand, email, availability }) => {

  return (

    <section className="about">
      <PageHeader title="About me" description="Full stack developer, currently leading delivery at Leo's International" />
      <AboutMe name={name} location={location} brand={brand} email={email} availability={availability} />
      <Experience />
    </section>

  );
};

export default About;
