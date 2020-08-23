import React from 'react'
import { Message } from './Message'
import { MessageBox } from './messageBox'
import { MessageStore } from './ChatStore'
import icon from './icon.png'
// import { MessageStore } from './ChatStore'

type Props = {
    messages: MessageStore;
    message: Message;
}

export const Row: React.FC<Props> = (props) => {
    
    function checkMessage(){
        if (props.message.user === props.messages.CurrentPerson.user) props.messages.setMessageNumber(props.message.id)    
    }

    function getVisibility(){
        if (props.message.user === props.messages.CurrentPerson.user) return "icons"
        return "icons icon-vis"    
    }

    return (
    <div className="messageStore">
        <div className="messageString" onClick={() => checkMessage()}>
            <span>{props.message.user} : {props.message.text}</span>
        </div>
        <img src={icon} alt="" className={getVisibility()} onClick={() => props.messages.deleteMessage(props.message.id)}/>
    </div>
    )
}
