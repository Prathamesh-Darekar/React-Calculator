import './App.css';
import Button from "./components/Button";
import { useState } from 'react';

function App() {
  let [result, setResult] = useState(''); // State used to track Result of the operation
  let [expression, setExpression] = useState(''); // State used to hold the expression 
  let [braceCount, setBraceCount] = useState(0); // State used to keep track of number of '(' that has no ')'
  let [str, setStr] = useState('');
  let [point, setPoint] = useState(false); // State used to keep track of '.' in the code
  function calculate(value) {
    if ((value === '00' || value === '0') && (expression === '' || (!(Number(expression.slice(-1)) > -1) && !expression.slice(-1) === '.')))
      return;
    if (value === '.') {
      if (point === true)  // Condition is satisfied if '.' is already present in the operand
        return;
      else
        setPoint(true);
    }
    if ((value === '+' || value === '/' || value === '*' || value === '()') && expression === '')
      return;
    else if (value === '+' || value === '/' || value === '*' || value === '-') {
      setPoint(false);
      if (str.slice(-1) === '(' || expression.slice(-1) === '-' || expression.slice(-1) === '+' || expression.slice(-1) === '*' || expression.slice(-1) === '/') {
        if (value === '-' && str.slice(-1) === '(') {
          setStr(str = str.concat(value));
          setExpression(expression = expression.concat(value));
        }
        return;
      }
    }
    setStr(str = str.concat(value));
    if (value === '(') {
      if (expression.slice(-1) !== '+' && expression.slice(-1) !== '-' && expression.slice(-1) !== '/' && expression.slice(-1) !== '*') {
        setStr(str = str.slice(0, -1));
        return;
      }
      setBraceCount(braceCount += 1);  //Incrementing the braceCount whenever a bracket is opened
    }
    if (value === ")" && braceCount > 0) {
      if (!(Number(expression.slice(-1)) > -1)) {
        setStr(str = str.slice(0, -1));
        return;
      }
      setPoint(true);
      setBraceCount(braceCount -= 1);  //Decrementing the braceCount whenever a bracket is closed
    }
    else if (value === ")") {
      if (braceCount === 0)
        return;  // Prevents user from entering ')' when there are no already unpaired '('
    }
    setExpression(expression = expression.concat(value));  // Concatenating the value of the button user cicked 
    if (value !== '+' && value !== '-' && value !== '/' && value !== '*') {
      if (braceCount === 0 && expression.slice(-1) !== '.') {
        setResult(eval(expression));  // Calculates the Expression
      }
    }
  }
  // FUNCTION FOR '<' BUTTON
  function Undo() {
    let lastChar = expression.slice(-1);
    setExpression(expression = expression.slice(0, -1));
    setStr(str = str.slice(0, -1));
    setResult('');
    if (lastChar === '(')
      setBraceCount(braceCount -= 1);
    else if (lastChar === ")" && braceCount > 0)
      setBraceCount(braceCount += 1);
    else if (lastChar === '.')
      setPoint(false);
    return;
  }
  // FUNCTION FOR '=' BUTTON
  function Submit() {
    setExpression(expression = String(result));
    setResult('');
    setBraceCount(0);
    setPoint(false);
    setStr('');
  }
  // FUNCTION FOR 'C' BUTTON
  function Close() {
    setExpression('');
    setResult('');
    setBraceCount(0);
    setStr('');
    setPoint(false)
  }
  
  return (
    <div className="App">
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan="3">
                <div>
                  <input disabled type="text" id="input-box1" pattern="[0-9]" value={expression} /><br />
                  <input disabled type="text" id="input-box2" value={result} />
                </div>
              </td>
              <td><button id="crimson" onClick={() => Close()}>C</button></td>
            </tr>
            <tr>
              <td><Button text={'7'} calculate={calculate} /></td>
              <td><Button text={'8'} calculate={calculate} /></td>
              <td><Button text={'9'} calculate={calculate} /></td>
              <td className='last-column'><Button text={'*'} calculate={calculate} /></td>
            </tr>
            <tr>
              <td><Button text={'4'} calculate={calculate} /></td>
              <td><Button text={'5'} calculate={calculate} /></td>
              <td><Button text={'6'} calculate={calculate} /></td>
              <td className='last-column'><Button text={"-"} calculate={calculate} /></td>
            </tr>
            <tr>
              <td><Button text={'1'} calculate={calculate} /></td>
              <td><Button text={'2'} calculate={calculate} /></td>
              <td><Button text={'3'} calculate={calculate} /></td>
              <td className='last-column'><Button text={'+'} calculate={calculate} /></td>
            </tr>
            <tr>
              <td><Button text={'0'} calculate={calculate} /></td>
              <td><Button text={'00'} calculate={calculate} /></td>
              <td><button onClick={() => Undo()}>{'<'}</button></td>
              <td className='last-column'><Button text={'/'} calculate={calculate} /></td>
            </tr>
            <tr>
              <td><Button text={'.'} calculate={calculate} /></td>
              <td><button id="crimson" onClick={() => Submit()}>=</button></td>
              <td className='last-column'><Button text={'('} calculate={calculate} /></td>
              <td className='last-column'><Button text={')'} calculate={calculate} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
