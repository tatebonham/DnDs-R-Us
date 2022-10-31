import { Link } from "react-router-dom"
import logo from '../images/logo.JPG'
import { useNavigate } from "react-router-dom"


export default function NavBar({currentUser, setCurrentUser}){
    const navigate = useNavigate()
    // event handler to log the user out when needed
    const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
    // if so, delete it
    localStorage.removeItem('jwt')
    // set the user in the App state to be null
    setCurrentUser(null)
      }
    }

    const loggedIn = (
        <>
        <div className="link-item">
            <Link to = "/dmscreen" style={{textDecoration: 'none'}}> <p>DM Screen</p></Link> 
        </div>
        <div className="link-item">
            <Link to = "/mycharacters" style={{textDecoration: 'none'}}> <p>My Characters</p></Link> 
        </div>
        <div className="link-item">
            <Link to ="/" style={{textDecoration: 'none'}}> <span onClick={handleLogout}><p>Log Out</p> </span></Link> 
        </div>
        </>
    )

    const loggedOut =(
        <>
        <div className="link-item">
            <Link to= "/register" style={{textDecoration: 'none'}}> <p>Sign Up</p> </Link>
        </div>
        <div className="link-item">
            <Link to= "/login" style={{textDecoration: 'none'}} ><p>Log In</p></Link> 
        </div>
        </>

    )
    const goHome = e =>{
        e.preventDefault()
        navigate('/')
    }

    return(
        <nav>
            <div className="navbar">
                <div className='logo' >
                    <img src={logo} alt='Character Profile Picture' onClick={goHome}></img>
                    <h1 onClick={goHome}>DnDs"R"Us</h1>
                </div>
                <div className="links">
                    <div className="link-div">
                        {currentUser ? loggedIn : loggedOut}
                    </div>
                </div>
            </div>
        </nav>
    )
}