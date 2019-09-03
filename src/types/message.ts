import {Room} from './room';

export interface Message {
    content: string;
    date: string;
    author: string;
    room: Room;
}
