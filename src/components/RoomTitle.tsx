import React from 'react';
// import './RoomTitle.css';

type Props = {
    chatroomName: String;
}


export const RoomTitle: React.FC<Props> = (props) => {
    return (
        <div className="RoomTitle">
            <h1 className="TitleHead">{props.chatroomName}</h1>
        </div>
    );   
}
