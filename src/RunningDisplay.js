import React, {Component} from 'react';

class RunningDisplay extends Component {

    render(){
        var program = this.props.program;
        var eip = this.props.eip;


        var prefix = program.slice(0,eip)
        var active = program.slice(eip,eip+1)
        var suffix = program.slice(eip+1,)



        return(
            <div>
                <span className="runningProgramInactiveDisplay">{prefix}</span>
                <span className="runningProgramActiveDisplay">{active}</span>
                <span className="runningProgramInactiveDisplay">{suffix}</span>
            </div>
        )             

    }

/*

++++++++++[>++++++++++>++++++++++>++++++++++>++++++++++>++++++++++<<<<<<-]>.>.>..>.>.

    createHighlight(){
        var program = this.state.program;
        var eip = this.state.eip;


        return(
            <div>
                <span className="runningProgramInactiveDisplay">{prefix}</span>
                <span className="runningProgramActiveDisplay">{active}</span>
                <span className="runningProgramInactiveDisplay">{suffix}</span>
            </div>
        )        
    }
*/


}

export default RunningDisplay;
