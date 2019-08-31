export class SocketMock {

    emitted = new Map<string, any>();
    registeredEvents = new Map<string, (data: any) => void>();
    disconnectedEvent: any;
    callCallbackWith: any;

    emit(name: string, value: any) {
        this.emitted.set(name, value);
    }

    on(name: string, callback: (data: any) => void) {
        callback(this.callCallbackWith);
        if (name === 'disconnect') {
            this.disconnectedEvent = callback;
            return;
        }
        this.registeredEvents.set(name, callback);
    }
}
