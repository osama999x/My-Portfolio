import PageHeader from "../../components/PageHeader";
import SocialIcons from "../../components/SocialIcons";
import ContactInfo from "../../components/ContactInfo";

const Contact = ({ name, email, location }) => {
    return (
        <section className="contact">
            <PageHeader title="Contact" description="Get in touch" />
            <ContactInfo name={name} location={location} email={email} />
            <SocialIcons />
        </section>
    );
};

export default Contact;


