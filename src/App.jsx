import { useState } from "react";

function App() {
  
  const [screenValue, setScreenValue] = useState(0)

  const buttonValues = [
    "%", "CE", "C", "X", 
    "7", "8", "9", "/", 
    "4", "5", "6", "-", 
    "1", "2", "3", "+", 
    "+/-", "0", ",", "="
  ];

  function handle(value) {
    setScreenValue(value)
  }
  
  const buttonClasss = "bg-slate-200 hover:bg-slate-300 text-black font-bold text-lg py-[6px] px-4 border-b-4 hover:border-b-2 border-x-2 border-t-2 border-slate-500 hover:border-black rounded transition-all h-12"

  return (
    <>
      <div className='bgCalculatrice bg-green-400 w-[430px] h-[600px] rounded-[40px] border-2 py-3 px-5 border-black flex items-center flex-col relative'>
        <h1 className=" text-black text-xl text-left absolute left-0 ml-5">Fx Mdflamorangels</h1>
        <div className="bg-slate-500 h-[80px] w-full mt-8 flex justify-center items-center rounded">
          <input type="text" className="w-full h-full bg-transparent text-right text-black font-bold px-2 text-5xl" readOnly disabled value={screenValue} />
        </div>
        <div className="sectionButton grid grid-cols-4 gap-8 mt-8">
          {buttonValues.map((value,index) => (
            <button key={index} className={buttonClasss} onClick={() => handle(value)}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
