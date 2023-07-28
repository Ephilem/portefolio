import './App.css'
import {Navbar} from "./components/Navbar.tsx";
import {Home} from "./pages/home/Home.tsx";
import {useState} from "react";

function App() {
    const [activeSection, setActiveSection] = useState(0);


    return (
    <>
        <Navbar activeButtonIndex={activeSection}/>
        <Home onSectionChange={setActiveSection}/>
    </>
  )
}

export default App
