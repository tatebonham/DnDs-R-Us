import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate, Navigate, Link } from "react-router-dom"

export default function Login( {currentUser, setCurrentUser}){
    // states for the controlled form
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    // submit login form event handler
    const handleSubmit = async e =>{
        e.preventDefault()
        try{
        // post form to backend
            const reqBody = {
                email,
                password
            }
            console.log(reqBody)
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)

            // save the token in local storage
            const { token } = response.data
            localStorage.setItem("jwt", token)
            // decode the token
            const decoded= jwt_decode(token)
            // set the user in app state
            setCurrentUser(decoded)
            navigate('/MyCharacters')
        }catch(err){
            console.warn(err)
            if(err.response === 400 ){
                    setMsg(err.response.data.msg)
            }
        }
    }
    // conditionally render a navigate component
    if (currentUser){
        return <Navigate to="/user/profile" />
    }


    return(
        <div>
            <h1> Login to access your Bucket List </h1>
            {msg}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"><h2>Email:</h2></label>
                    <input
                        type = "text"
                        id = "email"
                        placeholder = "your email"
                        onChange ={e=> setEmail(e.target.value)}
                        value={email}
                    />
                <label htmlFor="password"><h2>Password:</h2></label> 
                    <input
                        type = "text"
                        id = "password"
                        placeholder = "enter your password"
                        onChange={e => setPassword (e.target.value)}
                        value={password}
                    />
                <button type="submit"><h2>Login</h2></button>
            </form>
            <div>
                <p>Don't have an account? Click <Link to="/login"><u>here</u></Link> to sign up.</p>
            </div>
        </div>
    )
}