/**
* App component renders the main UI for the password generator.
* It manages state for password length, allowed characters, and the generated password.
* Handles user input for settings, generating a new password, and copying to clipboard.
* Renders the UI elements like input controls, buttons, and password display.
* Uses React hooks like useState, useCallback, useRef to manage state and effects.
* Imports and renders Toaster from react-hot-toast for copy notifications.
*/
import React from 'react'
import { useState, useCallback, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// notification message 
const notify = () => toast('Password Copied', {
  duration: 2000
});

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  // useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

   if (numberAllowed) str += "0123456789"
    if (charAllowed) str+="!@#$%^&*?><_+"
  
    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)   
    }
    setPassword(pass)
  }, [
    length,
    numberAllowed,
    charAllowed,
    setPassword
  ])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed,charAllowed,passwordGenerator])
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
    notify();
  },[password])
    
  
  return (
    <main className='container flex flex-col justify-center items-center min-h-screen bg-gray-900'>
      <div className='bg-gray-800 p-4 max-w-md flex flex-col gap-y-2 rounded-md overflow-hidden '>
        <h1 className='text-3xl text-white font-bold'>Password Generator</h1>
        <div className='flex overflow-hidden rounded-md mt-2'>
           <input
          type="text"
          value={password}
          className=' outline-green-600 p-2 w-full font-bold text-black'
          placeholder='password'
            readOnly
            ref={passwordRef}
          />
          
          <button className='bg-green-500 text-black font-sans rounded-tr-md rounded-br-md px-4 py-0 hover:bg-black hover:text-green-600 outline-green-500'
          onClick={copyPasswordToClipboard}
          >copy</button>
        </div>
        
        <div className='flex gap-x-2 text-white accent-green-600'>
          <div className='flex gap-x-2'>
            <input 
                type="range"
                min={6}
                max={30}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>

          <div className='flex gap-x-2'>
            <input
               type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          
          <div className='flex gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='charInput'
              className='font-semibold text-2xl'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor='charInput'>Characters</label>
           </div>
        </div>
        <button className='py-2 bg-green-600 text-black hover:bg-green-500'
        onClick={passwordGenerator}>Generate</button>
      </div>
      <div className='flex-start mt-4 '>
         <h1 className='underline text-2xl text-green-700'>cons</h1>
      <ul className='text-white mt-2'>
        <li className='list-disc'>It can Select only first 20 characters</li>
        <li className='list-disc'>It can generate upto 30 characters</li>
      </ul>
      </div>
     

      <Toaster/>
 </main>
  )
}

export default App