import { CartItem } from "../../types/CartItem";
import Image from "../../types/Image";

const image: Image = {
  id: "aac9ef7f-3eba-4948-bbca-9ed34be1ea1c",
  imageUrl: "https://placeimg.com/640/480/any",
  productId: "01a6ace4-f9fb-481b-928b-5906bf951b91"
}
export const cartItemsData: CartItem[] = [
  {
    id: "01a6ace4-f9fb-481b-928b-5906bf951b91",
    title: "Electronic Metal Keyboard",
    price: 41,
    description:
      "The beautiful range of Apple Natural\u00E9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      "https://i.imgur.com/wUBxCQh.jpeg",
      "https://i.imgur.com/9aM8pz3.jpeg",
      "https://i.imgur.com/ZDMM36B.jpeg",
    ],
    category: {
      id: "01e41dce-3ed5-4736-aca0-be70a80c44be",
      name: "Furniture",
      image: "https://i.imgur.com/imQx3Az.jpeg",
    },
    inventory: 20,
    quantity: 1,
  },
];
