import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveInLocalStorage } from '../../helpers/auth';
import ListGroup from '../../components/ui/ListGroup';
import './register.scss'
import { Container, Heading, Stack, FormControl, FormLabel, FormHelperText, Input, Button } from '@chakra-ui/react';
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

      const nameChange = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)
      const emailChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
      const passwordChange = (event: ChangeEvent<HTMLInputElement>) => setConfirm(event.target.value)
      const passwordConfirmChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)

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
                        toast.success("Вы успешно зарегистрировались!");
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

            <Container centerContent maxW='md'>
                  <Heading>Регистрация</Heading>

                  <Stack spacing={3} mt={10}>
                        <ListGroup setValue={setStatus} horizontal selectable>
                              <div data-selectvalue="freelancer">Я исполнитель</div>
                              <div data-selectvalue="orderer">Я заказчик</div>
                        </ListGroup>
                        <FormControl>
                              <FormLabel>Имя</FormLabel>
                              <Input
                                    onChange={nameChange}
                              />
                              <FormHelperText>Ваше имя будет видно всем пользователям.</FormHelperText>
                        </FormControl>
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

                        <FormControl>
                              <FormLabel>Подтверждение пароля</FormLabel>
                              <Input
                                    type='password'
                                    onChange={passwordConfirmChange}
                              />
                              <FormHelperText>Повторите введенный выше пароль</FormHelperText>
                        </FormControl>
                        <Button
                              mt={4}
                              alignSelf="start"
                              colorScheme='green'
                              onClick={handleSubmit}
                              isLoading={loading}
                        >Зарегистрироваться</Button>
                  </Stack>


            </Container>
      );
}

export default Register;