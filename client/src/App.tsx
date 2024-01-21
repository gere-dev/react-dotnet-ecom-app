import { useEffect, useState } from "react";

import "./App.css";
import { Products } from "./products";
import Catalog from "./components/catalog/Catalog";
import Header from "./components/header/Header";

function App() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:5027/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <div>
        <Header />
        <Catalog products={products} handleAddProduct={() => {}} />
      </div>
    </div>
  );
}

export default App;
