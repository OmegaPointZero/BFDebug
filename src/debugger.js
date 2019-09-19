import React, {Component} from 'react';
import './App.css';



class Debugger extends Component {
    constructor(props){
        super(props);
        this.state = { 
            program: null,
            eip: 0,
            running: false,
            tape: new Array(30000).fill(0),
            debugging_memory: new Array(),
        }
    }

    update_program(prog){
        this.state.program = prog;
        console.log("Updating program:\n"+prog);
    }

    render(){
        this.update_program("++++[>+>++>+++>++++<<<<-]")
        return (
            
            <p>Debugger is going here. I'm in love with Katelyn and she probably doesn't think about me anymore. Sooo...let's get some kind of fucking job so we can go back home, learn to dance, get your shit together, and take her out.</p>

        )
    }
}

export default Debugger;
