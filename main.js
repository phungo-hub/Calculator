const keys = document.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')
const calculator = document.querySelector('.calculator')
const clear = document.querySelector('.clear')

function calculate(n1, operator, n2) {
    n1 = parseFloat(n1)
    n2 = parseFloat(n2)

    if (operator === 'add') {return n1 + n2}
    if (operator === 'subtract') {return n1 - n2}
    if (operator === 'multiply') {return n1 * n2}
    if (operator === 'divide') {return n1 / n2}
}

function delLastDigit (str) {
    return str = str.substring(0, str.length() -1)
}

keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const displayedNum = display.textContent
        const keyContent = key.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        const fixedNumber = calculator.dataset.fixedNumber


        if (!action) {
            if (displayedNum === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        
            calculator.dataset.previousKeyType = 'number'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
                // key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.firstValue = displayedNum
                calculator.dataset.operator = action
            }

        if (action === 'decimal') {
            if (previousKeyType === 'decimal') {
                display.textContent = displayedNum
            } else {
                display.textContent = displayedNum + '.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        } 

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
          }

        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
              } else {
                key.textContent = 'AC'
              }

            display.textContent = 0
            
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (previousKeyType === 'calculate') {
                firstValue = result
                secondValue = fixedNumber
            }

            result = calculate(firstValue, operator, secondValue)
            display.textContent = result
            calculator.dataset.previousKeyType = 'calculate'
            calculator.dataset.fixedNumber = secondValue
        }
    }
})