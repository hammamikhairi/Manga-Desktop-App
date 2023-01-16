// import {useState} from 'react';
// import logo from './assets/images/logo-universal.png';
import './app.sass';
// import {Greet, Prompt} from "../wailsjs/go/main/App";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import List from './Pages/List/List';


function App() {
    return (
        <div id="App">
            <Router >
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/list" element={<List />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App
