interface IServer {

}

export class Server implements IServer {

    constructor(private readonly port: number) {}

    start() {
        console.log(`starting server on port ${this.port}`)
    }
}
