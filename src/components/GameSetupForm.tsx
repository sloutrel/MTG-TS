import React, {ChangeEvent, useState} from 'react';

interface GameSetupFormProps {
  onToggleEdit: () => void,
  onNewGame: (playerCount: number, startingLivesCount: number) => void;
}

const GameSetupForm = ({onToggleEdit, onNewGame}: GameSetupFormProps ): JSX.Element => {
  const [playerCount, setPlayerCount] = useState(2)
  const [lifeCount, setLifeCount] = useState(20)
  
  const handlePlayerCount = (e:ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(parseInt(e.target.value))
  }

  const handleLifeCount = (e:ChangeEvent<HTMLInputElement>) => {
    setLifeCount(parseInt(e.target.value))
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onNewGame(playerCount, lifeCount)
    setPlayerCount(2)
    setLifeCount(20)
    onToggleEdit()
  }

  return ( 
    <section>
      <form onSubmit={handleSubmit}>
        <div className='grid'>
          <label> Number of Players:
            <input type='number' name='playerNum' min={2} value={playerCount} onChange={handlePlayerCount} />
          </label>
          <label> Starting Lives:
            <input type='number' id='lifeStart' min={1} value={lifeCount} onChange={handleLifeCount} />
          </label>
        </div> 
        <button type='submit'>Setup Game</button>
      </form>
      <button className='outline secondary' onClick={onToggleEdit}>Go Back</button>
    </section>
   );
}
 
export default GameSetupForm;