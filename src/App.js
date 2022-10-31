import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import jwt_decode from "jwt-decode";
import './scss/styles.js';

import NavBar from './components/partials/NavBar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
// import Footer from './components/partials/Footer'
import MyCharacters from './components/pages/MyCharacters'
import CharacterSheet from './components/pages/CharacterSheet'
import NewCharacter from './components/pages/NewCharacter'

function App() {
  const [currentUser,setCurrentUser] =useState (null)
    useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, [])

  return (
    <div className='routes'>
          <BrowserRouter>
            <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
              <Route path='/register' element={<Register currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
              <Route path='/mycharacters' element={currentUser ? <MyCharacters currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to='/login' />} />
              <Route path='/newcharacter' element={currentUser ? <NewCharacter currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to='/login' />} />
              <Route path='/charactersheet/:id' element={<CharacterSheet currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
            </Routes>
            {/* <Footer/> */}
          </BrowserRouter>
    </div>
  );
}

export default App;
