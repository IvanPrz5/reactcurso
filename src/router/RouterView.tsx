import Login from "@/views/Log/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layout/Layout"
import Home from "@/views/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";

export default function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/" element={<Layout></Layout>}>
          <Route element={<ProtectedRoutes token={localStorage}></ProtectedRoutes>}> 
            <Route path="/home" element={<Home></Home>} ></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
