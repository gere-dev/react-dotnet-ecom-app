import { useEffect, useState } from "react";

import "./App.css";
import { Products } from "./products";

function App() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch('http://localhost:5027/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])





  return <div>{
    products.map((product) => (
      <li key={product.id}>{product.name}</li>
    ))
  }</div>;
}

export default App;
