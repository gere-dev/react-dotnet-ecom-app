import { Route, Routes, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Catalog from "./components/catalog/Catalog";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
