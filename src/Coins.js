import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import CoinPage from './CoinPage'

class Coins extends Component {
  render(){
    return(
      <main>
        <Switch>
          <Route path='/coins/:coin' component={CoinPage}/>
        </Switch>
      </main>
    );
  }
}

export default Coins
