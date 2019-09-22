import React from 'react';
import Debugger from './debugger';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The <code>BrainFuck</code> Debugger - version 0.0.1
        </p>
        <br />
        <p>
            Below, paste or type your brainfuck program into the input area. Hit the button to start it, and watch it populate the memory in the space below.
        </p>
        <br />
        <Debugger />
      </header>
    </div>
  );
}

export default App;
