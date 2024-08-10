import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
    const token: string | null = localStorage.getItem("token")
    if(token == null){
        return <Navigate to="/login"></Navigate>
    }

    return <Outlet></Outlet>;
}

export default ProtectedRoutes;