import React from 'react';
import { Table } from './components/Table';
import { MessageStore } from './components/ChatStore';
import { Provider } from 'mobx-react'


const stores = {
  messages: new MessageStore()
}

function App() {
  return (
    <Provider {...stores}>
      <div className="container">
        <Table Messages={stores.messages}/>
      </div>
    </Provider>
  );
}

export default App;
