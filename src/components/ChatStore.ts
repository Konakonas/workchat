import { Person } from './Person'
import { Message } from './Message'
import { messages } from './Messages'
import { observable, computed, action } from 'mobx'

type oneMessage = {
    person: Person;
    text: string;
}


export class MessageStore { 

    @observable
    private _messages: Message[] = [];

    @observable
    private currentMessageNumber: number = -1;
    
    @observable
    private currentMessage: string = '';


    @observable
    private currentPerson: Person = {
        user: 'me',
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
    setMessage() {
        this.currentMessage = '';
    }

    @action
    setMessageNumber(Number: number) {
        this.currentMessageNumber = Number;
    }

    @action
    async init(channel: string) {
        this._messages = messages[channel];
    }

    @action
    addNewMessage(message: string) {
        const newMessage: Message = {
            user: this.currentPerson.user,
            text: message,
            id: this._messages.length
        }
        this._messages.push(newMessage);       
    }

    @action
    changeMessage(message: string) {
        this._messages.filter((element) => element.id === this.currentMessageNumber)[0].text = message;
    }

    @action
    deleteMessage(id: number) {
        this._messages = this._messages.filter((element) => element.id !== id);
    }
}