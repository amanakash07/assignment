import React, { useState } from 'react';

export default function App() {
  const [mode, setMode] = useState(''); // const, argument, and, or
  const [selectedArg, setSelectedArg] = useState('')
  
  function handleArgSelect(e) {
    setSelectedArg('this')
  }

  function handleModeSelect(e) {
    console.log(e.target.value)
    setMode(e.target.value)
  }
  const [args, setArgs] = useState([
    {
      text: '',
      isTrue: false,
      key: 0,
    },
  ]);
  function handleOnInputChange(e) {
    let editedArgs = [...args];
    editedArgs[e.target.name].text = e.target.value;
    setArgs(editedArgs);
  }

  function handleSelect(e) {
    let editedArgs = [...args];
    let isTrueSet = e.target.value === 'true';
    editedArgs[e.target.name].isTrue = isTrueSet;

    setArgs(editedArgs);
  }

  function handleAdd() {
    setArgs([
      ...args,
      {
        text: '',
        isTrue: false,
        key: args.length,
      },
    ]);
  }

  return (
    <div className="wrapper">
    <div className="inner">
      {args.map((arg, key) => {
        return (
          <Arg
            key={arg.key}
            name={key}
            text={arg.text}
            isTrue={arg.isTrue}
            onInputChange={handleOnInputChange}
            onSelectChange={handleSelect}
          />
        );
      })}
      </div>
      <button onClick={handleAdd}>+ add arg</button>
      <br />
      <AddOperator args={args} onChange={handleModeSelect} callback={setMode} selectArg={handleArgSelect} mode={mode}/>
      <Result args={args} mode={mode} selectedArg={selectedArg} />
   </div>
  );
}
function AddOperator({ args, callback, mode, selectArg }) {
  function selectMode(e) {
    callback(e.target.value) 
  }
  function onSelectArg(e) {
    selectArg(e.target.value)
  }
  return (
    <>
      <select onChange={selectMode}>
        <option>--select--</option>
        <option value='const'>Constant</option>
        <option value='argument'>Argument</option>
        <option value='and'>AND</option>
        <option value='or'>OR</option>
      </select>
      <br />
      {mode === 'argument' && (
        <>
          <select onChange={onSelectArg}>
          <option>--select--</option>
           {args.map((arg, key) => {
             return <option key={key} name={key} value={key}>{args[key].text}</option>
           })}
          </select>
        </>
      )}
    </>
  );
}

function Arg({ text, name, isTrue, onInputChange, onSelectChange }) {
  return (
    <>
      <div className='arg'>
        <input
          type='text'
          placeholder='myArg'
          value={text}
          onChange={onInputChange}
          name={name}
        />
        <select
          onChange={onSelectChange}
          defaultValue='false'
          name={name}
          disabled={text ? false : true}
        >
          <option value='true' name='true'>
            True
          </option>
          <option value='false' name='false'>
            False
          </option>
        </select>
      </div>
    </>
  );
}


function Result({ args, mode, selectedArg }) {
  const [result, setResult] = useState(false);
  console.log(args);

  React.useEffect(() => {
    let checkResult
    switch(mode){
      case 'const':
       break
      case 'argument': 
      break
      case 'and':
      break
      case 'or':
      break
      default:
       checkResult = args.some(el => el.isTrue === false);
      }

    setResult(!checkResult);
  }, [args, mode, selectedArg]);

  return (
    <div>
      <div>Result: {result.toString()}</div>{' '}
    </div>
  );
}
