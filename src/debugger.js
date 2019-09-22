import React, {Component} from 'react';
import TapeDisplay from './tape';
import Output from './output';
import Input from './input';
import DebugInfo from './DebugInfo';
import './App.css';

class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: "++++++++++[>++++++++>++++++++++>++++++++++++>++++++++++>+++++++++++>++++++++++++>+++++++++++<<<<<<<-]>----->--->---->+>-->+<<<<<!.>.>.>.>.>.>.", /* fixed for now, will load into memory via user input later */
            eip: 0, /* instruction pointer, to replace the broken for loop */
            dp: 0, /* Data pointer, where on the tape we are */
            running: false, /* whether or not the debugger is running, will be used to implement breakpoints later */
            tape: new Array(30000).fill(0),
            debugging_memory: 4, /* Don't display all 30,000 cells at once, only the number of cells outlined in debugging memory. For now, that is a fixed value until we can update state somewhat-synchronously */
            error: "None",
            breakpoint: false,
            execNum: 0, /* Number of instructions executed */
            output: ""
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
        });
    }

    componentDidUpdate(){
        var that = this;
        setTimeout(function(){
            if(that.state.running === true){
                that.run_debugger();
            }
        }, 81);
    }

    start_debugger(){
        this.setState({eip:0,dp:0,tape: new Array(30000).fill(0),running:true,error:"None"})
    }

    continue_from_breakpoint(){
        this.setState({running:true, breakpoint:false})
    }

    run_debugger(){
        var eip = this.state.eip;
        var dp = this.state.dp;
        var execNum = this.state.execNum;
        var workingIP = this.state.eip;
        var count = 1;
        switch(this.state.program[eip]){
            case '+':
                this.increment_tape(this.state.dp);
                break; 
            case '-':
                this.decrement_tape(this.state.dp);
                break; 
            case '>':
                if(dp===30000){
                    this.setState({error: 'HALTED: Encountered \'>\' instruction at right end of tape.', running: false})
                } else {
                    if(dp===this.state.debugging_memory){
                        this.setState({debugging_memory: dp+1})
                    }
                    this.setState({dp: dp+1});
                }
                break;
            case '<':
                if(dp===0){
                    this.setState({error: 'HALTED: Encountered \'<\' instruction at left end of tape.', running: false})
                } else {
                    this.setState({dp: dp-1});
                }
                break; 
            case '[':
                 if(this.state.tape[dp]===0){
                    while(count>0){
                        workingIP++;
                        console.log(this.state.program[workingIP])
                        if(this.state.program[workingIP] === '['){
                            count++;
                        } else if(this.state.program[workingIP] === ']'){
                            count--;
                        }
                    }
                    this.setState({eip:workingIP})
                }
                break;
            case ']':
                if(this.state.tape[dp]!==0){
                    while(count>0){
                        workingIP--;
                        if(this.state.program[workingIP] === '['){
                            count--;
                        } else if(this.state.program[workingIP] === ']'){
                            count++;
                        }
                    }
                    eip = workingIP;
                }
                break;
            case '.':
                var output = this.state.output;
                output += String.fromCharCode(this.state.tape[dp])
                this.setState({output: output});
                break;
            case '!':
                this.setState({running: false, breakpoint:true});
                break;
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

        /* change class of error message if there's an actual message */
        var errorMessage = "";
        if(this.state.error !== "None"){
            errorMessage = "errorMessage"
        }

        return (<div className="debuggerDisplay">

            <DebugInfo eip={this.state.eip} dp={this.state.dp} runningStatus={runningStatus} errorMessage={errorMessage} error={this.state.error} execNum={this.state.execNum} breakpoint={this.state.breakpoint}/>

            <TapeDisplay tape={this.state.tape} order={this.state.debugging_memory} dp={this.state.dp} />

            <Output output={this.state.output} />

            <Input />


            <div className="debugOptions">
                <button id="run" onClick={() => {this.start_debugger()}}>Run</button>&nbsp;
                <button id="continue" onClick={() => {this.continue_from_breakpoint()}}>Continue</button>
            </div>
            <div>
                <textarea id="programInput" type="text" value={this.state.value} onChange={this.handleChange} />
            </div>            
        </div>
        )
    }
}

export default Debugger;    
