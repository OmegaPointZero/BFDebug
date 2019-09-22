import React, {Component} from 'react';

class TapeDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            tape: this.props.tape,
            order: this.props.order
        }
    }

    render_cells(tape,order){
        var display_cells = [];
        for(var i=0;i<order;i++){
            console.log(`tape[${i}]: ${tape[i]}`)
            display_cells[i] = tape[i];
        }
        console.log(`display_cells[]:`)
        console.log(display_cells)
    }

    render(){
        this.render_cells(this.props.tape, this.props.order)
        return(<h2>TAPE DISPLAY!</h2>)
    }
}

export default TapeDisplay;


