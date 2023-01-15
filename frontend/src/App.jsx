import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet, Prompt} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
        // Prompt().then(res => console.log(res))
    }

    function prompt() {
        Prompt().then(updateResultText)    
    }
    
    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={prompt}>Greet</button>
            </div>
        </div>
    )
}

export default App
