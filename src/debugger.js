import React, {Component} from 'react';
import TapeDisplay from './tape';
import Output from './output';
import DebugInfo from './DebugInfo';
import './App.css';

class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: "+[--->++<]>+.++[->++++<]>+.+++++++.---------.++++++++++++.--.--------.--[--->+<]>-.---[->++++<]>.-----.[--->+<]>-----.---[->++++<]>.------------.---.--[--->+<]>-.[->+++<]>++.[--->+<]>----.+++[->+++<]>++.++++++++.+++++.--------.-[--->+<]>--.+[->+++<]>+.++++++++.-[++>---<]>+.+[->+++<]>+.+.---.[--->+<]>-.++[->+++<]>++..--.+++++++++++++.[--->+<]>-----.", /* fixed for now, will load into memory via user input later */
            eip: 0, /* instruction pointer, to replace the broken for loop */
            dp: 0, /* Data pointer, where on the tape we are */
            inp: 0, /* Input pointer: index of where to read from the input, implemented to make it easy to reset */
            running: false, /* whether or not the debugger is running, will be used to implement breakpoints later */
            step: false, /* Step through the debugger, one instruction at a time */
            tape: new Array(30000).fill(0),
            debugging_memory: 4, /* Don't display all 30,000 cells at once, only the number of cells outlined in debugging memory. For now, that is a fixed value until we can update state somewhat-synchronously */
            error: "None",
            breakpoint: false,
            execNum: 0, /* Number of instructions executed */
            output: "",
            input: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleProgramChange = this.handleProgramChange.bind(this);
    }

    handleInputChange(event){
        this.setState({input: event.target.value});
    }

    handleProgramChange(event){
        console.log('handling program change')
        console.log(event.target.textContent)
        this.setState({program: event.target.textContent});
    }

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

    write_char_to_tape(){
        var input = this.state.input;
        var inputPointer = this.state.inp
        var num = input.charCodeAt(inputPointer);
        var index= this.state.dp
        const newTape = [
            ...this.state.tape.slice(0, index),
            num,
            ...this.state.tape.slice(index+1)
        ]
        this.setState({
            tape: newTape,
            inp: inputPointer +1
        })
    }
    componentDidUpdate(){
        var that = this;
        setTimeout(function(){
            if(that.state.running === true || that.state.step === true){
                that.run_debugger();
            }
        }, 81);
    }

    start_debugger(){
        this.setState({
            eip:0,
            dp:0,
            inp: 0,
            tape: new Array(30000).fill(0),
            running:true,
            error:"None",
            output: ""
        })
    }

    step(){
        this.setState({step: true})
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
            case ',':
                this.write_char_to_tape()
                break;
            case '!':
                this.setState({running: false, breakpoint:true});
                break;
            default:
                break;
        }

        if(this.state.step === true){
            this.setState({running:false, step: false});
        }
        if(eip === this.state.program.length){
            this.setState({running: false});
        } else {
            this.setState({execNum: execNum+1,eip: eip+1});
        }
    }

    render(){

        return (<div className="debuggerDisplay">

            <DebugInfo eip={this.state.eip} dp={this.state.dp} runningStatus={this.state.running} errorMessage={this.state.error} error={this.state.error} execNum={this.state.execNum} breakpoint={this.state.breakpoint}/> 
            <div className="debugOptions"> 
                <button id="run" onClick={() => {this.start_debugger()}}>Run</button> 
                <button id="step" onClick={() => {this.step()}}>Step</button> 
                <button id="continue" onClick={() => {this.continue_from_breakpoint()}}>Continue</button> 

            </div> 
            <TapeDisplay tape={this.state.tape} order={this.state.debugging_memory} dp={this.state.dp} /> 
            <div className="inline"> 
                <div className="inputContainer"> 
                    <Output output={this.state.output} /> 
                    <div className="inputFieldContainer"> 
                        <h3>Standard Input</h3> 
                        <input onChange={this.handleInputChange} /> 
                    </div> 
                    <div className="inputFieldContainer"> 
                        <h3>Brainfuck Program</h3> 
                        <div contentEditable="true" suppressContentEditableWarning={true} id="programInput" type="text" onInput={this.handleProgramChange}> 
                            {this.state.program} 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </div> 
        ) 
    } 
} 
 
export default Debugger; 
