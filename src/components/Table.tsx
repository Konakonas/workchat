import React from 'react';
import { Header } from './Header';
import { Person } from "./Person"
import { MessageStore } from './ChatStore';
import { Row } from './Row';
import { inject, observer } from 'mobx-react';
import { MessageBox } from './messageBox';
import 'materialize-css'

type Props = {
  Messages: MessageStore;
};

@inject("Messages")
@observer
export class Table extends React.Component<Props> {

    state = {value: ''};

    private chatroomName: String = 'Work chat';

    private messagesNumber: number = 0;
    
    private currentPerson: Person = this.props.Messages!.CurrentPerson;

    private messagesContainer: React.RefObject<HTMLDivElement> = React.createRef();

    checkAuth() {
      this.props.Messages.setAuth();
    }

    auth(name: string) {
      if (name.length < 4) {
        alert("Имя не может быть меньше 4 символов")  
      } else {
        this.props.Messages.setCurrentPerson(name);
        this.props.Messages.setAuth();
      }
    }

    componentDidUpdate(prevProps: Props) {
      if (this.props.Messages.currentMessages.length !== this.messagesNumber) {
        this.messagesNumber = this.props.Messages.currentMessages.length;
        this.messagesContainer.current?.scrollTo({top: this.messagesContainer.current?.scrollHeight})
      }
    }

    setStatus(chatName: string): void {
      this.props.Messages.setChatName(chatName)
      this.props.Messages?.init(chatName)   
      if (chatName === 'work') this.chatroomName = 'Work chat';
      else if (chatName === 'flood') this.chatroomName = 'Flood chat';
    }

    render() {
      this.props.Messages.setAuth();
      if (!this.props.Messages.auth) {
        return <div className="row">
                  <h1>Вход в чат</h1>
                  <div className="">
                    Введите имя:
                    <div className = "card-title" onLoad={() => this.checkAuth()}>
                      <input
                            className="input-field"
                            type="text"
                            placeholder="Не менее 4 символов"
                            value={this.state.value}
                            onChange={(event) =>
                              this.setState({value: event.target.value})
                            }
                        />
                      <button className="btn yellow darken-4" onClick={() => {this.auth(this.state.value)}}>Log in</button>
                    </div>
                  </div>
              </div>
      }
      this.props.Messages.getCurrentPerson();
        return (
          <div className="row" onLoad={() => this.setStatus}>
            <div className="">
              <Header 
                  chatroomName={this.chatroomName}
                  me={this.currentPerson}
              />
            </div>
            <div className="">
              <button className="btn-flat" onClick={() => this.setStatus('work')}>Work chat</button>
              <button className="btn-flat" onClick={() => this.setStatus('flood')}>Flood chat</button>
            </div>
            <div className="card indigo lighten-5" ref={this.messagesContainer}>
              {this.props.Messages?.currentMessages.map((message) => (
                <Row
                  messages={this.props.Messages} 
                  message={message}
                />
              ))}
            </div >
            <div className="">
              <MessageBox 
              messageStore={this.props.Messages}
              message={this.props.Messages.selectedMessage}/>
            </div>
          </div>
        );
    };
}

