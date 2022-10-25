import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/partials/NavBar'
import Home from './components/partials/Home'
import Login from './components/partials/Login'
import Register from './components/partials/Register'
import Footer from './components/partials/Footer'
import MyCharacters from './components/partials/MyCharacters'
import CharacterSheet from './components/partials/CharacterSheet'

function App() {
  return (
    <div>
      <header>

      </header>
      <main>
        <div><NavBar/></div>
        <body>
          <BrowserRouter>
            <Routes>
              <Route to='/' element={<Home.js/>} />
              <Route to='/login' element={<Login.js/>} />
              <Route to='/register' element={<Register.js/>} />
              <Route to='/mycharacters' element={<MyCharacters.js/>} />
              <Route to='/charactersheet' element={<CharacterSheet.js/>} />
            </Routes>
          </BrowserRouter>
        </body>
        <footer>
          <Footer/>
        </footer>
      </main>
    </div>
  );
}

export default App;
