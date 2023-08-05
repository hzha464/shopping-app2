import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { api } from "./api/shopapi";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import path from "path";
import NavBar from "./component/Navbar";
import Login from "./component/Login";
import Register from "./component/Register";
import BrandPage from "./component/BrandPage";
import Detail from "./component/Detail";
import Cart from "./component/Cart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    // path: "/",
    // element: <App />,
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/Brand/:brand",
        element: <BrandPage />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={api}>
        <RouterProvider router={router} />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
