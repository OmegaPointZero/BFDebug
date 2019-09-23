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

### 0.9.9 Updates

All basic features are fully functional.  There is a display for the debugging information, buttons to run, continue and step through the program, a display for the tape, a display for the STDOUT, a display for the STDIN, and a display for the currently loaded program. For all intents and purposes, it's fully functional.

There is, however, additional work to be done. 

* Displays for the STDIN, STDOUT and Program should be re-styled to look better

* Testing of both desktop/mobile displays needs to be done, until it's functional and aesthetic for both. 

* The debugger should highlight the currently executed instruction

* Time delay for the execution instruction needs to be fixed

* Input alert in case the debugger tries to read from STDIN to the 


