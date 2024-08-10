import Login from "@/views/Log/Login";
import Layout from "@/layout/Layout"
import { createBrowserRouter } from "react-router-dom";
import Home from "@/views/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Timbrado from "@/views/Timbrado/Timbrado";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { element: <ProtectedRoutes />,
        children: [
          {
            path: "/home",
            element: <Home></Home>
          },
          {
            path: "/timbrado",
            element: <Timbrado></Timbrado>
          }
        ]
      }
    ],
  }
]);