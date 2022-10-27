import { Link } from "react-router-dom"


export default function NavBar({currentUser, setCurrentUser}){
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
        <Link to = "/mycharacters"> My Characters</Link> {'|'}
        <Link to ="/"> <span onClick={handleLogout}>Log Out </span></Link> 
        </>
    )

    const loggedOut =(
        <>
        <Link to= "/register"> Sign Up </Link> {'|'}
        <Link to= "/login"> Log In</Link> 
        </>

    )

    return(
        <nav>
            <div>
                <Link to ="/"> Home </Link> {'|'}
                {currentUser ? loggedIn : loggedOut}
            </div>
        </nav>
    )
}