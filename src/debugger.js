import React, {Component} from 'react';
import TapeDisplay from './tape';
import './App.css';

class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: null,
            eip: 0,
            dp: 0,
            running: false,
            tape: new Array(30000).fill(0),
            debugging_memory: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({program: event.target.value, running:false});
    }

    debugger_obj = {
        program: null,
        eip: 0,
        dp: 0,
        running: false,
        tape: new Array(30000).fill(0),
        debugging_memory: 0,
    }
/* 
++++++++++[>++++++++++>++++++++++>++++++++++>++++++++++<<<<-]>.>.>.>.
*/

    handleSubmit(){
        var program = this.state.program
        this.update_program(program);
    }

    bf_parse(instruction){
        console.log(`parsing instruction: ${instruction}`)
        if(instruction === "+"){
            const newTape = this.state.tape.slice();
            var num = newTape[this.state.dp];
            console.log(`num: ${num}`)
            num === 255 ? num = 0 : num++;
            console.log(`operated num: ${num}`)
            console.log(`dp: ${this.state.dp}`)
            newTape[this.state.dp] = num;
            console.log(`newtape: ${newTape.slice(0,40)}`)
            this.setState((state) => ({tape:newTape}));
        } else if(instruction === "-"){
            const newTape = this.state.tape.slice();
            var number = newTape[this.state.dp];
            number === 0 ? number = 255 : number--;
            newTape[this.state.dp] = number;
/*
this.setState((state) => ({ value: state.value + 1}));
*/
            this.setState((state) => ({ tape: newTape}));
        } else if(instruction === ">"){
            this.setState((state) => ( {dp: state.dp +1}));
            if(this.state.dp > this.state.debugging_memory){
                this.setState((state)=> ({debugging_memory: this.state.dp}));
            }
        } else if(instruction === "<"){
            this.setState((state)=> ({dp: state.dp - 1}));
        }
        var eip = this.state.eip;
        var neweip = eip+1
        this.setState((state) => ({eip: neweip}));
        if(instruction !== undefined){
            return true;
        } else {
            this.setState((state) => ({running:false}))
            return false;
        }
    }

    run_debugger(){
        var len = this.state.program.length;
        for(var i=0;i<len;i++){
            this.bf_parse(this.state.program[i])
        }
    }        


    initialize(){
        console.log("initialize()")
        this.setState({eip:0,dp:0,running:true});
    }

    pause(){
        this.setState({running:false})
        console.log('paused')
    }

    update_program(prog){
        console.log("Updating program:\n"+prog);
        this.setState({program:prog})
    }

    render(){
        return (<div>
            <div className="tapeMemoryDisplay">
                <TapeDisplay tape={this.state.tape} order={this.state.debugging_memory} />

            </div>
            <div className="debugOptions">
                <button id="run" onClick={() => {this.initialize(); this.run_debugger()}}>Run</button> <button id="pause" onClick={ () => {this.pause()} }>Pause</button> <button id="continue">Continue</button> <button onClick={(state) => {this.handleSubmit()}}>Load Program</button>
            </div>
            <div><br />
            <textarea id="programInput" type="text" value={this.state.value} onChange={this.handleChange} />
            </div>            
        </div>
        )
    }
}

export default Debugger;    
