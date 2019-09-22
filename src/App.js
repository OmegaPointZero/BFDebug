import React from 'react';
import Debugger from './debugger';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          The <code>BrainFuck</code> Debugger - version 0.0.2
        </h1>
        <br />
        <p>
            Below, paste or type your brainfuck program into the input area. Hit the button to start it, and watch it populate the memory in the space below.
        </p><br />
        <p>
            <h3>Debugger features</h3>
            <p>
                You can use the bang (!) character to set a breakpoint.
            </p>
        </p>
        <br />
        <Debugger />
      </header>
    </div>
  );
}

export default App;
