import React, {Component} from 'react'

class Output extends Component {
    

    
    render(){
        
        return(
            <div className="inputFieldContainer">
                <h3>Program output</h3>
                <input disabled="disabled" value={this.props.output}></input>
            </div>
        )
    }
}

export default Output;
