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

/* ++++++++++[>++++++<-]>++++++++.+.----.+++.--.-.+.+++.--.--.+++++.-.
*/

    handleSubmit(){
        var program = this.state.program
        this.update_program(program);
    }


    bf_parse(instruction){
        if(instruction === "+"){
            const newTape = this.state.tape.slice();
            var num = newTape[this.state.dp];
            num === 255 ? num = 0 : num++;
            newTape[this.state.dp] = num;
            this.setState({tape:newTape});
        } else if(instruction === "-"){
            const newTape = this.state.tape.slice();
            var number = newTape[this.state.dp];
            number === 0 ? number = 255 : number--;
            newTape[this.state.dp] = number;
            this.setState({tape:newTape})
        } else if(instruction === ">"){
            this.setState((state)=>{return {dp: state.dp +1}});
        } else if(instruction === "<"){
            this.setState((state)=>{return {dp: state.dp - 1}});
        }
    }

    run_debugger(){
        while(this.state.running){
            var current_instruction = this.state.program[this.state.eip];
            this.bf_parse(current_instruction)
            this.setState({eip: this.state.eip+1})
            if(this.state.eip===this.state.program.length){
                console.log(`Program ended (eip: ${this.state.eip})`)
            }
        }        
    }

    initialize(){
        console.log("initialize()")
        this.setState({eip:0,dp:0,running:true})
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
                <button id="run" onClick={() => {this.initialize(); this.run_debugger()}}>Run</button> <button id="pause" onClick={ () => {this.pause()} }>Pause</button> <button id="continue">Continue</button> 
            </div>
                <button onClick={(state) => {this.handleSubmit()}}>Load Program</button>
                                <textarea id="programInput" type="text" value={this.state.value} onChange={this.handleChange} /><br />
            <p>Debugger is going here. I'm in love with Katelyn and she probably doesn't think about me anymore. Sooo...let's get some kind of fucking job so we can go back home, learn to dance, get your shit together, and take her out.</p>


        </div>
        )
    }
}

export default Debugger;    
