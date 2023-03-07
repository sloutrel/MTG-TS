import React, {ChangeEvent, useState} from 'react';
import CounterSelect from './CounterSelect';
import { FaEdit, FaCheck, FaPlus, FaMinus } from "react-icons/fa/index";
import { GiDeathSkull } from 'react-icons/gi/index'
import './PlayerCard.css'

interface PlayerCardProps {
  id: string;
  name: string;
  color: string;
  lifeCount: number;
  active: boolean;
  winner?: boolean;
  incrementLife: (id:string)=>void;
  decrementLife: (id:string)=>void;
  handleSavePlayer: (id: string, data: {name ? : string, color ? : string})=> void;
}

const PlayerCard = ({id, name, color, lifeCount, active, winner, incrementLife, decrementLife, handleSavePlayer}: PlayerCardProps): JSX.Element => {
  const [tempName, setTempName] = useState<string>()
  const [tempColor, setTempColor] = useState<string>()
  const [isEditingPlayer, setIsEditingPlayer] = useState<boolean>(false)

  const handleUpdates = () => {
    let playerUpdates: {name ? : string, color ? : string} = {}
    if(tempName?.length){
      playerUpdates.name = tempName
    }
    if(tempColor?.length){
      playerUpdates.color = tempColor
    }
      handleSavePlayer(id, playerUpdates)
      setIsEditingPlayer(false)
  }

  const handleEditPlayer = (id: string) => {
    setIsEditingPlayer(true)
  }

  let isDisabled = lifeCount===0 || winner  === true ? true: false;
  let status = active ? winner? 'WINNER' : `Lives: ${lifeCount}` : <GiDeathSkull />;
  let editOrStaticBody
  let editOrStaticButton = isEditingPlayer ? "" : <FaEdit className='edit-button' onClick={()=>handleEditPlayer(id)}/>
  let editOrStaticActions = isEditingPlayer ? <FaCheck role="button" className='confirm-button outline contrast' onClick={handleUpdates} /> :  
    <div className='actions'>
      <button role="button" disabled={isDisabled} onClick={()=>incrementLife(id)}><FaPlus /></button>
      <button role="button" disabled={isDisabled} onClick={()=>decrementLife(id)}><FaMinus /></button>
    </div>


  const onUpdateName = (e:ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value)
  }
  const onUpdateColor = (e:ChangeEvent<HTMLSelectElement>) => {
    setTempColor(e.target.value)
  }

  if(isEditingPlayer) {
    editOrStaticBody =
    <div className='player-stats editing'>
      <input placeholder={name} onChange={onUpdateName}/>
      <label>
        <select name='color' onChange={onUpdateColor}>
          <option value='default'>--Choose your player color--</option>
          <option value='black'>Black</option>
          <option value='blue'>Blue</option>
          <option value='green'>Green</option>
          <option value='red'>Red</option>
          <option value='white'>White</option>
        </select>
      </label>
    </div>
  } else {
    editOrStaticBody =
    <div className='player-stats'>
      <span className='player-theme-edit'><span>{tempColor !==undefined && <img src={`${tempColor}.png`} alt={tempColor}/>}</span><h3>{name}</h3></span>
      <h2>{status}</h2>
    </div>
  }
  
  return ( 
    <article className={color} data-alive={active}>
      {editOrStaticButton}
      {editOrStaticBody}
      {editOrStaticActions}
      {/* {editOrDisplayCounters} */}
      <CounterSelect />
    </article>
   );
}
 
export default PlayerCard;