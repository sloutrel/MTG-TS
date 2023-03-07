import React from 'react';
import { useState } from 'react';
import Counter from './Counter';
import {v4 as uuid} from 'uuid';
import {AiOutlinePlus} from 'react-icons/ai/index'
import { CounterType } from '../models/counterType';
import './Counter.css'

const CounterSelect = () => {
  const [customName, setCustomName] = useState<string>()
  const [selected, setSelected] = useState<string>()
  const [counters, setCounters] = useState<CounterType[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleSelectCounters = () => {
    setIsOpen(!isOpen)
  }
  const handleCounterSelect =(e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
  }
  const handleCustomName =(e:React.ChangeEvent<HTMLInputElement>) => {
    setCustomName(e.target.value)
  }
  const handleRemoveCounter = (counter:CounterType) =>{
    setCounters((prevState)=> prevState.filter((counters)=>counters.id !== counter.id))
  }
  const handleCounterSubmit =(e:React.FormEvent) => {
    e.preventDefault()
    if(selected !== undefined){
      setCounters((prevState)=>[...prevState, {name: customName ? customName : selected, id: uuid()}])
    }
    setIsOpen(!isOpen)
    setCustomName('')
    setSelected('')
  }
  return ( 
    <div className='counters'>
      <div className='counters-wrapper'>

      {counters.map(counter=>
        <Counter removeCounter={handleRemoveCounter} countType={counter}/>
        )}
      </div>
      <div className='new-counter-button' onClick={toggleSelectCounters}><AiOutlinePlus />Counters</div>
      {isOpen &&
      <form className='counter-select' onSubmit={handleCounterSubmit}>
        <select onChange={handleCounterSelect}>
        <option value="" selected disabled hidden>Add Counter</option>
          <option value="infect">Infect</option>
          <option value="charge">Charge</option>
          <option value="food">Food</option>
          <option value="treasure">Treasure</option>
          <option value="spore">Spore</option>
          <option value="custom">Other</option>
        </select>
        {selected ==='custom' && <label>Counter Name:<input className='counter-input' value={customName} onChange={handleCustomName}></input></label>}
        <button className='counter-save-button'>Add</button>
      </form>
      }
    </div>
   );
}
 
export default CounterSelect;