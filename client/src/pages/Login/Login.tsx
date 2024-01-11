import React, { FC, useContext, useState } from 'react'
import Button from '../../components/forms/Button';
import Input from "../../components/forms/Input"
import axios from "axios";
import { toast } from "react-hot-toast";
import { saveInLocalStorage } from "../../helpers/auth";
import "./login.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
      const [password, setPassword] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
      // const notify = (text: string) => toast.error(text, { duration: 2000 });

      // Context

      const authContext = useContext(AuthContext);

      // State

      // Hooks
      const navigate = useNavigate();
      const location = useLocation();
      const fromPage = location.state?.from?.pathname || "/";

      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            try {
                  setLoading(true);
                  if (authContext?.auth) {
                        toast.error('Вы уже авторизованы!');
                        setTimeout(() => {
                              setLoading(false);
                        }, 1000);
                        return;
                  }
                  const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/auth/signin`, {
                        email,
                        password,
                  });

                  if (data?.error) {
                        toast.error(data.error);
                        setTimeout(() => {
                              setLoading(false);
                        }, 1000);
                        return;
                  }
                  else {
                        authContext?.setAuth(data);
                        // Save in localstorage
                        saveInLocalStorage("auth", data);
                        // toast
                        toast.success("Successfully logged in");
                        console.log("Successfully logged in", data);
                        console.log(fromPage);
                        setTimeout(() => {
                              setLoading(false);
                              navigate(fromPage);
                        }, 1000);
                  }
            } catch (error) {
                  console.log(error);
            }
      };
      // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      //       console.log("check")
      //       // const button: HTMLButtonElement = e.currentTarget;
      //       e.preventDefault();

      // };
      return (
            <div className='login-form'>
                  <form>
                        <h1>Login</h1>
                        <Input
                              type="email"
                              label="Email"
                              setValue={setEmail}
                        />
                        <Input
                              type="password"
                              label="Password"
                              setValue={setPassword}
                        />
                        <Button
                              handleSubmit={handleSubmit}
                              email={email}
                              password={password}
                              loading={loading}
                        />

                  </form>

            </div>
      )
}

export default Login;