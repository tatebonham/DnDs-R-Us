import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate, useNavigate, Link }  from "react-router-dom"


export default function Register({currentUser, setCurrentUser}){
// state for the controlled form
const [name, setName] =useState("")
const [email, setEmail]= useState("")
const [password, setPassword] = useState ("")
const [msg, setMsg] = useState(" ")
const navigate = useNavigate()

// handle form submit
const handleSubmit = async e =>{
    e.preventDefault()
    try{
        // posts form body to the backend server
        const reqBody = {
            name, 
            email,
            password
        }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, reqBody)
        // save the token in local storage
        const { token } = response.data
        localStorage.setItem("jwt", token)
        // decode the token
        const decoded = jwt_decode(token)
        // set the user in Apps state to be the decoded token
        setCurrentUser(decoded)
        // got to user profile page
        navigate("/")

    }catch(err){
        console.warn(err)
        if(err.response){
            if(err.response.status === 400){
                setMsg(err.response.data.msg)
            }
        }
    }
}

// render a navigate component if user is already logged in 
    if (currentUser){
        return <Navigate to = "/mycharacters" />
    }
    return(
        <div>
           <h1> Sign up to create a Bucket List </h1>
            {/* display msg if error occure */}
            <p> {msg}</p>

            {/* new user form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"> <h2>Name:</h2></label>
                    <input 
                        type = "text"
                        id = "name"
                        placeholder = "Enter your user name"
                        onChange = {e=>setName(e.target.value)}
                        value = {name}
                        required
                    />
                <label htmlFor="email"> <h2>Email:</h2></label>
                    <input 
                        type = "text"
                        id = "email"
                        placeholder = "Enter your email"
                        onChange = {e=> setEmail(e.target.value)}
                        value = {email}
                        required
                        />
                <label htmlFor="password"> <h2>Password:</h2></label>
                    <input 
                        type = "text"
                        id = "password"
                        placeholder = "Choose your password"
                        onChange = {e=> setPassword(e.target.value)}
                        value = {password}
                        required
                    />
                <button type="submit"><h2>Register</h2></button>
            </form>

            <div>
                <p>Have an account already? Click <Link to="/login"><u>here</u></Link> to log in.</p>
            </div>

        </div>
    )
}