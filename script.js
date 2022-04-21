// Store all the info with calculator class 
// Constructor: takes all the inputs and functions for our calculator 
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        // convert to string, so can have the numbers together instead of JS adding it 
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return 
        switch (this.operation) {
            case '+': 
            computation = prev + current
            break
            case '-': 
            computation = prev - current
            break
            case '*': 
            computation = prev * current
            break
            case '÷': 
            computation = prev / current
            break
            default: 
                return 
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


// selecting the data attributes with brackets 
// for single element we use regular querySelector 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Define new calc class object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Number Buttons 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // use the number thats in the button user clicks
        calculator.appendNumber(button.innerText)
        // update the number in the output when clicked
        calculator.updateDisplay()
    })
})

// Operation Buttons 
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // use the operation thats in the button user clicks
        calculator.chooseOperation(button.innerText)
        // update the number in the output when clicked
        calculator.updateDisplay()
    })
})

// Equal 
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// All Clear
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})