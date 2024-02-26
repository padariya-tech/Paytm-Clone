import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios"
// import { useHistory } from 'react-router-dom';

export const Signin = () => {
  // const history = useHistory();
  
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          userName,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data);
  
      // Assuming the server returns an error status for invalid credentials
      if (response.status !== 200) {
        window.alert("Invalid Credentials");
      } else {
        
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
  
      if (error.response && error.response.status === 400) {
        window.alert("Invalid Credentials");
      } else {
        window.alert("An error occurred. Please try again later.");
      }
    }
  }
  

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox  onChange={ e=>{
            setUserName(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox  onChange={e=>{
            setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={submit}
          label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}