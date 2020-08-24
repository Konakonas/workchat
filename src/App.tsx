import React from 'react';
import { Table } from './components/Table';
import { MessageStore } from './components/ChatStore';
import { Provider } from 'mobx-react'
import 'materialize-css'


const stores = {
  messages: new MessageStore()
}

function App() {
  return (
    <div className="container valign-wrapper">
      <Provider {...stores}>
          <Table Messages={stores.messages}/>
      </Provider>
    </div>
  );
}

export default App;
