import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./components/Root";
import Home from "./components/Home";
import Login from "./pages/Login";
import UserRegister from "./components/user/UserRegistration";
import { Profile } from "./pages/Profile";
import { AddtoCart } from "./pages/AddToCart";
import { CustomError } from "./pages/Error";
import { UsersList } from "./pages/UsersList";
import FetchSingleProduct from "./pages/Product";
import ProductCategory from "./pages/ProductFilter";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <CustomError />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <ProductCategory />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "AddToCart",
          element: <AddtoCart />,
        },
        {
          path: "users",
          element: <UsersList />,
        },

        {
          path: "product/:id",
          element: <FetchSingleProduct />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <UserRegister />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
};

export default App;
