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
            navigate('/mycharacters')
        }catch(err){
            console.warn(err)
            if(err.response === 400 ){
                    setMsg(err.response.data.msg)
            }
        }
    }
    // conditionally render a navigate component
    if (currentUser){
        return <Navigate to="/mycharacters" />
    }


    return(
        <div className="login-container">
            <div className="login-form">
                <h1> Please enter your login information below </h1>
                {msg}
                <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email"><h2>Email:</h2></label>
                        <input
                            type = "text"
                            id = "email"
                            placeholder = "Enter Your Email"
                            onChange ={e=> setEmail(e.target.value)}
                            value={email}
                        />
                    <label htmlFor="password"><h2>Password:</h2></label> 
                        <input
                            type = "text"
                            id = "password"
                            placeholder = "Enter Your Password"
                            onChange={e => setPassword (e.target.value)}
                            value={password}
                        />
                        <div>
                            <button type="submit"><h2>Log In</h2></button>
                        </div>
                </form>
                </div>
                <div>
                    <p>Don't have an account? Click <Link to="/register"><u>here</u></Link> to sign up.</p>
                </div>
            </div>
        </div>
    )
}