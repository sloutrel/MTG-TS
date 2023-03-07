import React from 'react';
import { useState } from 'react';
import {AiOutlineClose} from'react-icons/ai/index'
import { CounterType } from '../models/counterType';

interface CounterProps {
  countType: CounterType;
  removeCounter: (countType:CounterType) => void
}
const Counter = ({countType, removeCounter}:CounterProps) => {
  const [count, setCount] = useState<number>(0)
  const handleIncrement = () => {
    setCount(prevState => prevState+1)
  }
  const handleDecrement = () => {
    if(count > 0)
    setCount(prevState => prevState-1)
  }
  const handleRemoveCounter = () => {
    removeCounter(countType)
  }
  return ( 
    <div key={countType.id} className='counter-wrapper'>
      <AiOutlineClose className='counter-remove' onClick={handleRemoveCounter}/>
      <div className='counter-content'>
        <p className='counter-name'>{countType.name} : <span>{count}</span> </p>
        <div className='counter-buttons'>

        <button onClick={handleIncrement}>+</button>
        <button disabled={count===0? true : false} onClick={handleDecrement}>-</button>
        </div>
      </div>
    </div>
   );
}
 
export default Counter;