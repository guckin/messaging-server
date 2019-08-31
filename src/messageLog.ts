import {Message} from './models/message';
import {Log} from './interfaces/log';

export class MessageLog implements Log<Message> {

    private messages: Message[] = [];

    constructor(
        private readonly size: number
    ) {
    }

    push(message: Message) {
        if (this.messages.length >= this.size) {
            this.messages.shift();
        }
        this.messages.push(message);
    }

    toArray(): Message[] {
        return [...this.messages];
    }

}
