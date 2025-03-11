import React from "react";
import { ProductListTemplate } from "../models/Product";
import ProductListRenderer from "./ProductListRenderer";
import ImageSlider from "./ImageSlider";
import { SingleImage } from "./common/BasicComponents";
import { ImageViewerWithList } from "./common/ImageViewerWithList";
import ComponentContainer from "./common/ComponentContainer";

const templateKeyComponentMap: { [key: string]: React.ComponentType<any> } = {
  productList: ProductListRenderer,
  imageSlider: ImageSlider,
  image: SingleImage,
  imageViewerWithList: ImageViewerWithList,
  componentContainer: ComponentContainer,
};

// Define the props type for the component
type Props = {
  template: {
    type: string;
    [key: string]: any;
  };
};

const TemplateRenderer: React.FC<Props> = ({ template }) => {
  const Component = templateKeyComponentMap[template?.type];

  if (!Component) {
    return null;
  }

  return (
    <div className="flex-col flex-center dashboard-template-renderer">
      <Component {...template} />
    </div>
  );
};

export default TemplateRenderer;
