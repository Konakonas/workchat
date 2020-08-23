import React from 'react';
import { Header } from './Header';
import { Person } from "./Person"
import { MessageStore } from './ChatStore';
import { Row } from './Row';
import { inject, observer } from 'mobx-react';
import { MessageBox } from './messageBox';

type Props = {
  Messages: MessageStore;
};

@inject("Messages")
@observer
export class Table extends React.Component<Props> {

    private chatroomName: String = 'Work chat';

    private messagesNumber: number = 0;
    
    private currentPerson: Person = {
        user: 'test',
        uuid: 'test',
    };
    private messagesContainer: React.RefObject<HTMLDivElement> = React.createRef();

    getCurrentPerson() {
      return this.currentPerson
    }

    componentDidUpdate(prevProps: Props) {
      if (this.props.Messages.currentMessages.length !== this.messagesNumber) {
        this.messagesNumber = this.props.Messages.currentMessages.length;
        this.messagesContainer.current?.scrollTo({top: this.messagesContainer.current?.scrollHeight})
      }
    }

    setStatus(chatName: string): void {
      this.props.Messages?.init(chatName) 
      if (chatName === 'work') this.chatroomName = 'Work chat';
      else if (chatName === 'flood') this.chatroomName = 'Flood chat';
    }

    render() {
        return (
          <div className="row col-9" onLoad={() => this.setStatus}>
            <div className="col-12 justify-content-center">
              <Header 
                  chatroomName={this.chatroomName}
                  me={this.currentPerson}
              />
            </div>
            <div className="col-12 my-2 mx-2">
              <button className="my-2 mx-2" onClick={() => {this.setStatus('work')}}>Work chat</button>
              <button className="my-2 mx-2" onClick={() => this.setStatus('flood')}>Flood chat</button>
            </div>
            <div className="main col-12 mx-auto" ref={this.messagesContainer}>
              {this.props.Messages?.currentMessages.map((message) => (
                <Row
                  messages={this.props.Messages} 
                  message={message}
                />
              ))}
            </div >
            <div className="col-12 my-2 mx-2">
              <MessageBox 
              messageStore={this.props.Messages}
              message={this.props.Messages.selectedMessage}/>
            </div>
          </div>

        );
    };
}

