// create a list of 5 clothing items
// const products = [
//   {
//     id: 1,
//     name: "T-Shirt",
//     price: 10.99,
//     description: "A plain white t-shirt.",
//     image: "/img1.png",
//   },
//   {
//     id: 2,
//     name: "Jeans",
//     price: 19.99,
//     description: "A pair of blue jeans.",
//     image: "/img2.png",
//   },
//   {
//     id: 3,
//     name: "Sweater",
//     price: 29.99,
//     description: "A plain white sweater.",
//     image: "/img3.png",
//   },
// ];

import { PRODUCTS_STORE_URL } from "@/config";

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_STORE_URL);

  const products = await response.json();

  return products;
};

export const searchStore = async (query: string) => {
  // Search for products that match the query
  const data = await getProducts();

  // console.log("searchStore called", query);

  const lowerQuery = query.toLowerCase();

  // Filter products whose name includes the query string
  const results = data.filter((product) =>
    product.title.toLowerCase().includes(lowerQuery)
  );

  // console.log("searchStore results", results);

  return results;
};
