import './App.css';
import NavBar from "./Components/NavBar"
import React, {useState, useContext} from 'react';
import {ChatDappContext} from './Context/ChatDappContext'
function App() {

  const {account} = useContext(ChatDappContext);
  return (
    <div className="">
      
      <NavBar/>
      {account}
    </div>
  );
}

export default App;
