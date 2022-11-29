import React, { useState, useEffect } from "react";
import Carousel, { CarouselItem } from "./components/carousel/Carousel";
import CartModal from "./components/cart/CartModal";
import ProductForm from "./components/productForm/ProductForm";
import { formatNumber } from "./utils";

function Product() {
    const [product, setProduct] = useState({});
    const [variantSelected, setVariant] = useState({});
    const [isOpen, setIsOpen] = useState(false)
  
    // Change Variant
    const changeVariant = (formData) => {
      const variant = product.variants.filter(
        (item) =>
          item.option1 === formData.option1 && item.option2 === formData.option2
      );
      if (variant.length > 0) {
        setVariant(variant[0]);
      }
    };
  
    useEffect(() => {
      const fetchProduct = async () => {
        const res = await fetch(
          "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.json"
        );
        const json = await res.json();
        setProduct(json.product);
        setVariant(json.product.variants[0]);
      };
  
      fetchProduct();
    }, []);
    // Return void when product is not loaded
    if (Object.keys(product).length === 0) {
      return <div className="App"></div>;
    }
  
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
          <h2>
            {formatNumber(variantSelected.price)}
            <span>{formatNumber(variantSelected.compare_at_price)}</span>
          </h2>
        </div>
        <ProductForm
          options={product.options}
          changeVariant={changeVariant}
          variant={variantSelected}
        />
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: product.body_html }}
        />
        <CartModal isOpen={isOpen} />
      </div>
    );
}

export default Product