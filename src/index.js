import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setActiveUsers } from './redux/actions/userActions';
import { updateGameState } from './redux/actions/notesActions';

const store = createStore(rootReducer);
const ws = new WebSocket('ws://localhost:4000')

ws.onopen = () => {
  console.log('connection opened');
}

ws.onmessage = message => {
  const messageObject = JSON.parse(message.data)
  console.log(messageObject)
  switch (messageObject.type) {
    case 'UPDATE_GAME_STATE':
      store.dispatch(updateGameState(messageObject.gameState))
      break;

    default:
      console.log('message type not supported');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App ws={ws}/>
    </Router>
  </Provider>
  ,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
