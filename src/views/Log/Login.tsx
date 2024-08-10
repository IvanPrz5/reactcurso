import { MouseEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import fondo from "@/assets/fondo.svg";
import "./style.css";
import { Credentials, Token } from "@/interface/Login";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { fetchLogin } from "@/services/login/Login";

function Login() {
  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  const navigate = useNavigate();

  const loginSubmit: SubmitHandler<Credentials> = (data) => {
    const login = fetchLogin(data);
    login.then((response: Token) => {
      localStorage.setItem("token", response.data.token);
    })
    .catch((e) => {
      console.log("Fatal" + e)
    })
    .finally(() => {
      navigate("/home")
    })
  };

  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form className="sign-in-form" onSubmit={handleSubmit(loginSubmit)}>
              <div className="heading">
                <h2>Iniciar Sesión</h2>
              </div>
              <div className="actual-form">
                <div className="input-email">
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    {...register("email", { required: "Requerido" })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </div>
                <TextField
                  label="Contraseña"
                  size="small"
                  fullWidth
                  InputProps={{
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
                    ),
                  }}
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Requerido" })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                <div className="btn-control">
                  <Button
                    size="large"
                    variant="outlined"
                    type="submit"
                    fullWidth
                  >
                    Iniciar Sesion
                  </Button>
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
