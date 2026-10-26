import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";
import VisualChrome from "./components/visual/VisualChrome";

function App() {
    return (
        <VisualChrome>
            <Header />
            <AnimatedRoutes />
        </VisualChrome>
    );
}

export default App;
