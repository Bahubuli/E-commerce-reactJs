import React,{useEffect} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Protected><App /></Protected>,
//   },
//   {
//     path: "/admin",
//     element: <Protected><AdminHome></AdminHome></Protected>,
//   },
//   {
//     path: "/admin/product-details/:id",
//     element: <Protected><AdminProductPage/></Protected>,
//   },
//   {
//     path:"/admin/product-form",
//     element:(

//             <ProductFormPage></ProductFormPage>

//     )
//   },
//   {
//     path:"/admin/product/edit/:id",
//     element:(

//             <ProductFormPage></ProductFormPage>

//     )
//   },
//   {
//     path:"/admin/orders",
//     element:(
//         <Protected>
//             <AdminOrders></AdminOrders>
//         </Protected>
//     )
//   },
//   {
//     path: "/home",
//     element: <Protected><App /></Protected>,
//   },
//   {
//     path: "/signup",
//     element:  <Protected>
//    <Signup />
// </Protected>,
//   },
//   {
//     path: "/login",
//     element:
//    <Login />

//   },
//   {
//     path: "/cart",
//     element: <Protected><CartPage /></Protected>,
//   },
//   {
//     path: "/checkout",
//     element: <Protected><Checkout /></Protected>,
//   },
//   {
//     path: "/product-details/:id",
//     element: <Protected><ProductPage /></Protected>,
//   },
//   {
//     path:"/order-success",
//     element: <Protected>
// <Success/>
// </Protected>
//   },
//   {
//     path:"/orders",
//     element: <Protected>
//  <UserOrdersPage/>
// </Protected>
//   },
//   {
//     path:"/profile",
//     element: <Protected>
//     <ProfilePage></ProfilePage>
// </Protected>
//   },
//   {
//     path:"/logout",
//     element:<Logout></Logout>

//   },
//   {
//     path:"/forgot-password",
//     element:<ForgotPassword></ForgotPassword>
//   },
//   {
//     path:"/user/verify-email",
//     element:<VerifyPage/>
//   },
//   {
//     path:"/user/forgot-password",
//     element:<ForgotPass/>

//   },
//   {
//     path:"/user/reset-password",
//     element:<ResetPass/>
//   },
//   {
//     path:"*",
//     element:<NotFound></NotFound>
//   },
// ]);

import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById("root")).render(
<App/>
);
{/* <Auth0Provider
    domain="bahubali.us.auth0.com"
    clientId="LTRByvsBFmNpyO1rPuncNEGLlIRhP5PR"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
     <Provider store={appStore}>
  <RouterProvider router={appRouter} />
  </Provider>
  </Auth0Provider> */}
