export class SocketMock {

    emitted = new Map<string, any>();
    registeredEvents = new Map<string, (data: any) => void>();
    disconnectedEvent: any;

    emit(name: string, value: any) {
        this.emitted.set(name, value);
    }

    on(name: string, callback: () => void) {
        if (name === 'disconnect') {
            this.disconnectedEvent = callback;
            return;
        }
        this.registeredEvents.set(name, callback);
    }
}
