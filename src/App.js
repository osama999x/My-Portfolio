import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
    const personalDetails = {
        name: "Osama Khan",
        location: "Islamabad, Pakistan",
        email: "osamakhan99@hotmail.com",
        availability: "Open for work",
        brand:
            "Skilled MERN Stack Developer with 2 years of experience, specializing in React, Node.js, and NestJS. With nearly a year of hands-on experience in both React and Node.js, I have built scalable REST APIs, worked with GraphQL, implemented WebSockets for real-time applications, and developed microservices-based architectures. Passionate about innovation and problem-solving, I continuously seek new challenges to enhance my expertise in modern web and mobile application development."
    };

    return (
        <>
            <Header />
            <AnimatedRoutes personalDetails={personalDetails} />
        </>
    );
}

export default App;
