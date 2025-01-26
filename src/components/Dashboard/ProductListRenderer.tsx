import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Product, TagListObject } from "../../models/Product";
import apiService from "../../services/apiService";
import ProductCard from "./ProductCard";

type Props = {
  listName?: string;
  tagList: string[];
  verticalView?: boolean;
};

const ProductListRenderer: React.FC<Props> = ({
  listName = "",
  tagList,
  verticalView = false,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreActive, setIsLoadMoreActive] = useState(true);
  const CARDS_TO_SHOW = 4;

  // Fetch products
  const fetchProducts = async (offset = 0) => {
    setIsLoading(true);
    const tagListObject: TagListObject[] = [
      {
        tagList,
        pagination: { offset },
      },
    ];

    const result = await apiService.getProductList(tagListObject);
    if (result === null) {
      setIsLoading(false);
      setIsLoadMoreActive(false);
    }
    const newProducts: any = Object.values(result).flat();
    setProducts((prev) =>
      offset === 0 ? newProducts : [...prev, ...newProducts]
    );
    setIsLoading(false);
  };

  // Fetch initial products on tagList change
  useEffect(() => {
    fetchProducts();
  }, [tagList]);

  const handleLoadMore = () => fetchProducts(products.length);

  const handleScrollRight = () => {
    if (currentIndex + CARDS_TO_SHOW < products.length) {
      setCurrentIndex(currentIndex + CARDS_TO_SHOW);
    }
  };

  const handleScrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - CARDS_TO_SHOW);
    }
  };

  const displayedProducts = verticalView
    ? products
    : products.slice(currentIndex, currentIndex + CARDS_TO_SHOW);

  return (
    <div
      className={`product-list-component-wrapper ${
        verticalView ? "vertical" : ""
      }`}
    >
      <p className="title">{listName}</p>
      <div className="product-list-container">
        {!verticalView && currentIndex > 0 && (
          <div
            className="scroll-arrow flex-row flex-center left"
            onClick={handleScrollLeft}
          >
            <FaChevronLeft />
          </div>
        )}
        <div
          className={`product-cards-wrapper ${
            verticalView ? "vertical-layout" : ""
          }`}
        >
          {displayedProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        {!verticalView &&
          (currentIndex + CARDS_TO_SHOW < products.length ? (
            <div
              className="scroll-arrow flex-row flex-center right"
              onClick={handleScrollRight}
            >
              <FaChevronRight />
            </div>
          ) : (
            <>
              {isLoadMoreActive && (
                <button
                  className="load-more-button flex-row flex-center"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              )}
            </>
          ))}
      </div>
      {verticalView && (
        <div className="load-more-container">
          {isLoadMoreActive && (
            <button
              className="load-more-button"
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListRenderer;
