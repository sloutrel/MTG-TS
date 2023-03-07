import React, {useEffect, useState} from 'react';
import Player from './models/player';
import GameBoardHeader from './components/GameBoardHeader';
import GameBoardFooter from './components/GameBoardFooter';
import GameSetupForm from './components/GameSetupForm';
import PlayerCard from './components/PlayerCard';
import {v4 as uuid} from 'uuid';
import '@picocss/pico';
import './App.css';

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [activePlayers, setActivePlayers] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(true)
    
  useEffect(()=>{
    const timer = setTimeout(() => {
      if(activePlayers.length === 1) {
        setPlayers((players) =>
          players.map((player) => {
            if(player.id === activePlayers[0]) {
              return {
                ...player,
                winner: true,
              };
            } else {
              return {...player}
            }
          })
        )
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [activePlayers])
  
  const createPlayers = (startingLivesCount: number, playerCount: number) => {
    let newPlayers = []
    let newActivePlayers = []
    for (let i=1; i<=playerCount; i++){
      let player = { id: uuid(), name: `Player ${i}`, color: 'default', lifeCount: startingLivesCount, active: true }
      newPlayers.push(player)
      newActivePlayers.push(player.id)
    }
    setPlayers([...newPlayers])
    setActivePlayers(newActivePlayers)
  }

  const handleCreateGame = (playerCount: number, startingLivesCount: number) => {
    createPlayers(startingLivesCount, playerCount)
  }

  const updateActivePlayersList = (id:string) => {
    setActivePlayers((current) =>
      current.filter((obj) => obj !== id)
    )
  }

  const incrementLife = (id:string) => {
    setPlayers((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            lifeCount: obj.lifeCount+1,
          };
        }
        return obj;
      })
    )
  }

  const decrementLife = (id:string) => {
    setPlayers((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          if(obj.lifeCount === 1){
            updateActivePlayersList(obj.id)
            return {
              ...obj,
              lifeCount: 0,
              active: false
            }
          }
          return {
            ...obj,
            lifeCount: obj.lifeCount-1,
          };
        }
        return obj;
      })
    )
  }

  const handleSavePlayer = (id: string, data: {name ? : string, color ? : string}) => {
    setPlayers((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            name: data.name? data.name: obj.name,
            color: data.color? data.color: obj.color,
          };
        }
        return obj;
      })
    )
  }

  const handleToggleEdit = () => {
    setIsEditing(!isEditing)
  }

  let editStatus
  if(!isEditing){
    editStatus = <button onClick={handleToggleEdit}>Edit Game</button>
  } else {
    editStatus = <GameSetupForm onToggleEdit={handleToggleEdit} onNewGame={handleCreateGame} />
  }

  return (
    <div className="App container" data-type={isEditing}>
      <GameBoardHeader />
      {editStatus}
      <section className='grid'>
        {players.map(player => (
          <PlayerCard id={player.id} name={player.name} color={player.color} lifeCount={player.lifeCount} active={player.active} key={player.id} winner={player.winner} incrementLife={incrementLife} decrementLife={decrementLife} handleSavePlayer={handleSavePlayer} />
        ))}
      </section>
      <GameBoardFooter />
    </div>
  );
}

export default App;