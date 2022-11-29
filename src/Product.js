import React, { useState, useEffect, useContext } from "react";
import Carousel, { CarouselItem } from "./components/carousel/Carousel";
import CartModal from "./components/cart/CartModal";
import ProductForm from "./components/productForm/ProductForm";
import { CartDispatchContext } from "./context/cartContext/CartContext";
import { formatNumber } from "./utils";

function Product() {
  const dispatch = useContext(CartDispatchContext);
  const [product, setProduct] = useState({});
  const [variantSelected, setVariant] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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

  // Add to Cart
  const addCart = (qty) => {
    const item = {
      id_product: product.id,
      id_variant: variantSelected.id,
      name: product.title,
      variant: variantSelected.title,
      img: product.image.src,
      price: variantSelected.price,
      quantity: qty,
    }
    dispatch({
      type: "add-cart",
      cartItem: item
    })
    setIsOpen(true)
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
      <nav>
        <span onClick={() => setIsOpen(true)}>Cart</span>
      </nav>
      <Carousel>
        {product.images &&
          product.images.map((image) => {
            return (
              <CarouselItem key={image.id}>
                <img src={image.src} alt={`image_${image.alt}`} />
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
        addCart={addCart}
      />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: product.body_html }}
      />
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Product;
