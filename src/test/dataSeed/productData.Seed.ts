import Product from "../../types/Product";
import { categorydata } from "./categoryData.Seed";

export const productsData: Product[] = [
  {
    id: "0678f309-9add-4ca1-8b8b-6462f61cf8b3",
    title: "Electronic Metal Keyboard",
    price: 41,
    description:
      "The beautiful range of Apple Natural\u00E9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      "https://i.imgur.com/wUBxCQh.jpeg",
      "https://i.imgur.com/9aM8pz3.jpeg",
      "https://i.imgur.com/ZDMM36B.jpeg",
    ],
    inventory: 20,
    categoryId: categorydata[0].id,
    category: categorydata[0],
  },
  {
    id: "086bdb0f-1087-45ad-a5e8-2d9b767dac44",
    title: "Gorgeous Metal Car",
    price: 398,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/CCnU4YX.jpeg",
      "https://i.imgur.com/JANnz25.jpeg",
      "https://i.imgur.com/ioc7lwM.jpeg",
    ],
    inventory: 10,
    categoryId: categorydata[1].id,
    category: categorydata[1],
  },
  {
    id: "0af5083a-6078-439d-b898-a821e9c4ce98",
    title: "Intelligent Metal Chicken",
    price: 394,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/QEGACen.jpeg",
      "https://i.imgur.com/RQL19O6.jpeg",
      "https://i.imgur.com/G45P8tI.jpeg",
    ],
    inventory: 10,
    categoryId: categorydata[0].id,
    category: categorydata[0],
  },
  {
    id: "0d05e626-5033-463d-8cfa-3370cd1db768",
    title: "Generic Fresh Shirt",
    price: 621,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    images: [
      "https://i.imgur.com/nZnWUc0.jpeg",
      "https://i.imgur.com/rUWNzYa.jpeg",
      "https://i.imgur.com/rDC2jWQ.jpeg",
    ],
    inventory: 10,
    categoryId: categorydata[1].id,
    category: categorydata[1],
  },
  {
    id: "0e693e27-9559-443c-ab8e-59714a011161",
    title: "Generic Soft Bacon",
    price: 731,
    description: "The Football Is Good For Training And Recreational Purposes",
    images: [
      "https://i.imgur.com/G45P8tI.jpeg",
      "https://i.imgur.com/uDpzwEk.jpeg",
      "https://i.imgur.com/zQwsC2m.jpeg",
    ],
    inventory: 5,
    categoryId: categorydata[0].id,
    category: categorydata[0],
  },
];
