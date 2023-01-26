import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { Dl } from "../wailsjs/go/main/App";
import './app.sass';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import List from './Pages/List/List';
import Mangas from './Pages/Mangas/Mangas';
import Read from './Pages/Read/Read';
import Select from './Pages/Select/Select';


function App() {

    document.addEventListener("reading", (event) => {
      if (event.detail) {
        try {
            document.getElementById("home").classList.toggle("blurr")
        }catch{}
        try {
            document.getElementById("navbar").classList.toggle("blurr")
        }catch{}
        try {
            document.getElementById("mangas").classList.toggle("blurr")
        }catch{}
      }
    })

    return (
        <div id="App">
            <Router >
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/list" element={<List />}/>
                    <Route exact path="/mangas" element={<Mangas />}/>
                    <Route exact path="/select/:id" element={<Select />}/>
                    <Route exact path="/read/:mngId/:chapId" element={<Read />}/>
                </Routes>
            </Router>
            {/* <button onClick={() => {Dl().then(res => console.log(res))}}>Die MF</button> */}
        </div>
    )
}

export default App
