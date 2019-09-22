import React, {Component} from 'react';

class TapeDisplay extends Component{

    render_cell(cell, index, active){
        var cName = "tapeCell"
        if(active){
            cName += " active"
        }
        return(<div className={cName} style={{order: index}} key={index}>{cell}</div>)
    }

    render_cells(tape,order,dp){
        var tapeArray = [];
        for(var i=0;i<order+1;i++){
            var active = false;
            if(i===dp){
                active = true;
            }
            tapeArray.push(this.render_cell(tape[i], i, active))
        }
        return tapeArray;
    }

    render(){
        return(
            <div className="tapeMemoryDisplay">
                <p>
                    Currently selected tape position: {this.props.dp+1}
                </p>
                <div className="tapeDisplay">
                {this.render_cells(this.props.tape, this.props.order, this.props.dp)}
                </div>
            </div>
        )
    }
}

export default TapeDisplay;


