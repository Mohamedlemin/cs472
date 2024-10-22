// Calculation.ts
import { Calculator } from './exo2';

const calculator = new Calculator();

const num1 = 10;
const num2 = 5;

console.log(`Add: ${calculator.add(num1, num2)}`);       
console.log(`Subtract: ${calculator.subtract(num1, num2)}`); 
console.log(`Multiply: ${calculator.multiply(num1, num2)}`); 
console.log(`Divide: ${calculator.divide(num1, num2)}`);    