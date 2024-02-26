import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e){
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8000/api/v1/users/signup",{
        firstName,
        LastName,
        userName,
        password
    })
    console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={e=>{
            setFirstName(e.target.value)
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e=>{
            setLastName(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{
            setUserName(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
            setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={submit} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}