import React, {Component} from 'react';

class TapeDisplay extends Component{

    render_cell(cell, index){
        return(<div className="tapeCell" style={{order: index}} key={index}>{cell}</div>)
    }

    render_cells(tape,order){
        var tapeArray = [];
        for(var i=0;i<order;i++){
            tapeArray.push(this.render_cell(tape[i], i))
        }
        return tapeArray;
    }

    render(){
        return(
            <div className="tapeDisplay">
                {this.render_cells(this.props.tape, this.props.order)}
            </div>
        )
    }
}

export default TapeDisplay;


