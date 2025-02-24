import React from "react";
import { MdOutlineTimer } from "react-icons/md";
import { Product } from "../models/Product";
import { cssFilter } from "../utils/common.utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );

  if(!product){
    return(<></>)
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <div className="flex-row flex-space-between">
          <p className="name">{product.name}</p>
          <div className="flex-row flex-center">
            <MdOutlineTimer fill="rgb(0, 159, 87)" />
            <p className="time-to-make">{product.timeToMake}</p>
          </div>
        </div>
        <p className="description">{product.description}</p>

        {/* Weight */}
        <div className="weight-quantity-container flex-row grey-color">
          {product?.weight && (
            <div>
              Net: <span>{product?.weight}</span>
            </div>
          )}
          {product?.quantityInStock && (
            <span>{product?.quantityInStock} pcs</span>
          )}
        </div>

        <div className="price">
          <span
            className={cssFilter({
              "strike-through grey-color": product && !!product.discount,
            })}
          >
            &#8377;{product?.price?.toFixed(2)}
          </span>
        </div>
        {product?.discount > 0 && (
          <div className="discounted-price">
            <span>&#8377;{discountedPrice?.toFixed(2)}</span>
          </div>
        )}

        {/* Add Button */}
        <button className="add-btn">Add</button>
      </div>
    </div>
  );
};

export default ProductCard;
