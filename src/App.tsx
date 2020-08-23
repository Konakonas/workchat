import React from 'react';
import { Table } from './components/Table';
import { MessageStore } from './components/ChatStore';
import { Provider } from 'mobx-react'


const stores = {
  messages: new MessageStore()
}

function App() {
  return (
    <div>
      <Provider {...stores}>
        <div className="container">
          <Table Messages={stores.messages}/>
        </div>
      </Provider>
    </div>
  );
}

export default App;
