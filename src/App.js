import React, { useState, useEffect } from "react";
import "./App.scss";
import Carousel, { CarouselItem } from "./components/carousel/Carousel";
import ProductForm from "./components/productForm/ProductForm";

function App() {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.json"
      );
      const json = await res.json();
      setProduct(json.product);
    };

    fetchProduct();
  }, []);
  if (Object.keys(product).length !== 0) {
    return (
      <div className="App">
        <Carousel>
          {product.images &&
            product.images.map((image) => {
              return (
                <CarouselItem key={image.id}>
                  <img src={image.src} />
                </CarouselItem>
              );
            })}
        </Carousel>
        <div className="product-head">
          <h3>{product.vendor}</h3>
          <h1>{product.title}</h1>
          <h2>Price</h2>
        </div>
        <ProductForm options={product.options} />
        <div dangerouslySetInnerHTML={{ __html: product.body_html }} />
      </div>
    );
  } else {
    return <div className="App"></div>;
  }
}

export default App;
