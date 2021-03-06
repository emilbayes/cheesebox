'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/root.jsx'
import configureStore from './configureStore.js'

import HiveConnector from './adapters/hive-ws.js'

import getUser from './common/login.js'

const user = { id: getUser(1), name: 'testuser' }

const mb = new HiveConnector({
  url: 'ws://localhost:8888',
  user: user,

  managedState: {
    Wallet: { opts: {} },
    Orderbook: { opts: { keyed: true } },
    Orders: { opts: { keyed: true } },
    Positions: { opts: {} }
  }
})

const conf = {
  dev: true,
  user: user,
  exchangeName: 'Cantor Exchange - Hive',
  pair: 'BTCUSD',
  pairs: [
    'BTCUSD',
    'ETHUSD'
  ],
  client: mb,
  margin: true
}

mb.open()

const store = configureStore({ pairPairs: { pairs: conf.pairs, pair: conf.pair } })

ReactDOM.render((
  <Provider store={store}>
    <App conf={conf} />
  </Provider>
), document.getElementById('root'))
