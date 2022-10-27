import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/partials/NavBar'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
// import Footer from './components/partials/Footer'
import MyCharacters from './components/pages/MyCharacters'
import CharacterSheet from './components/pages/CharacterSheet'

function App() {
  return (
    <div>
          <BrowserRouter>
            <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/mycharacters' element={<MyCharacters/>} />
              <Route path='/charactersheet' element={<CharacterSheet/>} />
            </Routes>
            {/* <Footer/> */}
          </BrowserRouter>
    </div>
  );
}

export default App;
