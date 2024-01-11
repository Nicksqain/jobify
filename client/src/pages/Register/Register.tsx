import React, { FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveInLocalStorage } from '../../helpers/auth';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import ListGroup from '../../components/ui/ListGroup';
import './register.scss'
interface RegisterProps {

}

const Register: FC<RegisterProps> = ({ }) => {
      // Notify
      const notify = (text: string) => toast.error(text, { duration: 2000 });

      // CONTEXT
      const authContextValue = useContext(AuthContext);

      // Доступ к значениям auth и setAuth
      const auth = authContextValue?.auth;
      const setAuth = authContextValue?.setAuth;

      // STATE
      // Состояние выбора ListGroup
      const [status, setStatus] = useState<string | null>(null);

      // #Инпуты

      // Чтение почты
      const [email, setEmail] = useState("");
      // Чтение пароля и его подтверждения
      const [password, setPassword] = useState("");
      const [confirm, setConfirm] = useState("");
      // Чтение Имени
      const [name, setName] = useState("");
      // Состояние лоадера авторизации
      const [loading, setLoading] = useState(false);

      // HOOKS
      const navigate = useNavigate();

      useEffect(() => {
            if (auth) {
                  console.log("Context=>", auth);
            }
      }, [auth]);

      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            try {
                  setLoading(true);
                  if (status === null || status === undefined) {
                        notify("Вы не выбрали свою роль");
                        setLoading(false);
                        return;
                  }
                  if (password !== confirm) {
                        notify("Passwords do not match!");
                        setLoading(false);
                        return;
                  }

                  const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/auth/signup`, {
                        name,
                        email,
                        password,
                        status,
                  });

                  if (data.error) {
                        toast.error(data.error);
                        setLoading(false);
                        return;
                  } else {
                        if (setAuth)
                              setAuth(data);
                        saveInLocalStorage("auth", data);
                        toast.success("Succesfully registered");
                        console.log("Succesfully registered", data);
                        setTimeout(() => {
                              setLoading(false);
                              navigate("/");
                        }, 1000);
                  }
            } catch (error) {
                  console.log(error);
            }
      };
      return (
            <div className="register-container">

                  <div className="form">
                        <h1 className="fw-bold mb-3 text-center">Register</h1>
                        <ListGroup setValue={setStatus} horizontal selectable>
                              <div data-selectvalue="freelancer">Я исполнитель</div>
                              <div data-selectvalue="orderer">Я заказчик</div>
                        </ListGroup>
                        {/* Дебаггинг статуса */}
                        {/* <button onClick={(el) => console.log(status)}>check</button> */}
                        <form className="form">
                              <Input type="text" value={name} label="Name" setValue={setName} />
                              <Input
                                    type="email"
                                    value={email}
                                    label="Email"
                                    help="We'll never share your email with anyone else."
                                    setValue={setEmail}
                              />
                              <Input
                                    type="password"
                                    value={password}
                                    label="Password"
                                    setValue={setPassword}
                              />
                              <Input
                                    type="password"
                                    value={confirm}
                                    label="Confirm password"
                                    setValue={setConfirm}
                              />
                              <Button
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    email={email}
                                    password={password}
                                    loading={loading}
                              />
                        </form>

                        <Toaster />
                        {/* <pre>{JSON.stringify(email)}</pre>
          <pre>{JSON.stringify(password)}</pre> */}
                  </div>

            </div>
      );
}

export default Register;