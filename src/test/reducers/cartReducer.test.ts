import cartReducer, {
  addToCart,
  clearCart,
  decreaseQunatity,
  detetFromCart,
  increaseQuantity,
} from "../../redux/reducers/cart/cartReducer";
import { CartItem } from "../../types/CartItem";
import { cartItemsData } from "../dataSeed/cartItemData.Seed";
import { productsData } from "../dataSeed/productData.Seed";

const state: {
  cartItems: CartItem[];
} = {
  cartItems: [],
};
beforeEach(() => {
  state.cartItems = [];
});
describe("Test actions in cardReducer", () => {
  test("should add new product in cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);

    const product1 = productsData[1];
    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.cartItems[1].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(2);
    expect(state.cartItems[1].quantity).toBe(2);
  });
  test("should not add but increase same product quantity in cart ", () => {
    state.cartItems = cartItemsData;
    expect(state.cartItems?.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    const product = productsData[0];

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);
  });
  test("should increase item quantity", () => {
    state.cartItems = cartItemsData;
    expect(state.cartItems?.length).toBe(1);

    const product = productsData[0];

    expect(state.cartItems[0].quantity).toBe(1);
    expect(state.cartItems?.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = state.cartItems = cartReducer(
      state,
      increaseQuantity(product.id)
    ).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);
  });
  test("should decrease item quantity", () => {
    state.cartItems = cartItemsData;
    expect(state.cartItems?.length).toBe(1);

    const product = productsData[0];

    state.cartItems = state.cartItems = cartReducer(
      state,
      increaseQuantity(product.id)
    ).cartItems;

    expect(state.cartItems?.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);

    state.cartItems = state.cartItems = cartReducer(
      state,
      decreaseQunatity(product.id)
    ).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = state.cartItems = cartReducer(
      state,
      decreaseQunatity(product.id)
    ).cartItems;
    expect(state.cartItems.length).toBe(0);
  });
  test("should delete an item from cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(2);

    state.cartItems = cartReducer(state, detetFromCart(product.id)).cartItems;
    expect(state.cartItems?.length).toBe(0);
  });

  test("should empty cart", () => {
    const product = productsData[0];
    expect(state.cartItems?.length).toBe(0);

    state.cartItems = cartReducer(state, addToCart(product)).cartItems;
    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].quantity).toBe(1);

    const product1 = productsData[1];
    state.cartItems = cartReducer(state, addToCart(product1)).cartItems;
    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[0].quantity).toBe(1);
    expect(state.cartItems[1].quantity).toBe(1);

    state.cartItems = cartReducer(state, clearCart()).cartItems;
    expect(state.cartItems?.length).toBe(0);
  });
});
