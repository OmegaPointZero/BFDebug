import React, {Component} from 'react';
import TapeDisplay from './tape';
import './App.css';

class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: "+>+>+>+!>+>+>+>+>+>+++++>+<<<<<<<<<<<<<<", /* fixed for now, will load into memory via user input later */
            eip: 0, /* instruction pointer, to replace the broken for loop */
            dp: 0, /* Data pointer, where on the tape we are */
            running: false, /* whether or not the debugger is running, will be used to implement breakpoints later */
            tape: new Array(30000).fill(0),
            debugging_memory: 4, /* Don't display all 30,000 cells at once, only the number of cells outlined in debugging memory. For now, that is a fixed value until we can update state somewhat-synchronously */
            error: "None",
            execNum: 0 /* Number of instructions executed */
        }
    }

/* test program for when all operators are programmed:
++++++++++[>++++++++++>++++++++++>++++++++++>++++++++++<<<<-]>.>.>.>.>,>,>,>,>,<<<<<.>.>.>.>.
*/

    increment_tape = (index) => {
        var item = this.state.tape[index]
        if(item===255){
            item = 0;
        } else {
            item++;
        }
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
        if(item===0){
            item = 255;
        } else {
            item--;
        }
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

    componentDidUpdate(){
        var that = this;
        setTimeout(function(){
            if(that.state.running === true){
                that.run_debugger();
            }
        }, 300);
    }

    start_debugger(){
        this.setState({eip:0,dp:0,tape: new Array(30000).fill(0),running:true,error:"None"})
    }

    continue_from_breakpoint(){
        this.setState({running:true})
    }

    run_debugger(){
        var eip = this.state.eip;
        var dp = this.state.dp;
        var execNum = this.state.execNum;
        switch(this.state.program[eip]){
            case '+':
                this.increment_tape(this.state.dp);
                break; 
            case '-':
                this.decrement_tape(this.state.dp);
                break; 
            case '>':
                if(dp===30000){
                    this.setState({error: 'Encountered \'>\' instruction at right end of tape.', running: false})
                } else {
                    if(dp===this.state.debugging_memory){
                        this.setState({debugging_memory: dp+1})
                    }
                    this.setState({dp: dp+1});
                }
                break;
            case '<':
                if(dp===0){
                    this.setState({error: 'Encountered \'<\' instruction at left end of tape.', running: false})
                } else {
                    this.setState({dp: dp-1});
                }
                break; 
            case '!':
                this.setState({running: false});
            default:
                break;
        }
        if(eip === this.state.program.length){
            this.setState({running: false});
        } else {
            this.setState({execNum: execNum+1,eip: eip+1});
        }
    }

    render(){

        var runningStatus;
        if(this.state.running){
            runningStatus = "true"
        } else {
            runningStatus = "false"
        }

        return (<div className="debuggerDisplay">
            <div>
                <h3>Debugger State</h3>
                <ul>
                    <li>Instruction Pointer: {this.state.eip}</li>
                    <li>Data Pointer: {this.state.dp}</li>
                    <li>Running status:  {runningStatus}</li>
                    <li className="errorMessage">Error: {this.state.error}</li>
                    <li>Number of executed instructions: {this.state.execNum}</li>
                </ul>
            </div>
            <div className="tapeMemoryDisplay">
                <TapeDisplay tape={this.state.tape} order={this.state.debugging_memory} dp={this.state.dp} />
            </div><br />
            <div className="debugOptions">
                <button id="run" onClick={() => {this.start_debugger()}}>Run</button>&nbsp;
                <button id="continue" onClick={() => {this.continue_from_breakpoint()}}>Continue</button>
            </div>
            <div><br />
            <textarea id="programInput" type="text" value={this.state.value} onChange={this.handleChange} />
            </div>            
        </div>
        )
    }
}

export default Debugger;    
