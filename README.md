# BFD - The BrainFuck Debugger

BFDebugger is an application built with React.js to allow users to debug brainfuck applications. This will provide a field to input STDIN input, a window that keeps track of STDOUT output, a window where the .bf code will be pasted, and a window that shows the tape. The tape's window is made of repeating cells of an identical width, that wrap (probably flex-box? Unless React has something better than that).

An overview of the debugger in it's current phase will be kept in this README. This should be as easy as possible to update and make additions to, making it easier to create extensions of the language, and debug them as well.

The debugger is ultimately held in the state of `debugger.js`:

* `state.program` is the actual brainfuck program, loaded to be executed

* `state.tape` is the program's memory tape, 30000 cells. Changing this value in the `new Array(30000)` function will allow you to customize the size of the tape.

* `state.debugging_memory` is the index of the highest memory cell accessed by the program. The debugger will use this number to determine how many memory cells to display (so that we only render memory cells that have been accessed, and ostensibly used, rather than an arbitrary amount).

* `state.running` is whether or not the debugger is running. Instructions only execute while `state.running` is true. Breakpoints set it to false, as does resetting it

* `state.eip` is the instruction pointer, the index of the instruction in the program array. 

* `state.dp` is the data pointer, the index of the current memory cell on the tape.

## Current state of development

The first functional version of the app is 90% complete. The top debugger panel displays all of the relevant information, input/output handled well, tape display functioning perfectly, the run/continue buttons work.

What needs to be done next is a way of loading the program from user input, as well as a pause button that acts as an immediate breakpoint.

Some work needs to be done on how the Program Output and Program Input are displayed. What looks good on desktop doesn't look good on mobile, what looks good on mobile doesn't look good on desktop.

### 0.9.1 Updates

* Input and output fields are now both functional

    * ALL of the input required for the brainfuck program is to be input at once. Missing characters get entered as NaN, need to add a prompt for this?

### Current goals

* Execute the Brainfuck code. 
    * Load the instructions from the user
    * ~~Initialize the tape
    * Testing phases:
        * *1**: Increment/decrement `state.dp` with **>** and **<**
        * **2**: Increment/decrement `state.tape[state.dp]` with **+** and **-**.
        * **3**: Print character at `state.tape[state.dp]` with **.**
        * **4**: Write input from STDIN to `state.tape[state.dp]` with **,**
        * **5**: Iterate through loop successfully
    * Add area to display output
    * Add area to input as like from STDIN~~

* Implement basic debugging
    * ~~A way to set breakpoints (ideally, by just clicking on a piece of code)~~

    * Highlight the ~~current memory cell on the tape and~~ current instruction

    * Set a delay for all instruction executions. Let the user control how fast it goes. (This is not working as expected)

