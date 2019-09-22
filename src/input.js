import React, {Component} from 'react';

class Input extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="inputFieldContainer">
                <h3>Program Input</h3>
                <input onChange={this.handleChange} />
            </div>
        )
    }

}

export default Input;
