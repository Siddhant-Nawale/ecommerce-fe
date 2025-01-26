import { ProductListTemplate } from "../models/Product";

// Define the structure for the product list
export const productListTemplate: ProductListTemplate = [
  {
    type: "imageSlider",
    urls: [
      "https://wallpapers.com/images/featured/anime-scenery-ahd1eqpvwq8aoofp.jpg",
      "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645903.jpg",
      "https://wallpapers.com/images/hd/beautiful-anime-scenery-7xhiy3ga0wvtxe2b.jpg",
      "https://cdn.pixabay.com/photo/2024/05/26/15/27/anime-8788959_640.jpg",
    ],
    autoSlide: true,
    slideInterval: 2000,
  },
  { type: "productList", listName: "Fruit Warrior", tagList: [] },
  {
    type: "image",
    url: "https://dev.epicgames.com/community/api/documentation/image/362e6434-e045-40b3-9f20-c1a99baf829b?resizing_type=fit&width=1920",
  },
  { type: "productList", listName: "Sunset Warrior", tagList: [] },
];
