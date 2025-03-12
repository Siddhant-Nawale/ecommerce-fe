export const templateComponentOptions: {
  name: string;
  description?: string;
  code: string;
  skeleton: any;
}[] = [
  {
    name: "Product List",
    description:
      "Displays a list of products with details such as name, price, and image.",
    code: "productList",
    skeleton: {
      type: "productList",
      tagList: [],
      listName: "Enter the list name here",
      allTagsMatch: false,
    },
  },
  {
    name: "Image Slider",
    description:
      "A carousel component that allows users to slide through multiple images.",
    code: "imageSlider",
    skeleton: {
      type: "imageSlider",
      urls: [],
      autoSlide: true,
      slideInterval: 2000,
    },
  },
  {
    name: "Image",
    description:
      "A simple image component for displaying single images with optional styling.",
    code: "image",
    skeleton: {
      url: "",
      type: "image",
    },
  },
  {
    name: "Image Viewer With List",
    description:
      "Displays a selected image alongside a list of thumbnails for previewing other images.",
    code: "imageViewerWithList",
    skeleton: {
      type: "imageViewerWithList",
      imageUrls: [],
      selectedImageUrl: "",
    },
  },
  {
    name: "Component Container",
    description:
      "A wrapper component used to organize and manage other components inside it.",
    code: "componentContainer",
    skeleton: {
      type: "componentContainer",
      orientation: "column",
      content: [],
    },
  },
];
