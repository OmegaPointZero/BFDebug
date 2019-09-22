import React, {Component} from 'react';

class DebugInfo extends Component {


    render(){
        var bpClass = "";
        var bpStatus;
        var runningClass;
        if(this.props.breakpoint === true){
            bpStatus = "true";
            bpClass = "errorMessage";
        } else {
            bpStatus = "false";
        }

        if(this.props.runningStatus === "true"){
            runningClass = "greenLight"
        }

        return(
            <div>
                <h3>Debugger</h3>
                <ul>
                    <li>Instruction Pointer: {this.props.eip}</li>
                    <li>Data Pointer: {this.props.dp}</li>
                    <li className={runningClass}>Running status:  {this.props.runningStatus}</li>
                    <li className={bpClass} >Breakpoint: {bpStatus}</li>
                    <li className={this.props.errorMessage}>Error: {this.props.error}</li>
                    <li>Number of executed instructions: {this.props.execNum}</li>
                </ul>
            </div>
        )
    }

}

export default DebugInfo;
