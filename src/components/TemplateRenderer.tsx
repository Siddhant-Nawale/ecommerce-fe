import React from "react";
import ImageSlider from "./ImageSlider";
import ProductListRenderer from "./ProductListRenderer";
import { SingleImage } from "./common/BasicComponents";
import ComponentContainer from "./common/ComponentContainer";
import { ImageViewerWithList } from "./common/ImageViewerWithList";

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
    <div className="flex-col flex-align-center dashboard-template-renderer">
      <Component {...template} />
    </div>
  );
};

export default TemplateRenderer;
