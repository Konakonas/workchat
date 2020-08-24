import React from "react";
import { MessageStore } from './ChatStore';
import { observer } from "mobx-react";
import { Message } from "./Message";

type Props = {
  messageStore: MessageStore;
  message: Message | null;
  id?: Number;
}

@observer
export class MessageBox extends React.Component<Props> {

  state = {value: ''};

  componentDidUpdate(prevProps: Props) {
    if (prevProps.message !== this.props.message) {
      this.setState({value: this.props.message?.text})
    }
  }

  render() { 
      return (
        <div>
                <input
                    className=""
                    type="text"
                    value={this.state.value}
                    onChange={(event) =>
                      this.setState({value: event.target.value})
                    }
                  />
                <button
                className="btn waves-effect waves-light" 
                onClick={() => {this.sendMessage()}}>Отправить</button>
        </div>)
    }
  
  sendMessage():void {
      if (this.props.message) this.props.messageStore.changeMessage(this.state.value)
      else this.props.messageStore.addNewMessage(this.state.value); 
      this.props.messageStore.setMessageNumber(-1)
      this.props.messageStore.setMessage();   
      this.setState({value: ''})
  }

}

