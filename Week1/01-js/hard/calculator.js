class Calculator {
  constructor() {
    this.result = 0;
  }

  add(number) {
    this.result += number;
  }

  subtract(number) {
    this.result -= number;
  }

  multiply(number) {
    this.result *= number;
  }

  divide(number) {
    if (number === 0) throw new Error('Division by zero');
    this.result /= number;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    const cleanExpression = expression.replace(/\s+/g, '');
    if (/[^0-9+\-*/().]/.test(cleanExpression)) {
      throw new Error('Invalid characters in expression');
    }
    if (!this.areParenthesesBalanced(cleanExpression)) {
      throw new Error('Mismatched parentheses');
    }
    this.result = this.evaluateExpression(cleanExpression);
    return this.result;
  }

  areParenthesesBalanced(expression) {
    let stack = [];
    for (let char of expression) {
      if (char === '(') {
        stack.push(char);
      } else if (char === ')') {
        if (stack.length === 0) {
          return false;
        }
        stack.pop();
      }
    }
    return stack.length === 0;
  }

  evaluateExpression(expression) {
    let tokens = this.tokenize(expression);
    let values = [];
    let operators = [];

    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];

      if (/\d/.test(token)) {
        values.push(parseFloat(token));
      } else if (token === '(') {
        operators.push(token);
      } else if (token === ')') {
        while (operators.length && operators[operators.length - 1] !== '(') {
          this.applyOperator(values, operators.pop());
        }
        operators.pop();
      } else if (this.isOperator(token)) {
        while (operators.length && this.precedence(operators[operators.length - 1]) >= this.precedence(token)) {
          this.applyOperator(values, operators.pop());
        }
        operators.push(token);
      }
    }

    while (operators.length) {
      this.applyOperator(values, operators.pop());
    }

    return values.pop();
  }

  tokenize(expression) {
    let tokens = [];
    let numberBuffer = '';

    for (let char of expression) {
      if (/\d/.test(char) || char === '.') {
        numberBuffer += char;
      } else {
        if (numberBuffer) {
          tokens.push(numberBuffer);
          numberBuffer = '';
        }
        tokens.push(char);
      }
    }

    if (numberBuffer) {
      tokens.push(numberBuffer);
    }

    return tokens;
  }

  applyOperator(values, operator) {
    let b = values.pop();
    let a = values.pop();

    switch (operator) {
      case '+':
        values.push(a + b);
        break;
      case '-':
        values.push(a - b);
        break;
      case '*':
        values.push(a * b);
        break;
      case '/':
        if (b === 0) throw new Error('Division by zero');
        values.push(a / b);
        break;
    }
  }

  isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }

  precedence(operator) {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }
}

module.exports = Calculator;