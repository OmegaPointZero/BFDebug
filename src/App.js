import React from 'react';
import Debugger from './debugger';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          The <code>BrainFuck</code> Debugger - version 0.0.4
        </h1>
        <p>
            Below, paste or type your brainfuck program into the input area. Hit the button to start it, and watch it populate the memory in the space below.
        </p>
        <h3>Debugger features</h3>
        <p>
            You can use the bang (!) character to set a breakpoint. The run button will initialize the debugger, setting the instruction pointer and data pointer to 0; while also re-initializing the tape. (At this time, the code is hardcoded in, until development gets to a point where all instructions are functional, at which point the feature to enter your own code will be finished). If you've set a breakpoint, you can resume execution by hitting the "continue" button.
        </p>
        <br />
        <Debugger />
      </header>
    </div>
  );
}

export default App;
