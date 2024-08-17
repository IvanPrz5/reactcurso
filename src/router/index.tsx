import Login from "@/views/Log/Login";
import Layout from "@/layout/Layout"
import { createBrowserRouter } from "react-router-dom";
import Home from "@/views/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import Timbrado from "@/views/Timbrado/Timbrado";
import Cargar from "@/views/Cargar/Cargar";
import Descargas from "@/views/Descargas/Descargas";

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
            path: "/cargar",
            element: <Cargar></Cargar>
          },
          {
            path: "/timbrado",
            element: <Timbrado></Timbrado>
          },
          {
            path: "/descargas",
            element: <Descargas></Descargas>
          }
        ]
      }
    ],
  }
]);