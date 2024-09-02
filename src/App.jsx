import { useState } from "react";
import { evaluate } from 'mathjs'; // Assurez-vous d'avoir installé mathjs avec `npm install mathjs`

function App() {
  const [screenValue, setScreenValue] = useState("0");
  const [currentOperation, setCurrentOperation] = useState({
    firstOperand: null,
    operator: null,
    secondOperand: null,
  });

  const buttonValues = ["%", "CE", "C", "*", "7", "8", "9", "/", "4", "5", "6", "-", "1", "2", "3", "+", "+/-", "0", ".", "="];

  function handle(value) {
    if (!isNaN(value) || value === ".") {
      if (currentOperation.operator) {
        if (value === ".") {
          if (!currentOperation.secondOperand || currentOperation.secondOperand.includes(".")) return;
        }
        setCurrentOperation(prev => ({
          ...prev,
          secondOperand: prev.secondOperand ? prev.secondOperand + value : value
        }));
        setScreenValue(prevValue => prevValue === "0" ? value : prevValue + value);
      } else {
        if (value === ".") {
          if (!currentOperation.firstOperand || currentOperation.firstOperand.includes(".")) return;
        }
        setCurrentOperation(prev => ({
          ...prev,
          firstOperand: prev.firstOperand ? prev.firstOperand + value : value
        }));
        setScreenValue(prevValue => prevValue === "0" ? value : prevValue + value);
      }
    } else if (value === "C") {
      setScreenValue("0");
      setCurrentOperation({
        firstOperand: null,
        operator: null,
        secondOperand: null
      });
    } else if (value === "=") {
      if (currentOperation.firstOperand && currentOperation.operator && currentOperation.secondOperand) {
        try {
          const expression = `${currentOperation.firstOperand}${currentOperation.operator}${currentOperation.secondOperand}`;
          const result = evaluate(expression);
          setScreenValue(result.toString());
          setCurrentOperation({
            firstOperand: result.toString(),
            operator: null,
            secondOperand: null
          });
        } catch (error) {
          console.error("Error evaluating expression:", error);
        }
      }
    } else if (value === "CE") {
      setScreenValue(prevValue => (prevValue.length > 1 ? prevValue.slice(0, -1) : "0"));
    } else if (value === "%") {
      setScreenValue(prevValue => (parseFloat(prevValue) / 100).toString());
    } else if (value === "+/-") {
      if (currentOperation.operator) {
        setCurrentOperation(prev => ({
          ...prev,
          secondOperand: prev.secondOperand ? (-parseFloat(prev.secondOperand)).toString() : null
        }));
        setScreenValue(prevValue => (-parseFloat(prevValue)).toString());
      } else {
        setCurrentOperation(prev => ({
          ...prev,
          firstOperand: prev.firstOperand ? (-parseFloat(prev.firstOperand)).toString() : null
        }));
        setScreenValue(prevValue => (-parseFloat(prevValue)).toString());
      }
    } else {
      setCurrentOperation(prev => ({
        ...prev,
        operator: value
      }));
      setScreenValue("0");
    }
    console.log(value);
    console.log(currentOperation);
  }

  const buttonClasss = "bg-slate-200 hover:bg-slate-300 text-black font-bold text-lg py-2 px-3 border-b-4 hover:border-b-2 border-x-2 border-t-2 border-slate-500 hover:border-black rounded transition-all h-12 shadow-lg";

  return (
    <div className="bg-animated-gradient w-full max-w-lg h-full max-h-screen rounded-3xl border-2 py-4 px-6 border-black flex flex-col items-center relative shadow-xl">
      <h1 className="text-black text-xl text-left absolute left-4 top-4">Fx Mdflamorangels❤️</h1>
      <div className="bg-slate-500 h-20 w-full mt-8 flex flex-col justify-center items-center rounded shadow-lg">
        <p className="w-full h-full bg-transparent text-left mt-2 text-black font-bold px-3 text-2xl md:text-4xl">{currentOperation.operator}</p>
        <input type="text" className="w-full h-full bg-transparent text-right text-black font-bold px-2 text-3xl md:text-5xl" readOnly disabled value={screenValue} />
      </div>
      <div className="sectionButton grid grid-cols-4 gap-4 mt-8">
        {buttonValues.map((value, index) => (
          <button key={index} className={buttonClasss} onClick={() => handle(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
