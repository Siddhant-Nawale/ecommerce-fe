import React from "react";
import { ProductListTemplate } from "../models/Product";
import ProductListRenderer from "./ProductListRenderer";
import ImageSlider from "./ImageSlider";
import { SingleImage } from "./BasicComponents";

const templateKeyComponentMap: { [key: string]: React.ComponentType<any> } = {
  productList: ProductListRenderer,
  imageSlider: ImageSlider,
  image: SingleImage,
};

// Define the props type for the component
type Props = {
  template: ProductListTemplate;
};

const TemplateRenderer: React.FC<Props> = ({ template }) => {
  return (
    <div className="flex-col flex-center dashboard-template-renderer">
      {template?.map((templateItem, index) => {
        const Component = templateKeyComponentMap[templateItem.type];

        if (Component) {
          const { type, ...restProps } = templateItem;
          return <Component key={index} {...restProps} />;
        }

        return null;
      })}
    </div>
  );
};

export default TemplateRenderer;
