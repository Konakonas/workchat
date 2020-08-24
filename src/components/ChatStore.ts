import { Person } from './Person'
import { Message } from './Message'
import { messages } from './Messages'
import { observable, computed, action } from 'mobx'

export class MessageStore { 

    @observable
    private isAuth: boolean = false;

    @observable
    private chatName: string = 'work';

    @observable
    private _messages: Message[] = [];

    @observable
    private currentMessageNumber: number = -1;
    
    @observable
    private currentMessage: string = '';

    @computed
    get currentChatName() {
        return this.chatName   
    }

    @computed
    get auth() {
        return this.isAuth    
    }

    @observable
    private currentPerson: Person = {
        user: 'guest',
        uuid: '0',
    };

    @computed
    get CurrentPerson() {
      return this.currentPerson
    }

    @computed
    get currentMessages(): Message[] {
        return this._messages
    }

    @computed
    get messageNumber(): number {
        return this.currentMessageNumber
    }

    @computed
    get selectedMessage(): Message | null {
        return this._messages.find((element) => element.id === this.currentMessageNumber) ?? null
    }

    @computed
    get message(): string {
        return this.currentMessage
    }
    
    @action
    setAuth() {
        const key = localStorage.getItem('user');
        this.isAuth = key !== null ? true : false;
    }

    @action
    setChatName(name: string) {
        this.chatName = name;    
    }

    @action
    setMessage() {
        this.currentMessage = '';
    }

    @action
    setMessageNumber(Number: number) {
        this.currentMessageNumber = Number;
    }

    @action
    async init(channel: string) {
        this.getMessageStore(this.chatName)
    }

    @action
    addNewMessage(message: string) {
        const newMessage: Message = {
            user: this.currentPerson.user,
            text: message,
            id: this._messages.length
        }
        this._messages.push(newMessage);
        localStorage.setItem(this.chatName, JSON.stringify(this._messages));
    }

    @action
    changeMessage(message: string) {
        this._messages.filter((element) => element.id === this.currentMessageNumber)[0].text = message;
        localStorage.setItem(this.chatName, JSON.stringify(this._messages));
    }

    @action
    deleteMessage(id: number) {
        this._messages = this._messages.filter((element) => element.id !== id);
        localStorage.setItem(this.chatName, JSON.stringify(this._messages));
    }

    @action
    setCurrentPerson(name: string ){
        this.currentPerson = {
            user: name,
            uuid: '0',
        }
        localStorage.setItem('user', JSON.stringify(this.currentPerson));        
    }

    @action
    getCurrentPerson() {
        const key = localStorage.getItem('user');
        this.currentPerson = key !== null ? JSON.parse(key) : [];
    }

    @action 
    getMessageStore(channel: string) {
        const key = localStorage.getItem(channel);
        this._messages = key !== null ? JSON.parse(key) : messages[channel];   
        localStorage.setItem(channel, JSON.stringify(this._messages));
    }
}