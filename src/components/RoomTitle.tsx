import React from 'react';

type Props = {
    chatroomName: String;
}


export const RoomTitle: React.FC<Props> = (props) => {
    return (
        <div className="RoomTitle">
            <h4 className="TitleHead">{props.chatroomName}</h4>
        </div>
    );   
}
