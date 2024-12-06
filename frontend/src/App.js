import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarCom from "./components/NavbarCom";
import Contact from "./components/Contact";
function App() {
  return (
    <div>
      <NavbarCom />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
