import React from "react";
import { useParams } from "react-router-dom";

const Catalog = () => {
  const { id } = useParams();
  return <div>Product {id}</div>;
};

export default Catalog;
