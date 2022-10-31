import { useNavigate } from "react-router-dom"

export default function Home(props){
    const navigate = useNavigate()
    const goDmscreen = e =>{
        e.preventDefault()
        navigate('/dmscreen')
    }
    const goMycharacters = e =>{
        e.preventDefault()
        navigate('/mycharacters')
    }
    const goLogin = e =>{
        e.preventDefault()
        navigate('/login')
    }
    const goRegister = e =>{
        e.preventDefault()
        navigate('/register')
    }
    return(
        <div className="home-container">
            <div className="content">
                <h1 className="headerhome">{props.currentUser ? `Welcome back adventurer!` : 'Welcome adventurer, tis a pleasure to make your acquintance! '}<br/>Please select your path, your destiny awaits you.</h1>
                {props.currentUser ? 
                    <div className="home-buttons">
                        <div className="home-buttons1" onClick={goDmscreen} ><p>My DM Screen</p></div>
                        <div className="home-buttons2" onClick={goMycharacters} ><p>My Characters</p></div>
                    </div> : 
                    <div className="home-buttons">
                        <div className="home-buttons1" onClick={goLogin}  ><p>Already have an account? Click here to log in!</p></div>
                        <div className="home-buttons2" onClick={goRegister} ><p>Don't have an account? Click here to sign up!</p></div>
                    </div>
                }
                
            </div>
        </div>
    )
}