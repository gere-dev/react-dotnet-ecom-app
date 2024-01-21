import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import About from "./pages/about/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer
        position="bottom-right"
        toastClassName="dark-toast"
        autoClose={2000}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog/:id" element={<Catalog />} />
      </Routes>
    </>
  );
}

export default App;
