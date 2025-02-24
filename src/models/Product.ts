export type Product = {
  name: string;
  timeToMake: string;
  description: string;
  quantityInStock: number;
  category: string;
  image: string;
  price: number;
  discount: number;
  weight: string;
  tags: string[];
  otherInformation: {
    releaseDate: string;
    expirationDate: string;
    manufacturer: string;
  };
  tax: string;
  shippingClass: string;
  location: string;
};

// Define the structure for product list template
export type ProductListTemplate = {
  type: string;
  [key: string]: any;
}[];

export type ProductList = {
  productList: Product[];
};

// The new export type for input parameter
export type TagListObject = {
  tagList: string[];
  config: { pagination: object, allTagsMatch: boolean }; // Pagination structure is empty for now
};

export type GroupedProducts = {
  [key: string]: Product[];
};
