import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import Services from "../pages/services/Services";
import FAQs from "../pages/faqs/FAQs";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ProductDetails from "../pages/products/Details/ProductDetails";
import Product from "../pages/products/Product";
import PrivateRoute from "./PrivateRoute";
import Secret from "../components/secret/Secret";
import Dashboard from "../pages/dashboard/Dashboard";
import UserDashboard from "../pages/dashboard/pages/UserDashboard";
import Cart from "../pages/dashboard/pages/Cart";
import Purchases from "../pages/dashboard/pages/Purchases"
import Users from "../pages/dashboard/pages/Users";
import ProductDashboard from "../pages/dashboard/pages/ProductDashboard";
import Checkout from "../pages/dashboard/pages/Checkout";
import Success from "../pages/success/Success";
import Fail from "../pages/fail/Fail";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "payment/success/:tran_Id",
        element: <Success></Success>,
      },
      {
        path: "fail",
        element: <Fail></Fail>,
      },
      {
        path: "/faqs",
        element: <FAQs></FAQs>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/product",
        element: <Product></Product>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
        loader: () => "https://mediore-medicine-server.vercel.app/allmeds",
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/user",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dashboard/cart",
    element: <Cart></Cart>,
      },
      {
        path: "/dashboard/purchases",
    element: <Purchases></Purchases>,
      },
      {
        path: "/dashboard/users",
    element: <Users></Users>,
      },
      {
        path: "/dashboard/products",
    element: <ProductDashboard></ProductDashboard>,
      },
      {
        path: "/dashboard/checkout",
    element: <Checkout></Checkout>,
      },

    ],
  },
]);

export default router;
