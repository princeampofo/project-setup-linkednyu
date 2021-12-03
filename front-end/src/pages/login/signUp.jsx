import "./signUp.css"
import { Button } from "../../components/Button"
import TextField from '@mui/material/TextField'
import { useState } from "react"
import axios from 'axios'
import { useHistory } from "react-router"
import FileBase64 from 'react-file-base64';


export default function SignUp(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")
    const [message,setMessage] = useState("")
    const [profile,setProfile]=useState("")
    const [mStyle, setmStyle] = useState("")
    const history = useHistory()

    const onSignUp = async (e) => {
        
        if (!name || !email || !password) {
            e.preventDefault()
            setmStyle("messageShow")
            setMessage("Name , Email or password fields are missing!")
            setTimeout(()=>{
                setmStyle("")
                setMessage("")
            },4000);
            return
        }

        let newName = name.split(" ");
        let randNumber = Math.floor(Math.random()*10) + 1
        let uName = newName[0] + randNumber.toString()
        
        console.log(profile);
        const signUpDetails = {
            name:name,
            username:uName,
            email:email,
            password:password,
            profile: profile
        };

        try{
            const res = await axios.post('http://localhost:5000/register',signUpDetails)
            if (res.status === 200){
                setMessage("Account Created! You will be redirected to the login page shortly")
                setTimeout(()=>{
                    setmStyle("")
                    setMessage("")
                    history.push('/login')
                },1500)
            }
        }catch (err){
            e.preventDefault()
            setmStyle("messageShow")
            setMessage(err.response.data.message)
            setTimeout(()=>{
                setmStyle("")
                setMessage("")
            },4000);
        }

    }

    

    return(
        <div className = "signupPage">
            <div className='signupTitle1'>
                <h2>LinkedNYU</h2>
            </div>
            <div className = "title">
                Sign up
            </div>
            <div className = "form">
                <div className = "unInputArea">
                    <TextField variant = "outlined"
                            label = "Name"
                            required
                            className = "unInput"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            ></TextField>
                </div>
                <div className = "emailInputArea">
                    <TextField variant = "outlined"
                            label = "Email"
                            required
                            className = "emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}></TextField>
                </div>
                <div className = "pwInputArea">
                    <TextField variant = "outlined"
                            label = "Password"
                            required
                            type = "password"
                            className = "pwInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}></TextField>
                </div>
                <div className="imageUpload">
                    <p className="imgUpload">Upload a profile picture</p>
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => {
                            setProfile(base64)
                        }} />
                </div>
            </div>
            <div className={mStyle}>
                    <p className="errMessage">{message}</p>
            </div>
            <div className = "nextButtonArea">
            <Button onClick={onSignUp} buttonSize="btn--large" buttonStyle="btn--primary--solid" className="loginButton">Next</Button>
                </div>
        </div>
    )
}