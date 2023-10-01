import { useState, useEffect } from "react";
import { Services } from "./features/services/Services";
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>all services</h1>
        <Services />
      </header>
    </div>
  )
}

export default App
