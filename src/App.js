import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  const personalDetails = {
    name: "Osama Khan",
    location: "Islamabad, Pakistan",
    email: "osamakhan99@hotmail.com",
    availability: "Open for work",
    brand:
      "Highly Skilled Node JS Developer with over 1 year of experience. Currently Working as a Node.Js Developer at App-In-Snap with over 1 year of experience, having a strong expertise in building REST API's, for web & Mobile Applications. Committed to contributing to the thriving tech industry, I embrace new challenges and seek opportunities for continuous professional growth"
  };

  return (
    <>
      <Header />
      <AnimatedRoutes personalDetails={personalDetails} />
    </>
  );
}

export default App;
