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

        var runningStatus;
        if(this.props.runningStatus === true){
            runningStatus = "true"
            runningClass = "greenLight"
        } else {
            runningStatus = "false"
        }

        var errorMessageClass = "";
        var message = this.props.error;
        if(this.props.errorMessage !== "None" && this.props.finished === false){
            errorMessageClass = "errorMessage"
        } else if(this.props.errorMessage !== "None" && this.props.finished === true){
            errorMessageClass = "greenLight"
        }

        return(
            <div>
                <h3>Debugger</h3>
                <ul>
                    <li>Instruction Pointer: {this.props.eip}</li>
                    <li>Data Pointer: {this.props.dp}</li>
                    <li className={runningClass}>Running status:  {runningStatus}</li>
                    <li className={bpClass} >Breakpoint: {bpStatus}</li>
                    <li className={errorMessageClass}>{message}</li>
                    <li>Number of executed instructions: {this.props.execNum}</li>

                </ul>
            </div>
        )
    }

}

export default DebugInfo;
