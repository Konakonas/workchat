import React, { useState } from 'react';
// import './Header.css'
import { LogoHeader } from './logoHeader';
import { RoomTitle } from './RoomTitle';
import { Person } from './Person';

type Props = {
    chatroomName: String;
    me: Person
}

export const Header: React.FC<Props> = (props) => {
    return (
        <header className="header">
             <RoomTitle chatroomName={props.chatroomName}/>
        </header>
    ); 
}
