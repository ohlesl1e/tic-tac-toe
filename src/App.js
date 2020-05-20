import React from 'react';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux'

const App = ({ gameState, ws }) => {
  const [playerId, setPlayerId] = React.useState(null);
  const [winner, setWinner] = React.useState(null);
  const [showId, setshowId] = React.useState(false)

  const reset = () => {
    setshowId(true)
    axios.get('/api/reset')
      .then(res => {
        console.log(res.data)
        setWinner(null)
        setPlayerId(null)
      })
    setTimeout(() => {
      setshowId(false)
    }, 2000);
  };

  const play = async i => {
    axios.get(`/api/play?playerId=${playerId}&position=${i}`)
      .then(res => {
        console.log(res.data)
        if (res.data.playerId !== 0) {
          setPlayerId(res.data.playerId)
        }
        if (res.data.winner) {
          setWinner(res.data.winner)
        }
      })
  }

  return (
    <div className="App">
      <button id="reset" onClick={reset}>Reset</button>
      {winner && <h3 id="winner">Winner is {winner}</h3>}
      Put game here!
      <div style={{ width: '30%', margin: '0 auto' }}>
        {showId && <h5>{playerId} reset the game</h5>}
        <div className='grid-container'>
          {gameState.map((box, i) =>
            <div
              className='grid-item'
              id={`box-${i}`}
              onClick={() => play(i)}
            >
              {box}
            </div>)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  gameState: state.notesReducer.gameState
})

export default connect(mapStateToProps)(App);
