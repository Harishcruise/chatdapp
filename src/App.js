import './App.css';
import NavBar from "./Components/NavBar"
import React, {useState, useContext} from 'react';
import {ChatDappContext} from './Context/ChatDappContext'
function App() {

  const {title} = useContext(ChatDappContext);
  return (
    <div className="App">
      
      <NavBar/>
      {title}
    </div>
  );
}

export default App;
