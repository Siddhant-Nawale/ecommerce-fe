import { GroupedProducts, ProductList, TagListObject } from "../models/Product";

export const mockProductList = {
  productList: [
    {
      name: "Apple",
      timeToMake: "60-90 mins",
      description:
        "Mr. Apple has trained for 90 years and has become a Sword master.",
      quantityInStock: 5,
      category: "fruit-warriors",
      price: 50,
      discount: 5,
      weight: "1kg",
      image:
        "https://files.idyllic.app/files/static/2163697?width=750&optimizer=image",
      tags: ["sword", "warrior", "fruit"],
      otherInformation: {
        releaseDate: "2025-01-01",
        expirationDate: "2025-06-01",
        manufacturer: "Apple Inc.",
      },
      tax: "5%",
      shippingClass: "standard",
      location: "Warehouse 3, Aisle 4",
    },
    {
      name: "Banana",
      timeToMake: "30-45 mins",
      description: "A banana with unparalleled agility and speed.",
      quantityInStock: 10,
      category: "fruit-warriors",
      price: 50,
      discount: 5,
      weight: "1kg",
      image: "https://preview.redd.it/banana-warrior-v0-n0k9nq3zs6vb1.jpg?width=1080&crop=smart&auto=webp&s=25bf7a89b7acee2fd2395ce1b1dab2bd8c4e530c",
      tags: ["speed", "agility", "fruit"],
      otherInformation: {
        releaseDate: "2025-01-15",
        expirationDate: "2025-05-15",
        manufacturer: "Banana Corp.",
      },
      tax: "5%",
      shippingClass: "express",
      location: "Warehouse 1, Aisle 2",
    },
    {
      name: "Orange",
      timeToMake: "45-60 mins",
      description:
        "The orange warrior, known for its zest and vitamin C power.",
      quantityInStock: 8,
      category: "fruit-warriors",
      price: 50,
      discount: 5,
      weight: "1kg",
      image: "https://artfiles.alphacoders.com/128/128136.jpg",
      tags: ["citrus", "zest", "vitamin C", "fruit"],
      otherInformation: {
        releaseDate: "2025-01-10",
        expirationDate: "2025-04-10",
        manufacturer: "Citrus Inc.",
      },
      tax: "5%",
      shippingClass: "standard",
      location: "Warehouse 2, Aisle 1",
    },
    {
      name: "Mango",
      timeToMake: "90-120 mins",
      description: "A powerful mango warrior with a tropical punch.",
      quantityInStock: 12,
      category: "fruit-warriors",
      price: 50,
      discount: 5,
      weight: "1kg",
      image: "https://i.pinimg.com/736x/4d/37/f4/4d37f46908420bf54c3cb00efb0b640f.jpg",
      tags: ["tropical", "punch", "fruit"],
      otherInformation: {
        releaseDate: "2025-02-01",
        expirationDate: "2025-07-01",
        manufacturer: "Mango World",
      },
      tax: "7%",
      shippingClass: "premium",
      location: "Warehouse 4, Aisle 5",
    },
    {
      name: "Pineapple",
      timeToMake: "120-150 mins",
      description: "The pineapple warrior with a sharp and spiky defense.",
      quantityInStock: 3,
      category: "fruit-warriors",
      price: 50,
      discount: 5,
      weight: "1kg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3PWsawFPpoqTshRSvORj4EcsUbDagoUPk2Q&s",
      tags: ["sharp", "defense", "tropical", "fruit"],
      otherInformation: {
        releaseDate: "2025-01-20",
        expirationDate: "2025-06-20",
        manufacturer: "Tropical Fruits Co.",
      },
      tax: "6%",
      shippingClass: "fragile",
      location: "Warehouse 5, Aisle 3",
    },
  ],
};

// The updated function to handle the new input structure
export function groupProductsByTags(
  tagLists: TagListObject[]
): GroupedProducts {
  const productList: ProductList = mockProductList; // Replace with your actual product list
  const groupedProducts: GroupedProducts = {};

  // Iterate over each list of tags (tagList array)
  tagLists.forEach((tagListObject) => {
    const tagList: string[] = tagListObject.tagList; // Extract tags from the object
    const tagKey = tagList.join("."); // Join the tags into a string like "sword.warrior"

    // Initialize the array for this key if it doesn't exist
    if (!groupedProducts[tagKey]) {
      groupedProducts[tagKey] = [];
    }

    // Add products that match the current tagList to the corresponding key
    productList.productList.forEach((product) => {
      // Check if all tags in tagList are present in the product's tags
      const match = tagList.every((tag) => product.tags.includes(tag));

      if (match) {
        groupedProducts[tagKey].push(product);
      }
    });
  });

  return groupedProducts;
}
