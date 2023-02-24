import React, { FC, useState } from 'react'
import Button from '../../components/forms/Button';
import Input from "../../components/forms/Input"
import "./login.scss"
interface LoginProps {

}

const Login: FC<LoginProps> = ({ }) => {
      const [password, setPassword] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [loading, setLoading] = useState<boolean>(false);
      const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
            console.log("check")
            // const button: HTMLButtonElement = e.currentTarget;
            e.preventDefault();

      };
      return (
            <div className='login-form'>
                  <form>
                        <h1>Login</h1>
                        <Input
                              type="email"
                              value={email}
                              label="Email"
                              setValue={setEmail}
                        />
                        <Input
                              type="password"
                              value={password}
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