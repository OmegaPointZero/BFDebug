import React, {Component} from 'react';
import TapeDisplay from './tape';
import './App.css';

class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: "+++++", /* fixed for now, will load into memory via user input later */
            dp: 0, /* Data pointer, where on the tape we are */
            running: false, /* whether or not the debugger is running, will be used to implement breakpoints later */
            tape: new Array(30000).fill(0),
            debugging_memory: 5, /* Don't display all 30,000 cells at once, only the number of cells outlined in debugging memory. For now, that is a fixed value until we can update state somewhat-synchronously */
        }
    }

/* test program for when all operators are programmed:
++++++++++[>++++++++++>++++++++++>++++++++++>++++++++++<<<<-]>.>.>.>.>,>,>,>,>,<<<<<.>.>.>.>.
*/

    increment_tape = (index) => {
        var item = this.state.tape[index]
        item++;
        const newTape = [
            ...this.state.tape.slice(0, index),
            item,
            ...this.state.tape.slice(index+1)
        ]
        this.setState({
            tape: newTape
        }, () => {
            console.log(`incremented tape to ${item}`)
        });
    }

    decrement_tape = (index) => {
        var item = this.state.tape[index]
        item--;
        const newTape = [
            ...this.state.tape.slice(0, index),
            item,
            ...this.state.tape.slice(index+1)
        ]
        this.setState({
            tape: newTape
        }, () => {
            console.log(`decremented tape to ${item}`)
        });
    }

    run_debugger(){
        for(var i=0;i<this.state.program.length;i++){
            switch(this.state.program[i]){
                case '+':
                    this.increment_tape(this.state.dp);
                    break; 
                case '-':
                    this.decrement_tape(this.state.dp);
                    break; 
                default:
                    break;
            }
        }
    }

    render(){
        return (<div>
            <div className="tapeMemoryDisplay">
                <TapeDisplay tape={this.state.tape} order={this.state.debugging_memory} />

            </div>
            <div className="debugOptions">
                <button id="run" onClick={() => {this.run_debugger()}}>Run</button>
            </div>
            <div><br />
            <textarea id="programInput" type="text" value={this.state.value} onChange={this.handleChange} />
            </div>            
        </div>
        )
    }
}

export default Debugger;    
