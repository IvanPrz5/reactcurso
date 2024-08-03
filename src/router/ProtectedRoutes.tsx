import { useNavigate } from "react-router-dom";

interface Props {
    children: JSX.Element
    token: Storage | undefined | null;
}

function ProtectedRoutes({children, token}: Props) {
    const navigate = useNavigate();

    if(token == undefined || token == null){
        navigate("/login");
    }

    return children;
}

export default ProtectedRoutes