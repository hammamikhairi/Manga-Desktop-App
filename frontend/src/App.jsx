import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { GetLastManga } from "../wailsjs/go/main/App";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import List from './Pages/List/List';
import Mangas from './Pages/Mangas/Mangas';
import Read from './Pages/Read/Read';
import Select from './Pages/Select/Select';
import './app.sass';

function App() {

  const [lastManga, setLastManga] = useState({})

  document.addEventListener("reading", (event) => {
    if (event.detail) {
      document.getElementById("bg")?.classList.add("blurr")
      document.getElementById("home")?.classList.add("blurr")
      document.getElementById("navbar")?.classList.add("blurr")
      document.getElementById("mangas")?.classList.add("blurr")
    }
  })
  
  useEffect(() => {
      GetLastManga()
          .then(res => setLastManga(res))
  }, [])


  useEffect(() => {
       console.log(lastManga.Lastchapter) 
    }, [lastManga])

  return (
      <div id="App">
          <Router >
              <Navbar />
              {
                  lastManga.Bg && 
                  <img id="bg" src={`http://localhost:8080/999?nocache=${Math.random()}`}/>
              }
              <Routes>
                  <Route exact path="/" element={<Home  lastManga={lastManga}/>}/>
                  <Route exact path="/list" element={<List />}/>
                  <Route exact path="/mangas" element={<Mangas />}/>
                  <Route exact path="/select/:id" element={<Select />}/>
                  <Route exact path="/read/:mngId/:chapId" element={<Read />}/>
              </Routes>
          </Router>
      </div>
  )
}

export default App
