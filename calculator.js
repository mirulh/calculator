// current total
let runningTotal = 0;

// initial value
let buffer = "0";

let displayCalc = 0;

// keep the operator somewhere. the state interface
let previousOperator;

const screen = document.querySelector(".screen");
const calculation = document.querySelector(".calculation-screen");

// 2nd step - if the button is number will execute function handleNumber(value), if it is not number will execute handleSymbol(value)

// value is referring to whatever button that is clicked
function buttonClick(value) {
  //   debugger; //Eureka! add debugger in code line then click on button to see
  // console.log(value); // to display the value
  if (isNaN(value)) {
    // this is not a number
    handleSymbol(value);
  } else {
    // this is a number
    handleNumber(value);
  }
  screen.innerText = buffer;
  // declared here so it will be applicable to symbol and number every time.
}

// 4th step - if the clicked button is a symbol/operator - the following will execute

// if the symbol is C the buffer = 0 (cleared out)
// if the symbol is operator handleMath function will execute
// if the symbol is 'equal' the flushOperation will execute

function handleSymbol(symbol) {
  // console.log("handleSymbol", symbol); // Eureka! use text to reference which function the value will be passed into
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;

    case "=":
      if (previousOperator === null) {
        // you need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null; // after flushOperation there is not calculation left so back to empty
      buffer = runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

// 6th step - (still don't understand)

function handleMath(symbol) {
  //   console.log("handleMath", symbol);
  if (buffer === "0") {
    // do nothing
    return; // get the function to end
  }

  // why no else if, because return is used
  const intBuffer = parseInt(buffer); // running total is whatever is in the buffer
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;

  buffer = "0";
}

// 5th step - the operator is selected then the following operation will execute

function flushOperation(intBuffer) {
  //   debugger;
  if (previousOperator === "+") {
    runningTotal = runningTotal + intBuffer;
  } //
  else if (previousOperator === "-") {
    runningTotal = runningTotal - intBuffer;
  } //
  else if (previousOperator === "×") {
    runningTotal = runningTotal * intBuffer;
  } //
  else {
    runningTotal = runningTotal / intBuffer;
  }
  //   console.log("running total", runningTotal);
}

// 3rd step - if the clicked number is 0, sets the buffer to 0, if not the buffer (initial value, 0) is added to the current clicked number
// what is buffer - store (data) in a buffer while it is being processed or transferred.

// numberString; to remind that this is a number but it is still a string
function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer = buffer + numberString;
  }
  // console.log("buffer", buffer); to check the buffer in the console
  //   screen.innerText = buffer; move to the buttonClick so it's applicable to symbol and number regardless
}

function rerender() {
  screen.innerText = buffer;
}

// 1st step - event.target.innerText - whatever button that is clicked will retrieved the innerText (1-9, operator, symbols), this is important step!

// a shorthand for initiate
function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText); // o->> buttonClick(3) etc
      console.log(event.target.innerText);
      // innerText referencing the screen text
      // according to Holt, event is coming from the browser whatever the information it handed over
    });
}

init();

// Eureka! I've created my own method to check what is the value store in the function
// for example:

//          console.log(event.target.innerText) will give out whatever button that is clicked, eg. 3

// Put the value next to the function to track what the value will be retrieved using this new symbol

//          o->> buttonClick(3)      'o' stands for output and ->> as a reference arrow to make it easy to navigate
