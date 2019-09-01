export enum Events {
    GetRoomLog = 'GetRoomLog',
    JoinRoom = 'JoinRoom',
    LeaveRoom = 'LeaveRoom',
    Message = 'Message'
}

export type EventCallback = () => void;
