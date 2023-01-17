// import {useState} from 'react';
// import logo from './assets/images/logo-universal.png';
import './app.sass';
// import {Greet, Prompt} from "../wailsjs/go/main/App";
import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import List from './Pages/List/List';
import Mangas from './Pages/Mangas/Mangas';
import Read from './Pages/Read/Read';


function App() {

    const [visibleNav, setVisibleNav] = useState(true)

    document.addEventListener("reading", (event) => {
      console.log(event.detail)

      if (event.detail) {
          document.getElementById("home").classList.toggle("blurr")
          document.getElementById("navbar").classList.toggle("blurr")
      } else {
        setVisibleNav(!visibleNav)
      }

      const type = setInterval(() => {
        if (event.detail)
            setVisibleNav(!visibleNav)
        clearInterval(type)
      }, 2000);
    })

    return (
        <div id="App">
            <Router >
                {
                    visibleNav &&
                    <Navbar />
                }
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/list" element={<List />}/>
                    <Route exact path="/mangas" element={<Mangas />}/>
                    <Route exact path="/read/:id" element={<Read />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
