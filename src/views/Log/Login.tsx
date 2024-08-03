import { FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import fondo from "@/assets/fondo.svg";
import axios from "axios";
import { Credentials } from "@/interface/Credentials";
import { API_URL } from "@/api/config";

import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => { event.preventDefault(); };

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await login({ email, password })
  }

  async function login(credentials: Credentials){
    console.log(credentials)
    axios.post(API_URL + "/login", credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        navigate("/home")
      })
      .catch((e) => {
        console.log("Error" + e)
      })
  }
  
  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              className="sign-in-form"
              /* ref="formLogin" */
            >
              <div className="heading">
                <h2>Iniciar Sesión</h2>
              </div>
              <div className="actual-form">
                <div className="input-email">
                <TextField
                  label="Email"
                  size="small"
                  fullWidth
                  onChange={e => setEmail(e.target.value)}
                />
                </div>
                {/* <div className="input-password"> */}
                  <TextField
                    label="Contraseña"
                    size="small"
                    fullWidth
                    InputProps = {{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    type={showPassword ? 'text' : 'password'}
                    onChange={e => setPassword(e.target.value)}
                  />
                {/* </div> */}
                <div className="btn-control">
                  <Button size="large" variant="outlined" fullWidth onClick={handleSubmit}>Iniciar Sesion</Button>
                </div>
              </div>
            </form>
          </div>
          <div className="carousel">
            <div className="images-wrapper">
              <img src={fondo} className="image img-1 show" alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
