import React, { ChangeEvent, FC, useContext, useState } from 'react'
import axios from "axios";
import { toast } from "react-hot-toast";
import { saveInLocalStorage } from "../../helpers/auth";
import "./login.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { setUser } from '../../slices/user.slice';
import { useAppDispatch } from '../../hooks/redux';
import { Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
      const [password, setPassword] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
      // const notify = (text: string) => toast.error(text, { duration: 2000 });

      // Context

      const authContext = useContext(AuthContext);
      const dispatch = useAppDispatch();
      // State

      // Hooks
      const navigate = useNavigate();
      const location = useLocation();
      const fromPage = location.state?.from?.pathname || "/";

      const emailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
      const passwordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

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

                        // Save in localstorage
                        saveInLocalStorage("auth", data);
                        authContext?.setAuth(data);
                        dispatch(setUser(data.user))
                        // toast
                        toast.success("Вы успешно авторизовались!");
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
            <Container centerContent maxW='md'>
                  <Heading>Авторизация</Heading>

                  <Stack spacing={3} mt={10}>
                        <FormControl>
                              <FormLabel>Email</FormLabel>
                              <Input
                                    type='email'
                                    onChange={emailChange}
                              />
                              <FormHelperText>Ваш email, используемый как логин.</FormHelperText>
                        </FormControl>



                        <FormControl>
                              <FormLabel>Пароль</FormLabel>
                              <Input
                                    type='password'
                                    onChange={passwordChange}
                              />
                              <FormHelperText>Придумайте сложный пароль e.g #dDF42c_qw</FormHelperText>
                        </FormControl>
                        <Button
                              mt={4}
                              alignSelf="start"
                              colorScheme='green'
                              onClick={handleSubmit}
                              isLoading={loading}
                        >Войти</Button>
                  </Stack>


            </Container>

      )
}

export default Login;