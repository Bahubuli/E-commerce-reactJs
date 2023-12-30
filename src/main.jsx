import React,{useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import CartPage from "./Components/CartPage/CartPage.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import ProductPage from "./Components/ProductPage/ProductPage.jsx";
import { Provider } from "react-redux";
import { appStore } from "./Store/Store.js";
import Protected from "./Components/Protected/Protected.jsx";
import NotFound from './Components/NotFound/NotFound.jsx'
import Success from "./Components/Success/Success.jsx";
import UserOrdersPage from "./Components/User/UserOrdersPage.jsx";
import ProfilePage from "./Components/User/ProfilePage.jsx";
import Logout from "./Components/Logout/Logout.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import AdminHome from "./Components/Admin/AdminHome.jsx";
import AdminProductPage from "./Components/Admin/AdminProductPage.jsx";
import ProductFormPage from "./Components/Admin/ProductFormPage.jsx";
import AdminOrders from "./Components/Admin/AdminOrders.jsx";
import VerifyPage from "./Components/Login/Verify.jsx";
import ForgotPass from "./Components/Login/ForgotPass.jsx";
import ResetPass from "./Components/Login/ResetPass.jsx";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Protected><App /></Protected>,
  },
  {
    path: "/admin",
    element: <Protected><AdminHome></AdminHome></Protected>,
  },
  {
    path: "/admin/product-details/:id",
    element: <Protected><AdminProductPage/></Protected>,
  },
  {
    path:"/admin/product-form",
    element:(
        <Protected>
            <ProductFormPage></ProductFormPage>
        </Protected>
    )
  },
  {
    path:"/admin/product/edit/:id",
    element:(
        <Protected>
            <ProductFormPage></ProductFormPage>
        </Protected>
    )
  },
  {
    path:"/admin/orders",
    element:(
        <Protected>
            <AdminOrders></AdminOrders>
        </Protected>
    )
  },
  {
    path: "/home",
    element: <Protected><App /></Protected>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-details/:id",
    element: <Protected><ProductPage /></Protected>,
  },
  {
    path:"/order-success",
    element:<Success/>
  },
  {
    path:"/orders",
    element:<UserOrdersPage/>
  },
  {
    path:"/profile",
    element:<ProfilePage></ProfilePage>
  },
  {
    path:"/logout",
    element:<Logout></Logout>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:"/user/verify-email",
    element:<VerifyPage/>
  },
  {
    path:"/user/forgot-password",
    element:<ForgotPass/>

  },
  {
    path:"/user/reset-password",
    element:<ResetPass/>
  },
  {
    path:"*",
    element:<NotFound></NotFound>
  },



]);



ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={appStore}>
  <RouterProvider router={appRouter} />
  </Provider>
);
