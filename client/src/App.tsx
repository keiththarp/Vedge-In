import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { StoreProvider } from './state/GlobalState';

import './App.css';

import Auth0Test from './views/Auth0Test';
import Challenges from './views/Challenges/Challenges';
import Community from './views/Community/Community'
import Home from './views/Home/Home'
import Landing from './views/Auth0Test/Landing';
import PlantLog from './views/PlantLog/PlantLog';
import Register from './views/Register/Register';
import Wrapper from './components/Wrapper/Wrapper';
import GameBoard from './views/GameBoard/GameBoard';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Wrapper>
          <Switch>
            <Route path="/" exact component={Auth0Test} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/community" exact component={Community} />
            <Route path="/home" exact component={Home} />
            <Route path="/landing" exact component={Landing} />
            <Route path="/plant-log" exact component={PlantLog} />
            <Route path="/register" exact component={Register} />
            <Route path="/game-board" exact component={GameBoard} />
          </Switch>
        </Wrapper>
      </StoreProvider>
    </div>
  );
}

export default App;
