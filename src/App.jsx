import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8)   // Used for the handdel length of password
  const [numAllowed, setNumAllowed] = useState(false)      // Used for the handdle Number is add into password or not
  const [charAllowed, setCharAllowed] = useState(false)    // Used for the handdle Charecter is add into password or not

  const [password, setPassword] = useState("")  // Used for the Genration of Password

  // useRef Hook : The useRef hook in React is used to create a mutable reference that persists across renders. It allows you to directly access and modify DOM elements or hold any mutable value without causing re-renders.
  const passwordRef = useRef(null)   // Which is help to provide good UI for User in this project

  // const cachedFn = useCallback(fn, dependencies)  :-  useCallback is a React Hook that lets you cache a function definition between re-renders.
  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%&*()={[}]|"

    for (let i = 1; i <= length; i++) {

      let charInd = Math.floor(Math.random() * str.length + 1)   // Generate random number index 

      pass += str.charAt(charInd)    // Take charector at specified index location
    }

    setPassword(pass)    // We are send the pass into the variable

  }, [length, numAllowed, charAllowed, setPassword])   // [] contain dependencies when this hook is react 

  // PassCopyToClipboard 
  const copyPasswordToClipboard = useCallback(() => {

    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);  // used for the copy only selection range words
    window.navigator.clipboard.writeText(password)   // used for the copy text from the clipboard (which is create window object)

  }, [password])

  // passwordGenerator() // This is give Error of Multiple Function Re-rendering if directly call function so you need to used useEffect hook which is used for the synchroniz the function rendering 
  useEffect(() => {
    passwordGenerator()

  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-2'>Password Generator</h1>

        {/** Below is Display Part */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4 pt-3'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 '>Copy</button>
        </div>

        {/** Below is Management Part */}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}     // Help for the handdle range
            />
            <label> Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              className='cursor-pointer'
              onChange={() => { setNumAllowed((prev) => !prev) }}     // we are only change prev value to  opposit value (EX : True => False)
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charecterInput"
              className='cursor-pointer'
              onChange={() => { setCharAllowed((prev) => !prev) }}
            />
            <label htmlFor='characterInput'>Charecters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
