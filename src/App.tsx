import React, {useState, useEffect} from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import AppRoute from "../src/components/AppRoute"

function App() {

  return (
    <div className="App">
      <header className="App-header">
          <h1>Тестовое задание</h1>
      </header>
        <NavBar/>

        <AppRoute/>
    </div>
  );
}

export default App;
